<script lang="ts" setup>
import {LoadingState} from "@/utils/loading";

definePageMeta({
  layout: 'fullscreen',
})


onMounted(() => {
  LoadingState.isLoading = false;
})
</script>

<template>
  <div class="flex flex-col h-full">
    <ClientOnly>
      <Header-EditorTitleBar/>
      <Form-CardEdit/>
    </ClientOnly>
  </div>
</template>
<style lang="postcss">
button[role="tab"] span.truncate {
  @apply text-xl mb-1;
}

</style>