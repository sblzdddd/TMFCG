<template>
  <v-expansion-panel>
    <v-expansion-panel-title>
      <div class="flex items-center gap-3">
        <Icon v-if="icon" :name="icon" :size="20" />
        <span class="font-medium">{{ label }}</span>
      </div>
    </v-expansion-panel-title>
    <v-expansion-panel-text>
      <slot />
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>

<script setup lang="ts">
interface Props {
  label?: string
  icon?: string
}

withDefaults(defineProps<Props>(), {
  label: '',
  icon: undefined
})
</script>

<style lang="postcss" scoped>
:deep(.v-expansion-panel-title) {
  @apply hover:bg-primary/30;
}

:deep(.v-expansion-panel-text__wrapper) {
  @apply text-sm;
}
</style> 