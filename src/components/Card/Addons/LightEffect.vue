<template>
  <div :style="`opacity: ${- rx /10 + ry / 10};mix-blend-mode:darken;`" class="card-sub bg-[#36140820]"/>
  <div :style="`opacity: ${ rx /10 - ry / 10};mix-blend-mode: lighten;`" class="card-sub bg-[#ffffff20]"/>
</template>
<script lang="ts" setup>
defineProps({
  rx: {
    type: Number,
    default: 0,
    required: false
  },
  ry: {
    type: Number,
    default: 0,
    required: false
  }
})
</script>
