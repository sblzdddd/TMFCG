<template>
  <div class="content-base [&>div]:!border-t-0 [&>div]:!border-x-0 [&>div]:!rounded-none [&>div:last-child]:!border-b-0 [&>div]:!bg-transparent">
    <slot />
  </div>
</template>

<script setup lang="ts">
import './content.css';

</script>

<style lang="postcss" scoped>

</style> 