<template>
  <div
    :class="[
      'content-base flex gap-2 p-4',
      colorClasses
    ]"
  >
    <div class="flex-shrink-0 mt-1">
      <Icon :name="iconName" :size="20" />
    </div>
    <div class="flex-grow">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import './content.css'

interface Props {
  type?: 'note' | 'tip' | 'warning' | 'caution'
  icon?: string
  color?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: undefined,
  icon: undefined,
  color: undefined
})

const iconName = computed(() => {
  if (props.icon) return props.icon
  
  switch (props.type) {
    case 'note':
      return 'mdi:information'
    case 'tip':
      return 'mdi:lightbulb'
    case 'warning':
      return 'mdi:alert'
    case 'caution':
      return 'mdi:alert-octagon'
    default:
      return 'mdi:information'
  }
})

const colorClasses = computed(() => {
  if (props.color) return props.color

  switch (props.type) {
    case 'note':
      return '!bg-blue-500/20 !text-blue-700 !border-blue-500/40'
    case 'tip':
      return '!bg-green-500/20 !text-green-700 !border-green-500/40'
    case 'warning':
      return '!bg-yellow-500/20 !text-yellow-700 !border-yellow-500/40'
    case 'caution':
      return '!bg-red-500/20 !text-red-700 !border-red-500/40'
    default:
      return '!bg-primary/20 !border-primary/40'
  }
})
</script> 