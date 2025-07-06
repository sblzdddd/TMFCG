import { ref, nextTick, onUnmounted } from 'vue';
import { animatePlayerCardDraw } from '~/components/Room/Gameplay/player_card_animation';
import { CardNumber } from '~/types/Card';
import { useCardProfile } from '~/composables/useCardProfile';
import type { IBaseCard } from '~/lib/Card';
import { PlayingCardFactory } from '~/lib/PlayingCard/PlayingCardFactory';
import type { PlayingCard } from '~/lib/PlayingCard/PlayingCard';
import { animateOpponentCardDraw } from '~/components/Room/Gameplay/opponent_card_animation';
import { useUser } from '@/composables/useUser';
import { useRoom } from '@/composables/useRoom';
import type { ICardProfile } from '~/lib/CardProfile';
import { useSocket, waitForConnection } from '@/composables/useSocket';
import { animateCardSelection } from '../components/Room/Gameplay/player_card_animation';
import { animatePlayedCards } from '~/components/Room/Gameplay/played_card_animation';

// Add a new interface for the payload
interface OpponentCardCountsPayload {
  [userId: string]: number;
}

interface PlayedCard {
  userId: string;
  cards: PlayingCard[];
}

interface LastPlayedCardsPayload {
  [userId: string]: string[];
}

const deckCardsCount = ref<number>(0);
const playerCards = ref<PlayingCard[]>([]);
const opponentCardsCounts = ref<number[]>([0, 0, 0]);
const livePlayingHistory = ref<PlayHistoryEntry[]>([]);
const playedCards = ref<PlayedCard[]>([]);

// Add a flag to track if listeners are already set up
let listenersInitialized = false;

