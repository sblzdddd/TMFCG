<template>
  <div class="game-table">

    <!-- Card Deck -->
    <Card-Back
        v-for="(_, index) in deckCardsCount"
        :key="index"
        :class="[
          deckCardsCount <= 5 ? 'shadow-md' : 'shadow-sm',
        ]"
        :style="{
          top: `${windowHeight * 0.20 - index * 0.1 * 54 / deckCardsCount}px`,
          left: `${windowWidth * 0.80 - index * 0.13 * 54 / deckCardsCount}px`,
          width: `${windowWidth * 0.07}px`,
          height: `${windowWidth * 0.07 / CARD_CONST.cardRatio}px`,
          zIndex: index,
        }"
        class="card-in-deck"
        @click="requestDrawCard(5)"
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

    <!-- Opponent 0 (Top) -->
    <Card-Back
      v-for="index in opponentCardsCounts[0]"
      :id="`opponent-0-${index}`"
      :key="`opponent-0-${index}`"
      class="opponent-0-card"
    />

    <!-- Opponent 1 (Left) -->
    <Card-Back
      v-for="index in opponentCardsCounts[1]"
      :id="`opponent-1-${index}`"
      :key="`opponent-1-${index}`"
      class="opponent-1-card"
    />

    <!-- Opponent 2 (Right) -->
    <Card-Back
      v-for="index in opponentCardsCounts[2]"
      :id="`opponent-2-${index}`"
      :key="`opponent-2-${index}`"
      class="opponent-2-card"
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
            <Card-Addons-CardCharacter :character="card.data.character" />
          </template>
        </Card-Base>
      </div>
    </div>

  </div>

</template>

<script lang="ts" setup>
import { CARD_CONST } from '~/constants/card';
import { animateCardDraw } from './player_card_animation';
import { animateOpponentCardDraw } from './opponent_card_animation';
const { windowWidth, windowHeight } = useViewport();

watch([windowWidth, windowHeight], async () => {
  const cardsInDeck = document.querySelectorAll('.card-in-deck');
  const playerCardElements = document.querySelectorAll('.player-card');
  // Resize player cards
  animateCardDraw(
      Array.from(cardsInDeck) as HTMLElement[],
      Array.from(playerCardElements) as HTMLElement[],
      [],
      () => {},
      true,
  );

  // Resize opponent cards
  for (let i = 0; i < 3; i++) {
    const opponentCardElements = document.querySelectorAll(`.opponent-${i}-card`);
    if (opponentCardElements.length > 0) {
      animateOpponentCardDraw(
        i,
        Array.from(cardsInDeck) as HTMLElement[],
        Array.from(opponentCardElements) as HTMLElement[],
        0,
        () => {},
        true,
      );
    }
  }
});

const {
  deckCardsCount,
  cardPool,
  playerCards,
  opponentCardsCounts,
  requestDrawCard,
  initializeGame,
} = await useGameTable();

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

.opponent-0-card, .opponent-1-card, .opponent-2-card {
  @apply rounded-lg shadow-md;
  border: 1px solid #36140899;
}
</style>
