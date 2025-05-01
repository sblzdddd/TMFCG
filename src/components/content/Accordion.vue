<template>
  <v-expansion-panels elevation="0" variant="default" class="accordion !border-0">
    <slot />
  </v-expansion-panels>
</template>

<script setup lang="ts">
import './content.css'
</script>

<style lang="postcss">
.accordion {
  @apply !m-0 overflow-hidden;

  .v-expansion-panel {
    @apply bg-primary/20 border-b-2 border-primary/40 last:border-b-0;
  }

  .v-expansion-panel-title {
    @apply bg-primary/20 border-b-2 border-primary/40;
    
    &--active {
      @apply border-b border-primary/40;
    }
  }

  .v-expansion-panel-text {
    @apply !px-0 !py-0;
    transition: all 0.3s ease-in-out;
  }

  .v-expansion-panel-title__overlay,
  .v-expansion-panel-title__underlay {
    @apply !opacity-0;
  }

  .v-expansion-panel--active {
    @apply bg-primary/30;
    .v-expansion-panel-text {
      @apply px-4 py-2;
    }
  }
}
</style> 