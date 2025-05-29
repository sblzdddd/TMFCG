import { ref, nextTick, onUnmounted } from 'vue';
import { animateCardDraw } from '~/components/Room/Gameplay/player_card_animation';
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

const deckCardsCount = ref<number>(0);
const cardPool = ref<PlayingCard[]>([]);
const playerCards = ref<PlayingCard[]>([]);
const opponentCardsCounts = ref<number[]>([0, 0, 0]);
const livePlayingHistory = ref<PlayHistoryEntry[]>([]);

// Add a flag to track if listeners are already set up
let listenersInitialized = false;

export const useGameTable = async () => {
  if (typeof window === 'undefined') {
    return {
      deckCardsCount: ref<number>(0),
      cardPool: ref<PlayingCard[]>([]),
      playerCards: ref<PlayingCard[]>([]),
      opponentCardsCounts: ref<number[]>([0, 0, 0]),
      livePlayingHistory: ref<PlayHistoryEntry[]>([]),
      initializeGame: async () => {},
      requestDrawCard: () => {},
      requestPlayCard: () => {},
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
    const opponentIndex = opponents.findIndex(op => op.id === drawerId);
    return opponentIndex !== -1 ? opponentIndex : -1;
  };

  const initializeGame = async () => {
    if(!currentRoom.value?.cardProfile) {
      socket.value.emit('getRoomCardProfile');
    }
    socket.value.emit('getMyCards');
    socket.value.emit('getPlayingHistory');
    socket.value.emit('getDeckCount');
  };

  const onCardDrawn = async (payload: CardDrawnPayload) => {
    console.log('onCardDrawn', payload);
    if (!payload || !currentProfile.value || !currentUser.value) return;

    if (payload.drawerId === currentUser.value.id) {
      if (payload.cards) {
        const allCardsAfterDrawData: IBaseCard[] = playerCards.value.map(card => card.data);
        const drawnCardObjects: IBaseCard[] = [];

        for (const id of payload.cards) {
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
        const cardsInDeckElements = document.querySelectorAll('.card-in-deck');
        const playerCardElements = document.querySelectorAll('.player-card');
        
        animateCardDraw(
          Array.from(cardsInDeckElements) as HTMLElement[],
          Array.from(playerCardElements) as HTMLElement[],
          insertionPoints,
          () => {
            playerCards.value.forEach(card => card.isAnimating = false);
          }
        );
      }
    } else {
      const opponentIndex = mapDrawerIdToOpponentIndex(payload.drawerId);
      
      if (opponentIndex !== -1) {
        opponentCardsCounts.value[opponentIndex] += payload.count;
        await nextTick();
        
        const cardElements = document.querySelectorAll(`.opponent-${opponentIndex}-card`);
        const cardsInDeckElements = document.querySelectorAll('.card-in-deck');
        
        animateOpponentCardDraw(
          opponentIndex,
          Array.from(cardsInDeckElements) as HTMLElement[],
          Array.from(cardElements) as HTMLElement[],
          payload.count,
          () => { /* Animation complete */ }
        );
      }
    }
  };

  const onCardPlayed = (payload: CardPlayedPayload) => {
    console.log('onCardPlayed', payload);
    if (!payload || !currentProfile.value || !currentUser.value) return;

    if (payload.userId === currentUser.value.id) {
      playerCards.value = playerCards.value.filter(card => card.data.id !== payload.cardId);
    } else {
      const opponentIndex = mapDrawerIdToOpponentIndex(payload.userId);
      if (opponentIndex !== -1) {
        opponentCardsCounts.value[opponentIndex]--; 
      }
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

  const updateCardsfromProfile = () => {
    console.log('updateCardsfromProfile', currentProfile.value);
    console.log('playerCards', playerCards.value);
    const newPlayerCards: PlayingCard[] = [];
    for (const card of playerCards.value) {
      const cardData = currentProfile.value.getCardById(card.data.id);
      if (cardData) {
        newPlayerCards.push(PlayingCardFactory.createPlayingCard(cardData, card.id));
      }
    }
    console.log('updateCardsfromProfile', newPlayerCards);
    playerCards.value = newPlayerCards;
  }

  // Only set up listeners if they haven't been initialized
  if (!listenersInitialized && socket.value) {
    console.log('Initializing socket listeners');
    listenersInitialized = true;

    socket.value.on('roomCardProfile', (newProfile: ICardProfile) => {
      if (newProfile) {
        setCardProfile(newProfile);
        console.log('roomCardProfile', newProfile);
        updateCardsfromProfile();
      }
    });

    socket.value.on('myCards', (newCardIds) => {
      if (!currentProfile.value) return;
      const newPlayerCards: PlayingCard[] = [];
      console.log('myCards', newCardIds);
      for (const id of newCardIds) {
        const cardData = currentProfile.value.getCardById(id);
        console.log('cardData', cardData);
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
    });

    socket.value.on('cardDrawn', onCardDrawn);
    socket.value.on('cardPlayed', onCardPlayed);
    socket.value.on('playingHistory', onPlayingHistory);
    socket.value.on('deckCount', onDeckCount);

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
        listenersInitialized = false;
      }
    });
  }

  const requestDrawCard = (count: number = 1) => {
    console.log("drawCard")
    socket.value.emit('drawCard', { count });
  };

  const requestPlayCard = (cardId: string) => {
    socket.value.emit('playCard', { cardId });
  };

  return {
    deckCardsCount,
    cardPool,
    playerCards,
    opponentCardsCounts,
    playingHistory: livePlayingHistory,
    initializeGame,
    requestDrawCard,
    requestPlayCard,
  };
};

export default useGameTable;
