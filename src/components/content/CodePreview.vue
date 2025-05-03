<template>
  <div class="content-base code-preview">
    <div class="p-4 flex items-center justify-center">
      <slot />
    </div>
    <div is-embedded>
      <slot name="code" />
    </div>
  </div>
</template>

<script setup lang="ts">
import './content.css'

</script>

<style scoped lang="postcss">
.code-preview {
  @apply w-full;
}

.preview-section {
  @apply mb-4;
}
</style> 