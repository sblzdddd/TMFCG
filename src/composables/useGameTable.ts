import { ref, watch, onBeforeUnmount } from 'vue';
import { createDraggable, type Draggable, utils } from 'animejs';
import { animateCardDraw } from '~/components/Room/Gameplay/card_animation';
import type { ICardProfile } from '~/lib/CardProfile';
import { CardNumber } from '~/types/Card';
import setB from '@/assets/Set B.json';
import { useCardProfile } from '~/composables/useCardProfile';
import { useCardProfileLoader } from '~/composables/useCardProfileLoader';
import type { IBaseCard } from '~/lib/Card';

const deckCards = ref<IBaseCard[]>([]);
const cardPool = ref<IBaseCard[]>([]);
const playerCards = ref<IBaseCard[]>([]);
const draggables = ref<Draggable[]>([]);
const pointOfInsertions = ref("0");

export const useGameTable = () => {
  let newestID = 0;

  // Shuffle array function
  const shuffleArray = (array: IBaseCard[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Initialize game
  const initializeGame = () => {
    // Load the card profile from setB
    const { currentProfile } = useCardProfile();
    const { loadProfile } = useCardProfileLoader();
    loadProfile(setB as ICardProfile);

    // Shuffle the cards and set the deck
    deckCards.value = shuffleArray(currentProfile.value.cards);
  };

  const cardNumberToValue = (cardNumber: CardNumber) => {
    if (cardNumber >= CardNumber.ACE && cardNumber <= CardNumber.TWO) return 13 + cardNumber;
    return cardNumber;
  };

  // Draw a card from the deck
  const drawCard = async (numOfDrawCards: number = 1) => {
    if (deckCards.value.length > 0) {
      const allCardsAfterDraw: IBaseCard[] = playerCards.value.map(card => card);

      const drawnCards: IBaseCard[] = [];

      // First, draw all cards
      for (let i = 0; i < numOfDrawCards; i++) {
        const drawnCard = deckCards.value.pop();
        if (!drawnCard) return;
        drawnCards.push(drawnCard);
        allCardsAfterDraw.push(drawnCard);
      }
      
      // Sort the drawn cards by number first, then suit
      drawnCards.sort((a, b) => {
        // Handle ACE as highest card
        const aValue = cardNumberToValue(a.number);
        const bValue = cardNumberToValue(b.number);
        
        if (aValue !== bValue) {
          return aValue - bValue;
        }
        return a.suit - b.suit;
      });

      // Sort the drawn cards by number first, then suit
      allCardsAfterDraw.sort((a, b) => {
        // Handle ACE as highest card
        const aValue = cardNumberToValue(a.number);
        const bValue = cardNumberToValue(b.number);
        
        if (aValue !== bValue) {
          return aValue - bValue;
        }
        return a.suit - b.suit;
      });

      console.log(allCardsAfterDraw);

      // Calculate insertion points for sorted cards
      const insertionPoints: number[] = [];
      for (const targetCard of drawnCards) {
        for (const card of allCardsAfterDraw) {
          if (card.number === targetCard.number && card.suit === targetCard.suit) {
            insertionPoints.push(allCardsAfterDraw.indexOf(card));
          }
        }
      }

      console.log(insertionPoints);

      // Then insert the cards at their calculated positions
      for (let i = 0; i < drawnCards.length; i++) {
        newestID++;
        playerCards.value.splice(insertionPoints[i], 0, {
          ...drawnCards[i],
          isAnimating: true,
          id: newestID,
        });
        await nextTick();
      }

      // Wait for the DOM to update
      await nextTick();

      // Get the positions for animation
      const cardsInDeck = document.querySelectorAll('.card-in-deck');
      const playerCardElements = document.querySelectorAll('.player-card');

      animateCardDraw(
        Array.from(cardsInDeck) as HTMLElement[],
        Array.from(playerCardElements) as HTMLElement[],
        insertionPoints,
        () => {
          playerCards.value.forEach(card => {
            card.isAnimating = false;
          });

          draggables.value.forEach(draggable => {
            draggable.stop();
            draggable.disable();
            draggable.revert();
            utils.remove(draggable);
          });

          playerCardElements.forEach(card => {
            return;
            const draggable = createDraggable(card, {
              x: true,
              y: true,
              releaseStiffness: 40,
              releaseMass: 0.1,
              container: '.game-table',
              onRelease: (_draggable) => {
                _draggable.reset();
              },
              onDrag: () => {
                // Drag handling logic can be added here
              },
            });
            draggables.value.push(draggable);
          });
        },
      );
    }
  };

  // Add cleanup function
  const cleanupDraggables = () => {
    draggables.value.forEach(draggable => {
      if (draggable) {
        utils.remove(draggable);
      }
    });
    draggables.value = [];
  };

  // Watch for changes in player cards
  watch(playerCards, () => {
    nextTick(() => {
      // Clean up existing draggables before creating new ones
      cleanupDraggables();
      
      document.querySelectorAll('.player-card-container').forEach(card => {
        const draggable = createDraggable(card, {
          x: true,
          y: true,
          releaseStiffness: 40,
          releaseMass: 0.1,
          container: '.game-table',
          onRelease: (_draggable) => {
            _draggable.reset();
          },
          onDrag: () => {
            // Drag handling logic can be added here
          },
        });
        draggables.value.push(draggable);
      });
    });
  }, { deep: true });

  // Clean up on unmount
  onBeforeUnmount(() => {
    cleanupDraggables();
  });

  return {
    deckCards,
    cardPool,
    playerCards,
    pointOfInsertions,
    drawCard,
    initializeGame,
  };
};

export default useGameTable;
