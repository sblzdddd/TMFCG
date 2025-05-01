<template>
  <div class="steps-container">
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  level?: string
}>()
</script>

<style scoped lang="postcss">
.steps-container {
  @apply space-y-8 relative;
}

.steps-container :deep(h4) {
  @apply pl-12 !ml-0 relative flex items-center;
}

.steps-container :deep(h4)::before {
  @apply absolute left-0 w-8 h-full rounded-full bg-primary text-white !text-base flex items-center justify-center font-bold;
  counter-increment: step_counter 1;
  content: counter(step_counter);
}

.steps-container :deep(h4:last-child)::after {
  display: none;
}

.steps-container :deep(> *:not(h4)) {
  @apply ml-12 border-l-2 border-primary/40;
}
</style> 