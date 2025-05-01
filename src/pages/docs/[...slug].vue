<script setup lang="ts">

definePageMeta({
  layout: 'docs',
})
const route = useRoute()
const { data: page } = await useAsyncData(route.path, () => queryCollection('docs').path(route.path.replace('/docs', '')).first())
onMounted(() => {
  console.log(page.value)
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
        <div class="flex flex-col border-b-2 border-primary/40 py-4 gap-4">
          <p class="text-sm text-gray-500">{{ page.links }}</p>
          <h1 class="jiangxizhuokai font-medium text-4xl">{{ page.title }}</h1>
          <p class="text-lg text-gray-500">{{ page.description }}</p>
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
    <Docs-NavToc v-if="page?.body?.toc?.links" :tocs="page?.body?.toc?.links" />
  </div>
</template>
<style lang="postcss">
.docs-content a {
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
</style>
