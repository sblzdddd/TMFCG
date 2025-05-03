<template>
  <component
    :is="to ? (target === '_self' ? NuxtLink : 'a') : 'div'"
    v-ripple
    :to="to"
    :href="target === '_self' ? undefined : to"
    :target="target"
    class="prose-card"
  >
    <div class="flex items-start gap-3">
      <Icon v-if="icon" :name="icon" :size="24" class="flex-shrink-0 mt-1" />
      <div class="flex-grow">
        <h3 v-if="title" class="text-lg font-semibold mb-1">{{ title }}</h3>
        <slot />
      </div>
    </div>
    <Icon v-if="to" name="mingcute:external-link-line" :size="16" class="absolute top-2 right-2" />
  </component>
</template>

<script setup lang="ts">
import { NuxtLink } from '#components'
import './content.css'

interface Props {
  title?: string;
  icon?: string;
  to?: string;
  target?: string;
}

defineProps<Props>();
</script>

<style lang="postcss">
.prose-card {
  @apply overflow-hidden relative block rounded-lg p-4 border-2 border-foreground/20 hover:bg-primary/40 hover:border-primary;
  transition: all 0.3s ease;
}
</style>
