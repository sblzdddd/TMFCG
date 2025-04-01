<template>
  <NuxtLayout/>
  <Transition name="page">
    <Common-Loading v-if="LoadingState.isLoading" />
  </Transition>
</template>
<style>
</style>