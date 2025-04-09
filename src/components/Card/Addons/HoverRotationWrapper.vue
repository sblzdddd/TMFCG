<script lang="ts" setup>

const rx = ref(0)
const ry = ref(0)

function rotateCard(event: MouseEvent) {
  const container = event.currentTarget as HTMLElement;
  const rect = container.getBoundingClientRect();
  const offsetX = event.clientX - rect.left;
  const offsetY = event.clientY - rect.top;
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  const deltaX = (offsetX - centerX) / centerX;
  const deltaY = (offsetY - centerY) / centerY;

  rx.value = deltaY * 20;
  ry.value = deltaX * -20;
}
</script>

<template>
  <div class="card-container"
       @mouseleave="() => {rx=0;ry=0;}"
       @mousemove="rotateCard">
    <slot :rx="rx" :ry="ry"/>
  </div>
</template>

<style lang="postcss">
.card-container {
  @apply relative h-full flex items-center justify-center;
  perspective: 1000px;
  transform-style: preserve-3d;
  --rotate-x: 0deg;
  --rotate-y: 0deg;
}

.card {
  transition: all 0.1s ease;
}

.card-container .card:hover {
  transform-style: preserve-3d;
  transform: scale(97%) rotateX(var(--rotate-x)) rotateY(var(--rotate-y));
}
</style>
