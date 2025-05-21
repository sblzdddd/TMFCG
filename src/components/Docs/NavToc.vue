<template>
  <div class="lg:col-span-2 max-h-screen lg:sticky lg:top-0 lg:h-screen overflow-y-auto lg:py-4">
    <p class="text-lg mt-4 mb-2 font-medium jiangxizhuokai">目录</p>
    <nav class="pl-1">
      <ul class="nav-list">
        <li v-for="toc in tocs" :key="toc.id" class="toc-group">
          <div class="toc-header">
            <NuxtLink :to="`#${toc.id}`" class="toc-title" @click="(e: MouseEvent) => handleTocClick(e, toc.id)">{{ toc.text }}</NuxtLink>
          </div>
          <ul class="toc-children overflow-hidden" style="height: auto; opacity: 1;">
            <li v-for="item in toc.children" :key="item.id" class="toc-item">
              <div class="">
                <NuxtLink :to="`#${item.id}`" class="toc-link" @click="(e: MouseEvent) => handleTocClick(e, item.id)">
                  <span class="toc-title">{{ item.text }}</span>
                </NuxtLink>
              </div>
              <ul class="toc-children overflow-hidden" style="height: auto; opacity: 1;">
                <li v-for="subItem in item.children" :key="subItem.id" class="toc-item">
                  <NuxtLink :to="`#${subItem.id}`" class="toc-link" @click="(e: MouseEvent) => handleTocClick(e, subItem.id)">
                    <span class="toc-title">{{ subItem.text }}</span>
                  </NuxtLink>
                </li>
              </ul>
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

const handleTocClick = (event: MouseEvent, id: string) => {
  event.preventDefault()
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
    // Update URL hash after scrolling
    window.history.pushState(null, '', `#${id}`)
  }
}

const handleAnchorClick = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  // Check if it's an anchor element inside a heading
  if (target.tagName === 'A' && target.closest('h1, h2, h3, h4, h5, h6')) {
    const href = target.getAttribute('href')
    if (href?.startsWith('#')) {
      event.preventDefault()
      const id = decodeURIComponent(href.slice(1))
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
        window.history.pushState(null, '', href)
      }
    }
  }
}

onMounted(() => {
  // Handle initial scroll position if URL has a hash
  if (window.location.hash) {
    const id = decodeURIComponent(window.location.hash.slice(1)) // Remove the # symbol and decode
    const element = document.getElementById(id)
    if (element) {
      // Use a small timeout to ensure the page is fully rendered
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }

  // Add click event listener for heading anchor elements
  document.addEventListener('click', handleAnchorClick)
})

onUnmounted(() => {
  // Clean up event listener
  document.removeEventListener('click', handleAnchorClick)
})
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
  @apply ml-1 flex flex-col justify-center;
}
.toc-item::after {
  content: '';
  @apply fixed left-0 h-full w-[1px] bg-white/10;
}

.toc-link {
  @apply flex items-center gap-2 w-full text-sm !px-2 !py-0.5;
}

.toc-title {
  @apply hover:opacity-80 active:opacity-60 active:scale-95;
  background-image: linear-gradient(to right, currentColor, currentColor);
  background-size: 0 2px;
  background-position: center 100%;
  background-repeat: no-repeat;
  transition: all 0.3s ease-in-out;
}

.toc-title:hover {
  background-size: 100% 2px !important;
}
</style>
