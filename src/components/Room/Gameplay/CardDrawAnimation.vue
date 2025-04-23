<template>
  <Card-Base
      v-if="isAnimating"
      id="animated-card"
      :number="CardNumbers.findIndex((val) => val === animatedCard.number) + 1"
      :show-back="false"
      :style="{
            transform: `translateZ(${deckCardsLength}px) ${deckCardsLength <= 5 ? `translateX(${(4 - deckCardsLength) * 10}px)` : ''}`,
            zIndex: deckCardsLength
        }"
      :suit="animatedCard.suit"
      :y-rotation="cardYRotation"
      class="animated-card"
  >
    <template #front>
      <Card-Addons-CharacterEdit
          :char-name="animatedCard.character"
          :char-variant="animatedCard.characterVariant"
          :offset-x="animatedCard.characterX"
          :offset-y="animatedCard.characterY"
      />
    </template>
  </Card-Base>
</template>

<script lang="ts" setup>
import CardBase from '@/components/Card/Base.vue';
import type {CardAppearance} from '@/utils/card_animation';

const props = defineProps<{
  isAnimating: boolean;
  animatedCard: CardAppearance;
  cardYRotation: number;
  deckCardsLength: number;
}>();

const CardNumbers = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
</script>

<style lang="postcss" scoped>
.animated-card {
  @apply absolute;
  aspect-ratio: 2.5/3.5;
  z-index: 1000;
  transform-style: preserve-3d;
  pointer-events: none;
  transform: rotateX(24deg);
}
</style>