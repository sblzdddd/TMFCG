<template>
  <div class="lg:col-span-2 max-h-screen lg:sticky lg:top-0 lg:h-screen overflow-y-auto lg:py-4">
    <p class="text-lg mt-4 mb-2 font-medium jiangxizhuokai">目录</p>
    <nav class="pl-1">
      <ul class="nav-list">
        <li v-for="toc in tocs" :key="toc.id" class="toc-group">
          <div class="toc-header">
            <NuxtLink :to="`#${toc.id}`" class="toc-title">{{ toc.text }}</NuxtLink>
          </div>
          <ul class="toc-children overflow-hidden" style="height: auto; opacity: 1;">
            <li v-for="item in toc.children" :key="item.id" class="toc-item">
              <NuxtLink :to="`#${item.id}`" class="toc-link">
                {{ item.text }}
              </NuxtLink>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
import type { TocLink } from '@nuxtjs/mdc'
defineProps<{
  tocs: TocLink[]
}>()

</script>
<style lang="postcss">
.nav-list {
    @apply space-y-1;
}
.toc-group {
  @apply rounded-lg;
}
.toc-header {
  @apply flex items-center justify-between cursor-pointer hover:opacity-80 overflow-hidden text-sm;
  transition: all 0.1s ease-in-out;
}
.toc-children {
  @apply ml-3 border-l-[1px] border-black/10;
  transform-origin: top;
  will-change: height, opacity, transform;
}
.toc-item {
  @apply ml-1 flex items-center;
}
.toc-item::after {
  content: '';
  @apply fixed left-0 h-full w-[1px] bg-white/10;
}
.toc-link {
  @apply flex items-center gap-2 w-full text-sm hover:opacity-80 !px-2 !py-0.5;
  transition: all 0.1s ease-in-out;
}
</style>
