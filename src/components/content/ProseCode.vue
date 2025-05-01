<template>
  <span class="content-base inline-flex items-center p-0 text-sm rounded-md">
    <pre class="pre-body" :class="$props.class"><slot /></pre>
  </span>
</template>

<script setup lang="ts">
import './content.css'
</script>

<style lang="postcss" scoped>
.content-base {
  @apply !m-0 !border !border-primary/40;
}
.pre-body {
  @apply !m-0 !p-1;
}
</style> 