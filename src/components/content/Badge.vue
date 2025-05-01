<template>
  <span class="content-base inline-flex items-center px-2 py-0.5 text-sm rounded-md">
    <slot />
  </span>
</template>

<script setup lang="ts">
import './content.css'
</script>

<style lang="postcss" scoped>
.content-base {
  @apply !m-0 !border !border-primary/40;
}
</style> 