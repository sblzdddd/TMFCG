<script lang="ts" setup>
import {animate, createSpring} from 'animejs';
const route = useRoute()  

interface NavigationGroup {
  path: string;
  title: string;
  children: Array<{ path: string; title: string }>;
  isOpen: boolean;
}

const { data: navigation } = await useAsyncData<NavigationGroup[]>('navigation', () => queryCollectionNavigation('docs'))
const { data: _files } = useLazyAsyncData('search', () => queryCollectionSearchSections('docs'), {
  server: false
})
const { data: page } = await useAsyncData(route.path, () => queryCollection('docs').path(route.path.replace('/docs', '')).first())

// Add isOpen property to each navigation group
if (navigation.value) {
  navigation.value.forEach((group: NavigationGroup) => {
    group.isOpen = false;
  });
}

provide('navigation', navigation)

onMounted(() => {
  console.log(page.value?.body?.toc?.links)
})


defineOptions({
  name: "DocsLayout",
});
</script>
<template>
  <v-app>
    <Header-NavBar is-wiki-page />
    <v-main>
      <div class="page-container">
        <aside class="page-navigation">
          <Common-NavSideBar :navigation="navigation" />
        </aside>
        <div class="lg:col-span-8">
          <div class="flex flex-col lg:grid lg:grid-cols-10 lg:gap-10">
            <div class="lg:col-span-8">
              <NuxtPage/>
            </div>
            <nav class="lg:col-span-2 sticky top-0 h-screen overflow-y-auto py-4">
              <p class="text-sm mt-4 font-bold">Table of Contents</p>
              <ul class="toc-list">
                <li v-for="item in navigation" :key="item.path" class="toc-item">
                  <NuxtLink :to="`/docs${item.path}`" class="toc-link">{{ item.title }}</NuxtLink>
                </li>
              </ul>
            </nav>
          </div>
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

.toc-list {
  @apply space-y-1 mt-2;
}
.toc-item {
  @apply rounded-lg;
}
.toc-link {
  @apply block px-4 py-2 text-sm hover:bg-gray-100 rounded-lg;
}
</style>
