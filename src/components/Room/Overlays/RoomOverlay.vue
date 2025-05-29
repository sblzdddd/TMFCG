
<script setup lang="ts">
const showSidebar = ref(false)
const {leaveRoom} = useRoom()
const {isConnected} = useSocket()

const router = useRouter()

const roomUrl = computed(() => window.location.href)

const settings = ref([
  {
    id: 1,
    title: '最大房间人数',
    description: '最多可多少玩家可以加入',
    options: [3, 4],
    value: 3
  },
  {
    id: 2,
    title: '房间密码',
    description: '设置房间密码',
    options: [],
    value: ''
  },
  {
    id: 3,
    title: '房间类型',
    description: '设置房间类型',
    options: [],
    value: ''
  },
  {
    id: 4,
    title: '房间模式',
    description: '设置房间模式',
    options: [],
    value: ''
  }
])

const toggleSidebar = () => {
  showSidebar.value = !showSidebar.value
}

const quitRoom = async () => {
  try {
    await isConnected
    await leaveRoom()
    router.push('/');
  } catch (error) {
    console.error('Failed to leave room:', error)
    alert('无法退出房间，请稍后再试。')
  }
};

const copyRoomUrl = () => {
  navigator.clipboard.writeText(roomUrl.value)
  .then(() => {
    // Optional: Add a notification that URL was copied
  })
  .catch(err => {
    console.error('Failed to copy:', err)
  })
}
</script>
<template>
  <div :class="{'pointer-events-none': !showSidebar}" class="overlay-container">
    <div :class="showSidebar? 'show-sidebar':'hidden-sidebar'" class="status-bar">
      <v-tooltip :text="showSidebar ? '点击：关闭边栏' : '点击：打开边栏'" location="top">
        <template #activator="{ props }">
          <v-btn
            :active="false"
            :exact="false"
            :title="showSidebar ? '点击：关闭边栏' : '点击：打开边栏'"
            class="game-icon"
            v-bind="props"
            variant="text"
            @click="toggleSidebar"
          >
            <nuxt-img alt="site-icon" height="24" src="/site_icon.svg" width="24"/>
            <h1 class="text-xl font-bold m-0 ml-3">东方夜雀五札戏</h1>
          </v-btn>
        </template>
      </v-tooltip>
      <v-spacer/>
      <Common-ConnectionStatus/>
      <v-tooltip location="top" text="点击：退出房间">
        <template #activator="{ props }">
          <v-btn
            :icon="true"
            color="error"
            size="small"
            title="点击：退出房间"
            v-bind="props"
            variant="text"
            @click="quitRoom"
          >
            <Icon name="material-symbols:exit-to-app-rounded" size="22"/>
          </v-btn>
        </template>
      </v-tooltip>
    </div>
    <!-- Left Overlay -->
    <div :class="{ 'hidden-left overlay-hidden': !showSidebar }" class="overlay left-overlay">
      <!-- Game Title -->
      <div class="h-10" />

      <!-- Room URL Section -->
      <div class="overlay-card room-url-section">
        <h2 class="title-with-dots">邀请</h2>
        <div class="url-container">
          <ClientOnly>
            <v-text-field 
              :value="roomUrl" 
              density="compact" 
              hide-details 
              readonly
              type="text" 
            variant="solo-filled"
            />
          </ClientOnly>
          <v-tooltip location="top" text="点击：复制房间链接">
            <template #activator="{ props }">
              <v-btn class="!h-10" size="small" v-bind="props" @click="copyRoomUrl">
                <Icon name="material-symbols:content-copy-rounded" size="20"/>
              </v-btn>
            </template>
          </v-tooltip>
        </div>
      </div>
      <div class="overlay-card room-settings-section grow">
        <h2 class="title-with-dots">设置</h2>
        <v-list-item v-for="setting in settings" :key="setting.id" class="px-0" prepend-icon="mdi-account-group">
          <div class="flex flex-row px-1 gap-2 items-center justify-between">
            <div class="flex flex-col">
              <h3 class="m-0 text-base">{{ setting.title }}</h3>
              <span class="text-sm text-gray-500">{{ setting.description }}</span>
            </div>
            <v-spacer/>
            <v-select
              :items="setting.options"
              :number="setting.value"
              density="compact"
              elevation="0"
              hide-details
              variant="solo-filled"
            />
          </div>
        </v-list-item>
      </div>
    </div>

    <!-- Main Game Area -->
    <div class="game-area" />

    <!-- Right Overlay -->
    <div :class="{ 'hidden-right overlay-hidden': !showSidebar }" class="overlay right-overlay">
      <!-- Members List -->
      <div class="overlay-card members-list">
        <Room-Overlays-Widgets-UserList/>
      </div>

      <!-- Room Chat Section -->
      <Room-Overlays-Widgets-Chat :is-overlay-opened="showSidebar"/>
    </div>
  </div>
</template>
<style lang="postcss">
.room-settings-section .v-list-item__spacer {
  @apply !w-4;
}

.overlay-container {
  @apply flex sm:flex-row flex-col z-[1000] w-screen h-screen fixed left-0 top-0 bottom-0;

  .status-bar {
    @apply fixed left-0 top-0 z-10 p-2 px-2.5 flex items-center;
    &.show-sidebar {
      @apply xl:w-[28%] lg:w-[35%] md:w-[42%] sm:w-[50%];
    }
    &.hidden-sidebar {
      @apply w-screen !pointer-events-auto;
    }
    .game-icon {
      @apply mr-0 !h-12 px-2 backdrop-blur-sm;
    }
  }
  .overlay {
    @apply bg-[#f8dcbc] shadow-xl relative;
    @apply xl:w-[28%] lg:w-[35%] md:w-[42%] sm:w-[50%] p-3 flex flex-col gap-3;
    transition: transform 0.3s cubic-bezier(0, 0.6, 0.4, 1);
    &.left-overlay {
      transform-origin: left;
    }
    &.right-overlay {
      transform-origin: right;
    }
    &.overlay-hidden {
      &.left-overlay{
        transform: translateX(-100%);
      }
      &.right-overlay{
        transform: translateX(100%);
      }
      .overlay-card {
        * {
          transform: translateY(30px) !important;
          opacity: 0 !important;
          transition-duration: 0s !important;
          transition-delay: 0s !important;
        }
        .title-with-dots {
          &::before,
          &::after {
            @apply w-32 h-0 opacity-0;
            transition: all 0.5s cubic-bezier(0, 0.6, 0.35, 1.1) 0.2s;
          }
        }
      }
    }
    .overlay-card {
      @apply bg-white/40 shadow-sm rounded-xl !p-5 gap-3 flex flex-col;

      > * {
        transition: all 0.4s cubic-bezier(0.6, 0, 0.35, 1.05);
      }
      > *:nth-child(1) {transition-delay: 0ms;}
      > *:nth-child(2) {transition-delay: 40ms;}
      > *:nth-child(3) {transition-delay: 80ms;}
      > *:nth-child(4) {transition-delay: 120ms;}
      > *:nth-child(5) {transition-delay: 160ms;}
      > *:nth-child(6) {transition-delay: 200ms;}
      > *:nth-child(7) {transition-delay: 240ms;}
      > *:nth-child(8) {transition-delay: 280ms;}
      > *:nth-child(9) {transition-delay: 320ms;}
      > *:nth-child(10) {transition-delay: 360ms;}
      &.room-url-section {
        padding: 1rem 0;
      }
      .url-container {
        display: flex;
        gap: 0.5rem;
        align-items: center;
      }
    }
  }
  .game-area {
    @apply sm:grow;
  }
}

</style>
