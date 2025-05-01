<template>
  <div class="content-base !p-0">
    <v-tabs
      v-model="activeTab"
      class="tabs-header"
      density="comfortable"
    >
      <v-tab 
        v-for="(tab, index) in tabs" 
        :key="index"
        :value="index"
      >
        <div class="flex items-center gap-2">
          <Icon v-if="tab.icon" :name="tab.icon" :size="18" />
          <span>{{ tab.label }}</span>
        </div>
      </v-tab>
    </v-tabs>

    <v-window v-model="activeTab" class="tabs-content">
      <v-window-item
        v-for="(tab, index) in tabs"
        :key="index"
        :value="index"
      >
        <div class="prose-content">
          <component :is="tab.content" />
        </div>
      </v-window-item>
    </v-window>
  </div>
</template>

<script setup lang="ts">
import './content.css'
import { ref, provide } from 'vue'

interface Tab {
  label: string
  icon?: string
  content?: unknown
}

const tabs = ref<Tab[]>([])
const activeTab = ref(0)

const registerTab = (tab: Tab) => {
  tabs.value.push(tab)
  return tabs.value.length - 1
}

provide('tabs-parent', { registerTab })
</script>

<style lang="postcss">
.tabs-header {
  @apply border-b-2 border-primary/40;

  .v-tab {
    @apply text-primary/80 font-medium;
    
    &--selected {
      @apply text-primary;
    }
  }

  .v-tabs__slider-wrapper {
    @apply hidden;
  }
}

.tabs-content {
  @apply p-4;
}

.v-window__container {
  @apply !h-auto;
}

.prose-content {
  @apply text-sm;

  :deep(pre) {
    @apply !m-0;
  }
}
</style> 