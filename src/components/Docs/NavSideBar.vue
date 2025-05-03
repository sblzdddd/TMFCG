<template>
  <nav>
    <ul class="nav-list">
      <li v-for="group in navigation" :key="group.path" class="nav-group">
        <div v-ripple class="nav-group-header" @click="toggleGroup(group)">
          <span class="nav-group-title jiangxizhuokai">{{ group.title }}</span>
          <Icon class="nav-group-icon" :class="{ 'is-open': !group.isCollapsed }" name="mdi:chevron-down" :size="20" />
        </div>
        <ul :id="`nav-children-${group.path.replace('/', '')}`" class="nav-children overflow-hidden">
          <li v-for="item in group.children" :key="item.path" class="nav-item">
            <NuxtLink v-ripple :to="`/docs${item.path}`" class="nav-link" :class="{ 'active': route.path === `/docs${item.path}` }">
              <Icon v-if="item.icon" :name="item.icon" :size="20" />
              <span>{{ item.title }}</span>
            </NuxtLink>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { animate } from 'animejs';

const route = useRoute();

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
    const el = document.getElementById(`nav-children-${group.path.replace('/', '')}`);
    if (el) {
      const height = el.scrollHeight;
      animate(`#nav-children-${group.path.replace('/', '')}`, {
        height: `${height}px`,
        opacity: 1,
        duration: 200,
      });
    }
  } else {
    const el = document.getElementById(`nav-children-${group.path.replace('/', '')}`);
    if (el) {
      const height = el.scrollHeight;
      el.style.height = `${height}px`;
      nextTick(() => {
        animate(`#nav-children-${group.path.replace('/', '')}`, {
          height: 0,
          opacity: 0,
          duration: 200,
        });
      })
    }
  }
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
  @apply ml-1 rounded-lg flex items-center !relative;
}
.nav-link {
  @apply flex items-center gap-2 w-full px-2 py-1 text-sm hover:bg-black/10 rounded-[5px];
  transition: all 0.2s ease-in-out;
  &::after {
    @apply content-[''] absolute left-[-4px] top-[10%] h-[80%] w-[1px] bg-transparent;
    transition: all 0.2s ease-in-out;
  }
  &.active {
    @apply font-bold text-[#79500d];
    &::after {
      @apply bg-[#79500d];
    }
  }
}
</style>
