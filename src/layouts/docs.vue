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

watch(() => page.value?.body?.toc?.links, () => {
  console.log('tocLinks', page.value?.body?.toc?.links)
  if (!page.value?.body?.toc?.links) return
  tocLinks.value = page.value?.body?.toc?.links
})

defineOptions({
  name: "DocsLayout",
});
</script>
<template>
  <v-app>
    <Header-NavBar is-wiki-page />
    <v-main style="padding-top: 56px;">
      <div class="page-container">
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
  @apply w-full px-4 md:px-8 lg:px-10 xl:px-12 gap-2
   flex flex-col lg:grid lg:grid-cols-10 lg:gap-10 h-[calc(100vh-54px)] overflow-y-auto;
}
.page-navigation {
  @apply hidden lg:block lg:col-span-2 sticky top-0 h-screen overflow-y-auto p-4;
}
</style>
