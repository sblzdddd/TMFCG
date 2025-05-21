<template>
  <NuxtLink
    :href="props.href"
    :target="props.target || `${props.href.startsWith('http') ? '_blank' : undefined}`"
  >
    <slot />
  </NuxtLink>
</template>

<script setup lang="ts">

const props = defineProps({
  href: {
    type: String,
    default: ''
  },
  target: {
    type: String as PropType<'_blank' | '_parent' | '_self' | '_top' | (string & object) | null | undefined>,
    default: undefined,
    required: false
  }
})
</script>