<template>
  <div class="card-back"/>
</template>
<script lang="ts" setup>
</script>
<style lang="postcss" scoped>
.card-back {
  @apply overflow-hidden rounded-[2%] relative z-[20];
  aspect-ratio: 756/1051 !important;
  height: 100%;
  width: auto;
  background: url('@/assets/images/cards/CardBack2.png') no-repeat center center;
  background-size: cover;
}
</style>
