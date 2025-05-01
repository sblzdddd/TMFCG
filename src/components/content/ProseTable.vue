<template>
  <div class="content-base table-wrapper">
    <table class="table">
      <slot />
    </table>
  </div>
</template>
<script setup lang="ts">
import './content.css'
</script>
<style lang="postcss">
.table-wrapper {
  @apply my-4 overflow-x-auto w-full;
}

.table {
  @apply w-full border-collapse text-left;
}
</style> 