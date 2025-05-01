<template>
  <div class="content-base p-4">
    <div class="flex items-center gap-2 mb-2">
      <code class="text-base font-mono font-bold">{{ name }}</code>
      <code class="text-sm italic font-mono">{{ type }}</code>
      <span v-if="required" class=" text-xs font-bold bg-primary/20 px-1.5 py-0.5 rounded">required</span>
    </div>
    <div class="text-sm">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import './content.css'

interface Props {
  name?: string
  type?: string
  required?: boolean
}

withDefaults(defineProps<Props>(), {
  name: '',
  type: '',
  required: false
})
</script>

<style lang="postcss" scoped>
.content-base {
  @apply !m-0;
}
</style> 