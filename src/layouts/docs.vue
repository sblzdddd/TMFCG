<script lang="ts" setup>
import type { TocLink } from '@nuxtjs/mdc'
const route = useRoute()

const tocLinks = ref<TocLink[]>([])

const { data: navigation } = await useAsyncData('navigation', () => queryCollectionNavigation('docs'))
const { data: _files } = useLazyAsyncData('search', () => queryCollectionSearchSections('docs'), {
  server: false
})
const { data: page } = await useAsyncData(route.path, () => queryCollection('docs').path(route.path.replace('/docs', '')).first())

provide('navigation', navigation)

onMounted(() => {
  if (!page.value?.body?.toc?.links) return
  tocLinks.value = page.value?.body?.toc?.links
})

const pageContainer = ref<HTMLElement | null>(null)

watch(() => route.path, () => {
  if (pageContainer.value) {
    pageContainer.value.scrollTo({ top: 0, behavior: 'smooth' })
  }
})

watch(() => page.value?.body?.toc?.links, () => {
  if (!page.value?.body?.toc?.links) return
  tocLinks.value = page.value?.body?.toc?.links
})

const { isOpen } = useDocsNavDrawer()

const {windowHeight} = useViewport()

defineOptions({
  name: "DocsLayout",
});
</script>
<template>
  <v-app>
    
    <v-navigation-drawer
      v-model="isOpen"
      :width="windowHeight"
      location="top"
      class="nav-drawer"
      temporary
    >
      <div class="h-full">
        <div class="flex justify-center items-center p-2">
          <h3 class="text-xl">页面导航</h3>
          <v-btn class="fixed top-1 right-2" size="small" variant="text" icon="mdi-close" @click="isOpen = false" />
        </div>
        <Docs-NavSideBar v-if="navigation" :navigation="navigation" />
      </div>
    </v-navigation-drawer>
    <Header-NavBar is-wiki-page />
    <v-main style="padding-top: 56px;">
      <div ref="pageContainer" class="page-container">
        <aside class="page-navigation">
          <Docs-NavSideBar v-if="navigation" :navigation="navigation" />
        </aside>
        <div class="lg:col-span-8">
          <NuxtPage />
        </div>
      </div>
    </v-main>
  </v-app>
</template>
<style lang="postcss">
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
   flex flex-col lg:grid lg:grid-cols-10 lg:gap-10 h-[calc(100vh-54px)] overflow-y-auto;
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