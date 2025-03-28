<script lang="ts" setup>
// 同层导入找不到，回一层就找到了
// ts-plugin, 你是否清醒？
import SocketConnectionState from '../partial/SocketConnectionState.vue';

</script>

<template>
  <v-app-bar :elevation="0" class="!border-b-[1px] !border-gray-600/60" height="54">
    <div class="app-bar">
      <v-btn :active="false" :exact="false" class="mr-0 !h-12" to="/" variant="text">
        <nuxt-img alt="site-icon" height="28" src="/site_icon.svg" width="28"/>
      </v-btn>

      <v-btn to="/">
        起点
      </v-btn>
      <v-btn to="/cards_wiki">
        卡牌
      </v-btn>
      <v-btn to="/make_cards">
        制作牌组
      </v-btn>

      <v-spacer/>

      <!-- websocket status here -->
      <SocketConnectionState/>
    </div>
  </v-app-bar>
</template>

<style lang="postcss" scoped>
.app-bar {
  @apply w-full h-full flex items-center px-4 md:px-8 lg:px-10 xl:px-16 gap-4;
}
</style>