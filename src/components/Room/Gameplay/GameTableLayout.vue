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
                width: `${windowWidth * 0.07}px`,
                height: `${windowWidth * 0.07 / CARD_CONST.cardRatio}px`,
                zIndex: index,
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
            <Card-Addons-CardCharacter
                :char-name="card.data.appearance.character"
                :char-variant="card.data.appearance.variant"
                :offset-x="card.data.appearance.offsetX"
                :offset-y="card.data.appearance.offsetY"
            />
          </template>
        </Card-Base>
      </div>
    </div>

  </div>

</template>

<script lang="ts" setup>
import { CARD_CONST } from '~/constants/card';
import { animateCardDraw } from './card_animation';
const { windowWidth, windowHeight } = useViewport();

watch([windowWidth, windowHeight], () => {
  const cardsInDeck = document.querySelectorAll('.card-in-deck');
  const playerCardElements = document.querySelectorAll('.player-card');
  animateCardDraw(
      Array.from(cardsInDeck) as HTMLElement[],
      Array.from(playerCardElements) as HTMLElement[],
      [],
      () => {},
      true,
  );
})


const {
  deckCards,
  cardPool,
  playerCards,
  drawCard,
  initializeGame,
} = useGameTable();

onMounted(() => {
  initializeGame();
});
</script>

<style lang="postcss" scoped>
.game-table {
  @apply relative w-full h-full overflow-hidden;
  box-shadow: inset 0 0 50px 20px #5f000010;
}

.card-in-deck {
  @apply absolute top-0 left-0 w-full;
  height: 100%;
  transition: all 0.3s ease;
  backface-visibility: hidden;
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
