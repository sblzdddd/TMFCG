<template>
  <NuxtLoadingIndicator color="#502e21"/>
  <NuxtLayout/>
  <Debug-Panel />
  <Transition name="page">
    <Common-Loading v-if="LoadingState.isLoading"/>
  </Transition>
</template>
<script lang="ts" setup>

</script>
<style>
</style>