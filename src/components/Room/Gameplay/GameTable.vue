<template>
  <div class="game-table">

    <!-- Card Deck -->
    <Card-Back
        v-for="(_, index) in deckCards.length"
        :key="index"
        :class="[
                deckCards.length <= 5 ? 'shadow-md' : 'shadow-sm',
            ]"
        :style="{
                top: `${windowHeight * 0.13 - index * 0.1 * 54 / deckCards.length}px`,
                left: `${windowWidth * 0.17 - index * 0.13 * 54 / deckCards.length}px`,
                width: `${windowWidth * 0.1}px`,
                height: `${windowWidth * 0.1 / cardRatio}px`,
                zIndex: index
            }"
        class="card-in-deck"
        @click="drawCard"
    />

    <!-- Player's card zone -->
    <Card-PlayingCard
        v-for="(card) in playerCards"
        :id="`player-card-${card.id}`"
        :key="`${card.id}`"
        :number="card.data.number"
        :rotate-x="card.rotateX"
        :rotate-y="card.rotateY"
        :show-back="false"
        :suit="card.data.suit"
        class="player-card"
    />

    <!-- Card pool area -->
    <div class="card-pool-area">
      <div
          v-for="(card, index) in cardPool"
          :key="index"
          class="pool-card-container"
      >
        <Card-Base
            :number="card.data.number"
            :show-back="false"
            :suit="card.data.suit"
            class="pool-card"
        >
          <template #front>
            <Card-Addons-CharacterEdit
                :char-name="card.data.appearance.character"
                :char-variant="card.data.appearance.characterVariant"
                :offset-x="card.data.appearance.characterX"
                :offset-y="card.data.appearance.characterY"
            />
          </template>
        </Card-Base>
      </div>
    </div>

  </div>

  <div class="absolute bottom-10 left-10 w-[20%] flex flex-col gap-4 z-[100]">
    <v-text-field
        v-model="numOfDrawCards"
        label="Number of Draw Cards"
        max="7"
        min="1"
        type="number"
    />
    <v-text-field
        v-model="pointOfInsertions"
        label="Point of Insertions"
        type="text"
    />
    <v-btn color="primary" @click="drawCard">
      Draw Card
    </v-btn>
    <p>Cards in deck: {{ deckCards.length }}</p>
  </div>
</template>

<script lang="ts" setup>
import {nextTick, onMounted, ref, watch} from 'vue';
import setB from '@/assets/Set B.json';
import {createDraggable} from 'animejs';
import {animateCardDraw} from '@/utils/card_animation';
import type {CardData, CardProfile, PlayingCard} from '~/types/Card';

const deckCards = ref<CardData[]>([]);
const cardPool = ref<PlayingCard[]>([]);

const playerCards = ref<PlayingCard[]>([]);

const numOfDrawCards = ref(1);
const pointOfInsertions = ref("");

const {windowWidth, windowHeight} = useViewport();
const cardRatio = 756 / 1051;

watch([windowWidth, windowHeight], () => {
  const cardsInDeck = document.querySelectorAll('.card-in-deck');
  const playerCardElements = document.querySelectorAll('.player-card');
  animateCardDraw(
      Array.from(cardsInDeck) as HTMLElement[],
      Array.from(playerCardElements) as HTMLElement[],
      [],
      () => {
      },
  );
})

// Shuffle array function
const shuffleArray = (array: CardData[]) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Initialize game
onMounted(() => {
  // Load the card profile from setB
  const {currentProfile} = useCardProfile();
  const {loadProfile} = useCardLoader();
  loadProfile(setB as CardProfile);

  // Shuffle the cards and set the deck
  deckCards.value = shuffleArray(currentProfile.value.cards);
});

watch(playerCards, () => {
  nextTick(() => {
    document.querySelectorAll('.player-card-container').forEach(card => {
      createDraggable(card, {
        x: false,
        containerPadding: 10,
        releaseStiffness: 40,
        releaseEase: 'out(3)',
      });
    });
  });
}, {deep: true});

let newestID = 0;

// Draw a card from the deck
const drawCard = async () => {
  if (deckCards.value.length > 0) {

    console.log(pointOfInsertions.value)

    const indexList: number[] = pointOfInsertions.value.split(" ").map(Number);

    console.log(indexList)

    for (let i = 0; i < numOfDrawCards.value; i++) {
      newestID++;
      // Get the card from the deck
      const drawnCard = deckCards.value.pop();
      if (!drawnCard) return;

      playerCards.value.splice(indexList[i], 0, {
        data: drawnCard,
        isAnimating: true,
        id: newestID,
        rotateY: 0,
        rotateX: 0
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
        indexList,
        () => {
          indexList.forEach(index => {
            playerCards.value[index].isAnimating = false;
          });
        },
    );
  }
};

// Play a card from player's hand to the pool
// const playCard = (index: number) => {
//   if (index >= 0 && index < playerCards.value.length) {
//     const playedCard = playerCards.value.splice(index, 1)[0];
//     cardPool.value.push(playedCard);
//   }
// };
</script>

<style lang="postcss" scoped>
.game-table {
  @apply relative w-full h-full overflow-hidden;
  box-shadow: inset 0 0 50px 20px #5f000010;
}

.card-deck {
  @apply absolute top-[12%] left-[20%] h-auto cursor-pointer;
  aspect-ratio: 2.5/3.5;
  width: 120px;
  position: relative;
}

.card-in-deck {
  @apply absolute top-0 left-0 w-full;
  height: 100%;
  transition: all 0.3s ease;
  backface-visibility: hidden;
}

/* Card pool area */
.card-pool-area {
  @apply absolute top-[40%] left-[30%] w-[40%] flex justify-center items-center gap-2;
  height: 20%;
  transform-style: preserve-3d;
  transform: rotateX(24deg);
}

.pool-card-container {
  @apply w-[12%] h-full relative;
}

.pool-card {
  @apply w-auto h-full;
  transition: transform 0.3s ease;
}

.play-card-btn {
  @apply absolute left-1/2 bottom-[35px] transform -translate-x-1/2 opacity-0 transition-opacity;
  z-index: 200;
}
</style>