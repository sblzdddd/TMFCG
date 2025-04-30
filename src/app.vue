<template>
  <NuxtLoadingIndicator color="#502e21"/>
  <NuxtLayout/>
  <Transition name="page">
    <Common-Loading v-if="LoadingState.isLoading"/>
  </Transition>
</template>
<script lang="ts" setup>
import {useViewport} from '@/composables/useViewport';

const {windowWidth, windowHeight} = useViewport();

onMounted(() => {
  console.log(windowWidth.value, windowHeight.value);
});
</script>
<style>
</style>