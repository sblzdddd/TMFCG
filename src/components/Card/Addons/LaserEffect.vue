<template>
  <div :style="`opacity: ${Math.abs(ry) /14 + Math.abs(rx) /14 - 0.5};`" class="card-sub laser-effect-mask">
    <div :style="`background-position: ${ry*12}px ${rx*12}px`" class="laser-effect"/>
  </div>
</template>
<script lang="ts" setup>
defineProps({
  value: {
    type: Number,
    default: 7,
    required: false
  },
  suit: {
    type: Number,
    default: 2,
    required: false
  },
  rx: {
    type: Number,
    default: 0,
    required: false
  },
  ry: {
    type: Number,
    default: 0,
    required: false
  }
})
</script>
<style lang="postcss" scoped>

.laser-effect-mask {
  background-image: linear-gradient(60deg, white, transparent, white);
  mask-image: url('@/assets/images/cards/Base_Laser.png');
  mask-size: contain;
  mix-blend-mode: hard-light;
  transition: opacity 0.1s ease;
}

.laser-effect {
  @apply w-full h-full bg-repeat;
  background-image: url('@/assets/images/cards/laser.jpg');
  background-size: 60%;
}
</style>