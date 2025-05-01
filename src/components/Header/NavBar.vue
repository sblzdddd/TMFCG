<script lang="ts" setup>
defineProps<{
  isWikiPage?: boolean,
  customContent?: boolean
}>()
</script>

<template>
  <v-app-bar :elevation="0" class="!border-b-[1px] !border-gray-600/60" height="54">
    <div v-if="!customContent" class="app-bar">
      <v-btn :active="false" :exact="false" size="small" icon class="rounded-lg mr-2" to="/" variant="text">
        <nuxt-img alt="site-icon" height="28" src="/site_icon.svg" width="28"/>
      </v-btn>

      <v-btn to="/">
        起点
      </v-btn>
      <v-btn to="/docs/getting-started">
        文档
      </v-btn>
      <v-btn to="/editor">
        编辑器
      </v-btn>

      <v-spacer/>

      <!-- websocket status here -->
      <div v-if="!isWikiPage" class="right-content">
        <Common-ConnectionStatus/>
        <User-State/>
      </div>
      <div v-else class="right-content !gap-0">
        <v-btn size="small" icon class="rounded-lg">
          <Icon name="mdi:search" :size="24" />
        </v-btn>
        <v-btn size="small" icon class="rounded-lg">
          <Icon name="mdi:github" :size="24" />
        </v-btn>
      </div>
    </div>
    <div v-else class="app-bar">
      <slot />
    </div>
  </v-app-bar>
</template>

<style lang="postcss" scoped>
.app-bar {
  @apply w-full h-full flex items-center px-4 md:px-8 lg:px-10 xl:px-16 gap-2;
}

.right-content {
  @apply flex items-center gap-4;
}
</style>