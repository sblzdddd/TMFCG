<template>
  <nav>
    <ul class="nav-list">
      <li v-for="group in navigation" :key="group.path" class="nav-group">
        <div v-ripple class="nav-group-header" @click="toggleGroup(group)">
          <span class="nav-group-title">{{ group.title }}</span>
          <Icon class="nav-group-icon" :class="{ 'is-open': !group.isCollapsed }" name="mdi:chevron-down" :size="20" />
        </div>
        <ul :id="`nav-children-${group.path}`" class="nav-children overflow-hidden" style="height: auto; opacity: 1;">
          <li v-for="item in group.children" :key="item.path" class="nav-item">
            <NuxtLink v-ripple :to="`/docs${item.path}`" class="nav-link">
              <Icon v-if="item.icon" :name="item.icon" :size="20" />
              {{ item.title }}
            </NuxtLink>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { animate } from 'animejs';
interface ContentNavigationItem {
    title: string;
    path: string;
    stem?: string;
    children?: ContentNavigationItem[];
    page?: false;
    [key: string]: unknown;
}

defineProps<{
  navigation: ContentNavigationItem[]
}>()

const toggleGroup = (group: ContentNavigationItem) => {
  group.isCollapsed = !group.isCollapsed;
  if (!group.isCollapsed) {
    const el = document.getElementById(`nav-children-${group.path}`);
    if (el) {
      enter(el);
    }
  } else {
    const el = document.getElementById(`nav-children-${group.path}`);
    if (el) {
      leave(el);
    }
  }
};

const enter = (el: Element) => {
  const height = (el as HTMLElement).scrollHeight;
  animate(el, {
    height: `${height}px`,
    opacity: 1,
    duration: 200,
  });
};
const leave = (el: Element) => {
  const height = (el as HTMLElement).scrollHeight;
  (el as HTMLElement).style.height = `${height}px`;
  animate(el, {
    height: 0,
    opacity: 0,
    duration: 200,
  });
};

</script>
<style lang="postcss">
.nav-list {
    @apply space-y-1;
}
.nav-group {
  @apply rounded-lg;
}
.nav-group-header {
  @apply flex items-center justify-between p-1.5 px-3 cursor-pointer hover:bg-black/10 !rounded-[5px] overflow-hidden;
  transition: all 0.1s ease-in-out;
}
.nav-group-title {
  @apply font-medium;
}
.nav-group-icon {
  @apply text-xs transition-transform duration-200 ease-in-out;
}
.nav-group-icon.is-open {
  @apply transform rotate-180;
}
.nav-children {
  @apply ml-5 border-l-[1px] border-black/10;
  transform-origin: top;
  will-change: height, opacity, transform;
}
.nav-item {
  @apply ml-1 rounded-lg flex items-center;
}
.nav-item::after {
  content: '';
  @apply fixed left-0 h-full w-[1px] bg-white/10;
}
.nav-link {
  @apply block flex items-center gap-2 w-full px-2 py-1 text-sm hover:bg-black/10 rounded-[5px];
  transition: all 0.1s ease-in-out;
}
</style>
