<template>
  <blockquote>
    <slot />
  </blockquote>
</template>

<style scoped lang="postcss">
blockquote {
  @apply border-l-2 border-primary pl-4;
}
</style>