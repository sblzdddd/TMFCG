<script setup lang="ts">

interface NavigationItem {
  title: string;
  path: string;
  children?: NavigationItem[];
}

definePageMeta({
  layout: 'docs-pure',
})
const route = useRoute()
const { data: page } = await useAsyncData(route.path, () => queryCollection('docs').path(route.path.replace('/docs/pdfview', '')).first())
const { data: navigation } = await useAsyncData<NavigationItem[]>('navigation', () => queryCollectionNavigation('docs'))

const currentSection = computed(() => {
  if (!navigation.value || !route.path) return null
  const currentPath = route.path.replace('/docs/pdfview', '')
  for (const section of navigation.value) {
    if (section.children?.some(child => child.path === currentPath)) {
      return section.title
    }
  }
  return null
})

onMounted(() => {
  LoadingState.isLoading = false
})

useSeoMeta({
  title: page.value?.title,
  description: page.value?.description
})


</script>

<template>
  
  <div class="flex flex-col-reverse lg:grid lg:grid-cols-10 lg:gap-10">
    <div class="lg:col-span-8 mb-40">
      <template v-if="page">
        <div class="flex flex-col border-b-2 border-primary/40 py-4 mb-6">
          <p v-if="currentSection" class="text-[1.05rem] jiangxizhuokai font-medium mb-0 pl-1">{{ currentSection }}</p>
          <h1 class="jiangxizhuokai font-medium text-5xl mt-2 mb-4">{{ page.title }}</h1>
          <p class="text-[1.1rem] text-gray-500 pl-1">{{ page.description }}</p>
        </div>
        <ContentRenderer class="docs-content" :value="page" />
      </template>
      <template v-else>
        <div class="empty-page">
          <h1>Page Not Found</h1>
          <p>Oops! The content you're looking for doesn't exist.</p>
          <NuxtLink to="/">Go back home</NuxtLink>
        </div>
      </template>
    </div>
  </div>
</template>
<style lang="postcss">
.docs-content a {
  @apply hover:opacity-80 active:opacity-60 active:scale-95;
  background-image: linear-gradient(to right, currentColor, currentColor);
  background-size: 0 2px;
  background-position: center 100%;
  background-repeat: no-repeat;
}

.docs-content a:hover {
    background-size: 100% 2px !important;
}

.docs-content :not(h1):not(h2):not(h3):not(h4):not(h5):not(h6) > a:not(.v-btn) {
    @apply text-[#ce8d32];
}

.bottomLink {
  @apply flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-black/5 transition-colors;
}

</style>
