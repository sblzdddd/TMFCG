<script setup lang="ts">

definePageMeta({
  layout: 'docs',
})
const route = useRoute()
const { data: page } = await useAsyncData(route.path, () => queryCollection('docs').path(route.path.replace('/docs', '')).first())
onMounted(() => {
  console.log('mounted')
  LoadingState.isLoading = false
})

useSeoMeta({
  title: page.value?.title,
  description: page.value?.description
})


</script>

<template>
  <div>
    <template v-if="page">
      <ContentRenderer :value="page" />
    </template>
    <template v-else>
      <div class="empty-page">
        <h1>Page Not Found</h1>
        <p>Oops! The content you're looking for doesn't exist.</p>
        <NuxtLink to="/">Go back home</NuxtLink>
      </div>
    </template>
  </div>
</template>
