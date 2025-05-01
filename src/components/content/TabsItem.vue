<template>
  <slot />
</template>

<script setup lang="ts">
import { onMounted, inject, useSlots } from 'vue'

interface Props {
  label: string
  icon?: string
}

const props = defineProps<Props>()
const slots = useSlots()

onMounted(() => {
  const parent = inject('tabs-parent') as { registerTab: (tab: { label: string, icon?: string, content: unknown }) => number } | undefined
  if (!parent || !slots.default) return

  parent.registerTab({
    label: props.label,
    icon: props.icon,
    content: slots.default()
  })
})
</script>

<style lang="postcss" scoped>
.prose-content {
  @apply text-sm;

  :deep(pre) {
    @apply !m-0;
  }
}
</style> 