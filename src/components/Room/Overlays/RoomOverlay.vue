<template>
  <div :class="{'pointer-events-none': !showSidebar}" class="overlay-container">
    <div
        :class="showSidebar?'xl:w-[28%] lg:w-[35%] md:w-[42%] sm:w-[50%]':'w-screen !pointer-events-auto'"
        class="status-bar"
    >
      <v-tooltip :text="showSidebar ? '点击：关闭边栏' : '点击：打开边栏'" location="top">
        <template #activator="{ props }">
          <v-btn
:active="false"
                :exact="false"
                :title="showSidebar ? '点击：关闭边栏' : '点击：打开边栏'"
                class="game-icon"
                v-bind="props"
                variant="text"
                @click="toggleSidebar">
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
    <div :class="{ 'hidden-left': !showSidebar }" class="overlay left-overlay">
      <!-- Game Title -->
      <div class="h-10" />

      <!-- Room URL Section -->
      <div class="overlay-card room-url-section">
        <h2 class="title-with-dots">邀请</h2>
        <div class="url-container">
          <v-text-field 
            :number="'https://richup.io/room/' + roomCode" 
            density="compact" 
            hide-details 
            readonly
            type="text" 
            variant="solo-filled"
          />
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
    <div class="game-area">
      <!-- ... existing game content ... -->
    </div>

    <!-- Right Overlay -->
    <div :class="{ 'hidden-right': !showSidebar }" class="overlay right-overlay">
      <!-- Members List -->
      <div class="overlay-card members-list">
        <Room-Overlays-Widgets-UserList/>
      </div>

      <!-- Room Chat Section -->
      <Room-Overlays-Widgets-Chat :is-overlay-opened="showSidebar"/>
    </div>
  </div>
</template>
<script setup lang="ts">

// Add these refs for sidebar visibility
const showSidebar = ref(false)
const {leaveRoom} = useRoom()
const {isConnected} = useSocket()

const route = useRoute()
const roomCode = computed(() => String(route.params.code))
const router = useRouter()

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
  navigator.clipboard.writeText(`https://richup.io/room/${roomCode.value}`)
      .then(() => {
        // Optional: Add a notification that URL was copied
      })
      .catch(err => {
        console.error('Failed to copy:', err)
      })
}

</script>
<style lang="postcss">
.room-settings-section .v-list-item__spacer {
  @apply !w-4;
}

.overlay-container {
  @apply flex sm:flex-row flex-col z-[1000] w-screen h-screen fixed left-0 top-0 bottom-0;
}

.status-bar {
  @apply fixed left-0 top-0 z-10 p-2 px-2.5 flex items-center;
}

.overlay {
  @apply bg-[#f8dcbc] shadow-xl relative;
  @apply xl:w-[28%] lg:w-[35%] md:w-[42%] sm:w-[50%] p-3 flex flex-col gap-3;
  transition: transform 0.3s cubic-bezier(0, 0.6, 0.4, 1);
}

.left-overlay {
  transform-origin: left;
}

.right-overlay {
  transform-origin: right;
}

.hidden-left {
  transform: translateX(-100%);
}

.overlay-card > * {
  transition: all 0.4s cubic-bezier(0.6, 0, 0.35, 1.05);
}

.hidden-left .overlay-card {
  background-color: transparent !important;
  transition: all 0s cubic-bezier(0.6, 0, 0.35, 1.05) 0s !important;
}

.hidden-left .overlay-card > *,
.hidden-right .overlay-card > * {
  transform: translateY(30px) !important;
  opacity: 0 !important;
  transition: all 0s cubic-bezier(0.6, 0, 0.35, 1.05) 0s !important;
}

.overlay:not(.hidden-left):not(.hidden-right) .overlay-card > *:nth-child(1) {
  transition-delay: 0ms !important;
}

.overlay:not(.hidden-left):not(.hidden-right) .overlay-card > *:nth-child(2) {
  transition-delay: 50ms !important;
}

.overlay:not(.hidden-left):not(.hidden-right) .overlay-card > *:nth-child(3) {
  transition-delay: 100ms !important;
}

.overlay:not(.hidden-left):not(.hidden-right) .overlay-card > *:nth-child(4) {
  transition-delay: 150ms !important;
}

.overlay:not(.hidden-left):not(.hidden-right) .overlay-card > *:nth-child(5) {
  transition-delay: 200ms !important;
}

.overlay:not(.hidden-left):not(.hidden-right) .overlay-card > *:nth-child(6) {
  transition-delay: 250ms !important;
}

.overlay:not(.hidden-left):not(.hidden-right) .overlay-card > *:nth-child(7) {
  transition-delay: 300ms !important;
}

.overlay:not(.hidden-left):not(.hidden-right) .overlay-card > *:nth-child(8) {
  transition-delay: 350ms !important;
}

.overlay:not(.hidden-left):not(.hidden-right) .overlay-card > *:nth-child(9) {
  transition-delay: 400ms !important;
}

.overlay:not(.hidden-left):not(.hidden-right) .overlay-card > *:nth-child(10) {
  transition-delay: 450ms !important;
}

.hidden-left .title-with-dots {
  &::before,
  &::after {
    @apply w-32 h-0 opacity-0;
    transition: all 0.5s cubic-bezier(0, 0.6, 0.35, 1.1) 0.2s;
  }
}

.hidden-right {
  transform: translateX(100%);
}

.hidden-right .overlay-card > * {
  transform: translateY(20px) !important;
  opacity: 0 !important;
  transition: all 0.3s cubic-bezier(0.8, 0, 0.35, 1.2);
}

.hidden-right .overlay-card > *:nth-child(1) {
  transition-delay: 0ms;
}

.hidden-right .overlay-card > *:nth-child(2) {
  transition-delay: 40ms;
}

.hidden-right .overlay-card > *:nth-child(3) {
  transition-delay: 80ms;
}

.hidden-right .overlay-card > *:nth-child(4) {
  transition-delay: 120ms;
}

.hidden-right .overlay-card > *:nth-child(5) {
  transition-delay: 160ms;
}

.hidden-right .overlay-card > *:nth-child(6) {
  transition-delay: 200ms;
}

.hidden-right .overlay-card > *:nth-child(7) {
  transition-delay: 240ms;
}

.hidden-right .overlay-card > *:nth-child(8) {
  transition-delay: 280ms;
}

.hidden-right .overlay-card > *:nth-child(9) {
  transition-delay: 320ms;
}

.hidden-right .overlay-card > *:nth-child(10) {
  transition-delay: 360ms;
}

.hidden-right .title-with-dots {
  &::before,
  &::after {
    @apply w-32 h-0 opacity-0;
    transition: all 0.5s cubic-bezier(0, 0.6, 0.35, 1.1) 0.2s;
  }
}

.game-area {
  @apply sm:grow;
}

.expanded-left {
  margin-left: 0;
}

.expanded-right {
  margin-right: 0;
}

.right-sidebar-toggle {
  position: absolute;
  left: -40px;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(248, 220, 188, 0.9);
  border-radius: 8px 0 0 8px;
  padding: 8px 4px;
}

.overlay-card {
  @apply bg-white/40 shadow-sm rounded-xl !p-5 gap-3 flex flex-col;
}

.game-title {
  @apply flex items-center justify-start;
}

.game-icon {
  @apply mr-0 !h-12 px-2 backdrop-blur-sm;
}

.room-url-section {
  padding: 1rem 0;
}

.url-container {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.chat-section {
  @apply grow flex flex-col gap-3;
  overflow: hidden;
}

</style>
