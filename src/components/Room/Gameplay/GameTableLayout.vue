<template>
  <div class="game-table" @mouseup="handleMouseUp">

    <!-- Card Deck -->
    <Card-Back
        v-for="(_, index) in deckCardsCount"
        :key="index"
        :class="[
          deckCardsCount <= 5 ? 'shadow-md' : 'shadow-sm',
        ]"
        :style="{
          top: `${windowHeight * 0.37 - index * 0.1 * 54 / deckCardsCount}px`,
          left: `${windowWidth * 0.45 - index * 0.13 * 54 / deckCardsCount}px`,
          width: `${windowHeight * 0.12}px`,
          height: `${windowHeight * 0.12 / CARD_CONST.cardRatio}px`,
          zIndex: index,
        }"
        class="card-in-deck"
        @click="requestDrawCard(1)"
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
      @mousedown="handleMouseDown($event, card)"
      @mousemove="handleMouseMove($event, card)"
      @mouseup="handleMouseUp"
      @mouseleave="handleMouseLeave(card)"
    />

    <!-- Opponents -->
    <template v-for="opponentIndex in 3" :key="`opponent-${opponentIndex - 1}`">
      <Card-Back
        v-for="cardIndex in opponentCardsCounts[opponentIndex - 1]"
        :id="`opponent-${opponentIndex - 1}-${cardIndex}`"
        :key="`opponent-${opponentIndex - 1}-${cardIndex}`"
        :class="`opponent-${opponentIndex - 1}-card`"
      />
    </template>

    <!-- Played cards -->
     <template v-for="(playedCard, index) in playedCards" :key="index">
      <Card-PlayingCard
        v-for="card in playedCard.cards"
        :id="`played-card-${index}-${card.data.id}`"
        :key="`${playedCard.userId}-${card.id}`"
        :number="card.data.number"
        :show-back="false"
        :suit="card.data.suit"
        @click="requestDrawFromPlayedCard(playedCard.userId, card.data.id)"
      />
    </template>

    <div class="play-card-btn-container" :style="{bottom: `${windowHeight * (CARD_CONST.playerCard.height + 0.07)}px`}">
      <v-btn 
        id="play-card-btn" 
        :size="windowWidth > 960 ? 'large' : 'small'"
        color="primary" 
        class="play-card-btn"
        :class="{'opacity-50': !hasSelectedCards}"
        :disabled="!hasSelectedCards"
        @click="requestPlayCard"
      >
      <template #prepend>
        <Icon :size="windowWidth > 960 ? 24 : 16" class="mt-1" name="material-symbols:playing-cards-rounded" />
      </template>
        出牌
      </v-btn>
      <v-btn 
        id="play-card-btn" 
        :size="windowWidth > 960 ? 'large' : 'small'"
        color="error" 
        class="play-card-btn"
      >
        <template #prepend>
          <Icon :size="windowWidth > 960 ? 24 : 16" class="mt-0.5" name="material-symbols:cancel" />
        </template>
        不要
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { CARD_CONST } from '~/constants/card';
import { animatePlayerCardDraw } from './player_card_animation';
import { animateOpponentCardDraw } from './opponent_card_animation';
import { animatePlayedCards } from './played_card_animation';
import type { PlayingCard } from '~/lib/PlayingCard/PlayingCard';
import { ref } from 'vue';;
const { windowWidth, windowHeight } = useViewport();

const isMouseDown = ref(false);
const startCard = ref<PlayingCard | null>(null);
const lastHoveredCard = ref<PlayingCard | null>(null);
// true if user is activating cards when mouse down
const startSelectionChangeMode = ref(false);

const handleMouseDown = (event: MouseEvent, card: PlayingCard) => {
  isMouseDown.value = true;
  startCard.value = card;
  lastHoveredCard.value = card;
  startSelectionChangeMode.value = card.isSelected;
  toggleCardSelection(card);
};

const handleMouseMove = (event: MouseEvent, card: PlayingCard) => {
  if (!isMouseDown.value || !startCard.value) return;
  
  // Only process if we've moved to a different card
  if (lastHoveredCard.value?.id !== card.id) {
    lastHoveredCard.value = card;
    if(startSelectionChangeMode.value === card.isSelected) {
      toggleCardSelection(card);
    }
  }
};

const hasSelectedCards = computed(() => {
  return playerCards.value.some(card => card.isSelected);
});

const handleMouseUp = () => {
  isMouseDown.value = false;
  startCard.value = null;
  lastHoveredCard.value = null;
};

const handleMouseLeave = (card: PlayingCard) => {
  if (card.id === lastHoveredCard.value?.id) {
    lastHoveredCard.value = null;
  }
};

watch([windowWidth, windowHeight], async () => {
  //reset card selection
  resetCardSelection();

  // Resize player cards
  animatePlayerCardDraw();

  // Resize played cards
  for (let i = 0; i < playedCards.value.length; i++) {
    animatePlayedCards(i);
  }

  // Resize opponent cards
  for (let i = 0; i < 3; i++) {
    animateOpponentCardDraw(i);
  }
});

const {
  deckCardsCount,
  playedCards,
  playerCards,
  opponentCardsCounts,
  requestDrawCard,
  initializeGame,
  toggleCardSelection,
  resetCardSelection,
  requestPlayCard,
  requestDrawFromPlayedCard,
} = await useGameTable();

const {currentRoom} = useRoom();

watch(() => currentRoom.value?.members, (newMembers) => {
  console.log('newMembers', newMembers);
  if(newMembers && newMembers.length > 0) {
    initializeGame();
  }
});

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
.play-card-btn-container {
  @apply fixed left-0 w-full gap-20 flex justify-center transition-opacity duration-300;
  z-index: 200;
  .play-card-btn {
    transition: all 0s linear;
  }
}

.opponent-0-card, .opponent-1-card, .opponent-2-card {
  @apply rounded-lg shadow-md;
  border: 1px solid #36140899;
}

.player-card {
  backface-visibility: hidden;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}
</style>