export const useGameTable = async () => {
  if (typeof window === 'undefined') {
    return {
      deckCardsCount: ref<number>(0),
      playerCards: ref<PlayingCard[]>([]),
      opponentCardsCounts: ref<number[]>([0, 0, 0]),
      livePlayingHistory: ref<PlayHistoryEntry[]>([]),
      playedCards: ref<PlayedCard[]>([]),
      requestDrawCard: () => {},
      requestPlayCard: () => {},
      toggleCardSelection: () => {},
      resetCardSelection: () => {},
      requestDrawFromPlayedCard: () => {},
      initializeGame: async () => {},
    };
  }
  console.log('useGameTable');
  let newestID = 0;
  const { user: currentUser } = useUser();
  const { currentProfile, setCardProfile } = useCardProfile();
  const { currentRoom } = useRoom();
  const { socket } = useSocket();

  await waitForConnection();
  if (!socket.value) {
    throw new Error('Socket not found');
  }

  const cardNumberToValue = (cardNumber: CardNumber) => {
    if (cardNumber >= CardNumber.ACE && cardNumber <= CardNumber.TWO) return 13 + cardNumber;
    return cardNumber;
  };

  const mapDrawerIdToOpponentIndex = (drawerId: string): number => {
    if (!currentUser.value || !currentRoom.value || !currentRoom.value.members) return -1;
    const opponents = currentRoom.value.members.filter(u => u.id !== currentUser.value!.id);
    console.log('opponents', opponents);
    const opponentIndex = opponents.findIndex(op => op.id === drawerId);
    return opponentIndex !== -1 ? opponentIndex : -1;
  };

  const initializeGame = async () => {
    playedCards.value = [];
    playedCards.value[0] = {
      userId: currentUser.value!.id,
      cards: []
    };
    for(const user of currentRoom.value?.members || []) {
      const opponentIndex = mapDrawerIdToOpponentIndex(user.id);
      if(opponentIndex === -1) continue;
      playedCards.value[opponentIndex + 1] = {
        userId: user.id,
        cards: []
      };
    }
    console.log('playedCards', playedCards.value);
    if(!currentRoom.value?.cardProfile) {
      socket.value.emit('getRoomCardProfile');
    }
    socket.value.emit('getMyCards');
    socket.value.emit('getPlayingHistory');
    socket.value.emit('getDeckCount');
    socket.value.emit('getOpponentCardCounts');
    socket.value.emit('getLastPlayedCards');
  };

  const drawPlayerCards = async (cards: string[], element?: string) => {
    console.log('drawPlayerCards', cards);
    resetCardSelection();
    if (!cards) return;
    const allCardsAfterDrawData: IBaseCard[] = playerCards.value.map(card => card.data);
    const drawnCardObjects: IBaseCard[] = [];

    for (const id of cards) {
      const cardData = currentProfile.value.getCardById(id);
      if (cardData) {
        drawnCardObjects.push(cardData);
        allCardsAfterDrawData.push(cardData);
      }
    }

    drawnCardObjects.sort((a, b) => {
      const aValue = cardNumberToValue(a.number);
      const bValue = cardNumberToValue(b.number);
      if (aValue !== bValue) return aValue - bValue;
      return a.suit - b.suit;
    });

    allCardsAfterDrawData.sort((a, b) => {
      const aValue = cardNumberToValue(a.number);
      const bValue = cardNumberToValue(b.number);
      if (aValue !== bValue) return aValue - bValue;
      return a.suit - b.suit;
    });
    
    const insertionPoints: number[] = [];
    for (const targetCard of drawnCardObjects) {
        const index = allCardsAfterDrawData.findIndex(c => c.id === targetCard.id);
        if (index !== -1) insertionPoints.push(index);
    }
    
    for (let i = 0; i < drawnCardObjects.length; i++) {
      newestID++;
      const playingCard = PlayingCardFactory.createPlayingCard(drawnCardObjects[i], newestID);
      playerCards.value.splice(insertionPoints[i], 0, playingCard);
    }

    await nextTick();
    
    animatePlayerCardDraw(
      insertionPoints,
      () => {
        playerCards.value.forEach(card => card.isAnimating = false);
      },
      element
    );
  };

  const drawOpponentCards = async (drawerId: string, count: number, element?: string) => {
    console.log('drawOpponentCards', drawerId, count);
    const opponentIndex = mapDrawerIdToOpponentIndex(drawerId);
    console.log('opponentIndex', opponentIndex);

    if (opponentIndex !== -1) {
      opponentCardsCounts.value[opponentIndex] += count;
      await nextTick();
      
      animateOpponentCardDraw(
        opponentIndex,
        count,
        () => { /* Animation complete */ },
        element
      );
    }
  }

  const onCardDrawn = async (payload: CardDrawnPayload) => {
    console.log('onCardDrawn', payload);
    console.log('currentUser', currentUser.value);
    console.log('currentProfile', currentProfile.value);
    if (!payload || !currentProfile.value || !currentUser.value) return;

    if (payload.drawerId === currentUser.value.id) {
      if (!payload.cards) {
        console.error('No cards drawn');
        return;
      }
      if(payload.source === 'playedCard' && payload.sourceId) {
        const opponentIndex = payload.sourceId === currentUser.value.id ? 0 : mapDrawerIdToOpponentIndex(payload.sourceId) + 1;
        const element = `played-card-${opponentIndex}-${payload.cards?.[0]}`;
        console.log('element', element);
        drawPlayerCards(payload.cards, element);
      } else {
        drawPlayerCards(payload.cards);
      }
    } else {
      if(payload.source === 'playedCard' && payload.sourceId) {
        const opponentIndex = payload.sourceId === currentUser.value.id ? 0 : mapDrawerIdToOpponentIndex(payload.sourceId) + 1;
        const element = `played-card-${opponentIndex}-${payload.cards?.[0]}`;
        console.log('element', element);
        drawOpponentCards(payload.drawerId, 1, element);
      } else {
        drawOpponentCards(payload.drawerId, payload.count);
      }
    }
    if(payload.source === 'playedCard') {
      await nextTick();
      socket.value.emit('getLastPlayedCards');
    }
  };

  const onLastPlayedCards = async (payload: LastPlayedCardsPayload) => {
    console.log('onLastPlayedCards', payload);
    if (!currentProfile.value || !currentUser.value) return;

    // Add current user's played cards if any
    if (payload[currentUser.value.id]) {
      playedCards.value[0] = {
        userId: currentUser.value.id,
        cards: payload[currentUser.value.id]
          .map(id => currentProfile.value.getCardById(id))
          .filter(card => card !== undefined)
          .map(card => PlayingCardFactory.createPlayingCard(card, newestID++))
      };
    }
    await nextTick();
    animatePlayedCards(0);

    // Add opponent played cards
    if (currentRoom.value) {
      for (const user of currentRoom.value.members) {
        if (user.id === currentUser.value.id) continue;
        const cards = payload[user.id] || [];
        const opponentIndex = mapDrawerIdToOpponentIndex(user.id);
        if(opponentIndex === -1) continue;
        playedCards.value[opponentIndex + 1] = {
          userId: user.id,
          cards: cards
            .map(id => currentProfile.value.getCardById(id))
            .filter(card => card !== undefined)
            .map(card => PlayingCardFactory.createPlayingCard(card, newestID++))
        };
        await nextTick();
        animatePlayedCards(opponentIndex + 1);
      }
    }
    console.log('playedCards', playedCards.value);
  };

  const onCardPlayed = async (payload: CardPlayedPayload) => {
    console.log('onCardPlayed', payload);
    if (!payload || !currentProfile.value || !currentUser.value) return;

    if (payload.userId === currentUser.value.id) {
      playedCards.value[0] = {
        userId: payload.userId,
        cards: playerCards.value.filter(card => payload.cardIds.includes(card.data.id))
      };
      // Remove played cards from player's hand
      playerCards.value = playerCards.value.filter(card => !payload.cardIds.includes(card.data.id));
      await nextTick();
      // First animate the played cards
      animatePlayedCards(0);
      // Then update the remaining cards in hand
      animatePlayerCardDraw();
    } else {
      const opponentIndex = mapDrawerIdToOpponentIndex(payload.userId);
      if (opponentIndex === -1) return;
      opponentCardsCounts.value[opponentIndex]-=payload.cardIds.length;
      playedCards.value[opponentIndex + 1] = {
        userId: payload.userId,
        cards: payload.cardIds.map(id => currentProfile.value.getCardById(id)).filter(card => card !== undefined).map(card => PlayingCardFactory.createPlayingCard(card, newestID++))
      };
      console.log('playedCards', playedCards.value);
      await nextTick();
      animatePlayedCards(opponentIndex + 1);
      // Update remaining cards in hand
      animateOpponentCardDraw(opponentIndex);
    }
  };

  const onPlayingHistory = (history: PlayHistoryEntry[]) => {
    console.log('onPlayingHistory', history);
    livePlayingHistory.value = history.map((entry: PlayHistoryEntry) => {
      return {
        userId: entry.userId,
        cards: [...entry.cards]
      };
    });
  };

  const onDeckCount = (count: number) => {
    console.log('onDeckCount', count);
    deckCardsCount.value = count;
  };

  const onOpponentCardCounts = async (payload: OpponentCardCountsPayload) => {
    if (!currentUser.value || !currentRoom.value || !currentRoom.value.members) return;
    const opponents = currentRoom.value.members.filter(u => u.id !== currentUser.value!.id);
    const newOpponentCounts = [0, 0, 0]; // Assuming max 3 opponents
    opponents.forEach((op, index) => {
      if (payload[op.id] !== undefined) {
        newOpponentCounts[index] = payload[op.id];
      }
    });
    opponentCardsCounts.value = newOpponentCounts;
    await nextTick();
    // update opponent card positions
    for (let i = 0; i < 3; i++) {
      animateOpponentCardDraw(i);
    }
  };

  const updateCardsFromProfile = () => {
    console.log('updateCardsFromProfile', currentProfile.value);
    console.log('playerCards', playerCards.value);
    const newPlayerCards: PlayingCard[] = [];
    for (const card of playerCards.value) {
      const cardData = currentProfile.value.getCardById(card.data.id);
      if (cardData) {
        newPlayerCards.push(PlayingCardFactory.createPlayingCard(cardData, card.id));
      }
    }
    console.log('updateCardsFromProfile', newPlayerCards);
    playerCards.value = newPlayerCards;
  }

  const onMyCards = async (newCardIds: string[]) => {
    if (!currentProfile.value) return;
    const newPlayerCards: PlayingCard[] = [];
    console.log('myCards', newCardIds);
    for (const id of newCardIds) {
      const cardData = currentProfile.value.getCardById(id);
      if (cardData) {
        newestID++;
        newPlayerCards.push(PlayingCardFactory.createPlayingCard(cardData, newestID));
      }
    }
    newPlayerCards.sort((a, b) => {
      const aValue = cardNumberToValue(a.data.number);
      const bValue = cardNumberToValue(b.data.number);
      if (aValue !== bValue) return aValue - bValue;
      return a.data.suit - b.data.suit;
    });
    playerCards.value = newPlayerCards;
    await nextTick();
    // update player card positions
    animatePlayerCardDraw();
  }

  const onRoomCardProfile = (newProfile: ICardProfile) => {
    if (newProfile) {
      setCardProfile(newProfile);
      console.log('roomCardProfile', newProfile);
      updateCardsFromProfile();
    }
  }

  // Only set up listeners if they haven't been initialized
  if (!listenersInitialized && socket.value) {
    console.log('Initializing socket listeners');
    listenersInitialized = true;

    socket.value.on('roomCardProfile', onRoomCardProfile);

    socket.value.on('myCards', onMyCards);

    socket.value.on('cardDrawn', onCardDrawn);
    socket.value.on('cardPlayed', onCardPlayed);
    socket.value.on('playingHistory', onPlayingHistory);
    socket.value.on('deckCount', onDeckCount);
    socket.value.on('opponentCardCounts', onOpponentCardCounts);
    socket.value.on('lastPlayedCards', onLastPlayedCards);

    // Clean up listeners when component is unmounted
    onUnmounted(() => {
      if (socket.value) {
        console.log('Cleaning up socket listeners');
        socket.value.off('roomCardProfile');
        socket.value.off('myCards');
        socket.value.off('cardDrawn', onCardDrawn);
        socket.value.off('cardPlayed', onCardPlayed);
        socket.value.off('playingHistory', onPlayingHistory);
        socket.value.off('deckCount', onDeckCount);
        socket.value.off('opponentCardCounts', onOpponentCardCounts);
        socket.value.off('lastPlayedCards', onLastPlayedCards);
        listenersInitialized = false;
      }
    });
  }

  const requestDrawCard = (count: number = 1) => {
    console.log("drawCard")
    socket.value.emit('drawCard', { count });
  };

  const requestDrawFromPlayedCard = (userId: string, cardId: string) => {
    console.log('requestDrawFromPlayedCard', userId, cardId);
    socket.value.emit('requestDrawFromPlayedCard', { userId, cardId });
  };

  const requestPlayCard = () => {
    const cardIds = playerCards.value.filter(card => card.isSelected).map(card => card.data.id);
    if(cardIds.length === 0) {
      console.error('No cards selected');
      return;
    }
    console.log('requestPlayCard', cardIds);
    socket.value.emit('playCard', { cardIds });
    resetCardSelection();
  };

  const toggleCardSelection = (card: PlayingCard) => {
    card.isSelected = !card.isSelected;
    const element = document.getElementById(`player-card-${card.id}`);
    if (element) {
      animateCardSelection(element, card.isSelected);
    }
  };

  const resetCardSelection = () => {
    playerCards.value.forEach(card => card.isSelected = false);
    const elements = document.querySelectorAll('.player-card');
    elements.forEach(element => {
      animateCardSelection(element as HTMLElement, false);
    });
  }

  return {
    deckCardsCount,
    playedCards,
    playerCards,
    opponentCardsCounts,
    playingHistory: livePlayingHistory,
    initializeGame,
    requestDrawCard,
    requestPlayCard,
    toggleCardSelection,
    resetCardSelection,
    requestDrawFromPlayedCard,
  };
};

export default useGameTable;
