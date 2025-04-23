<template>
  <NuxtLoadingIndicator color="#502e21"/>
  <NuxtLayout/>
  <Transition name="page">
    <Common-Loading v-if="LoadingState.isLoading"/>
  </Transition>
</template>
<style>
</style>