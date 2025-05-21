<script lang="ts" setup>
const route = useRoute()

const pageContainer = ref<HTMLElement | null>(null)

watch(() => route.path, () => {
  if (pageContainer.value) {
    pageContainer.value.scrollTo({ top: 0, behavior: 'smooth' })
  }
})

defineOptions({
  name: "DocsPureLayout",
});
</script>
<template>
  <v-app>
    <v-main>
      <div ref="pageContainer" class="page-container">
        <div class="lg:col-span-8">
          <NuxtPage />
        </div>
      </div>
    </v-main>
  </v-app>
</template>
<style lang="postcss">
body, html {
  @apply overflow-auto;
}
.page-enter-active,
.page-leave-active {
  transition: all 0.2s ease-out;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}
.page-container {
  @apply w-full px-2 md:px-4 lg:px-6 xl:px-12 gap-2
   flex flex-col lg:grid lg:grid-cols-10 lg:gap-10 h-full;
}
.page-navigation {
  @apply hidden lg:block lg:col-span-2 sticky top-0 h-screen overflow-y-auto py-4 px-0 lg:pl-2;
}
.nav-drawer {
  @apply !bg-background/70 !backdrop-blur-sm;
  &~.v-navigation-drawer__scrim {
    @apply !opacity-0;
  }
}
</style>