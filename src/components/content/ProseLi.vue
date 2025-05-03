<template>
  <li><slot /></li>
</template>

<style scoped lang="postcss">
li {
  @apply relative list-none pl-4;
  &::before {
    @apply absolute left-0 opacity-70;
  }
}

:where(ul) > li::before {
  @apply content-['•'];
}

:where(ol) > li {
  counter-increment: list-counter;
  &::before {
    @apply content-[counter(list-counter)'.'];
  }
}
</style>
