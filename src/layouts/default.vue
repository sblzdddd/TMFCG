<script lang="ts" setup>
import { LoadingState } from '@/utils/loading';
defineOptions({
  name: 'DefaultLayout'
})
</script>
<template>
    <v-app>
      <Header-NavBar/>
      <div class="decorations absolute top-0 left-0 right-0 w-full h-full flex pointer-events-none">
        <div class="decoration" />
        <div class="grow" />
        <div class="decoration" />
      </div>
      <v-main style="padding-top: 54px;">
        <NuxtPage />
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
  
  .page-wrapper {
    width: 100%;
    height: 100%;
  }
  
  .decoration {
    @apply lg:mx-4 mx-2 lg:w-6 w-3 h-full bg-repeat;
    background-image: url("../assets/images/decoration.svg");
    background-size: contain;
  }
  </style>