<script lang="ts" setup>
import { LoadingState } from '@/utils/loading';

definePageMeta({
  layout: 'in-game',
})

const route = useRoute()
const router = useRouter()
const roomCode = computed(() => String(route.params.code))

const {currentRoom, joinRoom, leaveRoom} = useRoom()
const {user} = useUser()
const {isConnected} = useSocket()

// Add these refs for sidebar visibility
const showSidebar = ref(true)

const toggleSidebar = () => {
  showSidebar.value = !showSidebar.value
}

const quitRoom = async () => {
  try {
    await waitForConnection()
    // Send leave room message to server
    await leaveRoom()
    // Then navigate to home
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

const updateRoomMembers = (members: RoomMember[]) => {
  user.value.isRoomOwner = members.find(m => m.id === user.value.id)?.isRoomOwner || false
}

onMounted(async () => {
  LoadingState.isLoading = true;
  if(!isConnected.value) {
    console.log("socket not connected, waiting for connection")
    await waitForConnection()
  }
  if(user.value.currentRoomCode && currentRoom.value) {
    if(user.value.currentRoomCode !== roomCode.value) {
      console.log(user.value.currentRoomCode, roomCode.value)
      console.log("already in room, redirecting")
      await router.push(`/room/${user.value.currentRoomCode}`)
      return
    } else {
      console.log('already in room')
    }
  } else {
    console.log('not in any room')
    const response = await joinRoom(roomCode.value)
    if (response.room) {
      updateRoomMembers(response.room.members)
    }
  }
  if(!currentRoom.value) {
    console.log('room not found')
    alert('房间不存在或已关闭')
    await router.push('/')
    return
  }
  updateRoomMembers(currentRoom.value.members)
  socket.on('user_joined', (message) => {
    const response = message as RoomMembersUpdateResponse
    updateRoomMembers(response.members)
  })
  socket.on('user_left', (message) => {
    const response = message as RoomMembersUpdateResponse
    updateRoomMembers(response.members)
  })
  socket.on('room_member_update', (message) => {
    const response = message as RoomMembersUpdateResponse
    updateRoomMembers(response.members)
  })
  LoadingState.isLoading = false;
})
</script>

<template>
  <div class="overlay-container">
    <div class="status-bar"
    :class="showSidebar?'xl:w-[28%] lg:w-[35%] md:w-[42%] sm:w-[50%]':'w-screen'">
      <v-tooltip :text="showSidebar ? '点击：关闭边栏' : '点击：打开边栏'" location="top">
        <template v-slot:activator="{ props }">
          <v-btn :title="showSidebar ? '点击：关闭边栏' : '点击：打开边栏'" 
                  :active="false" 
                  :exact="false" 
                  class="game-icon" 
                  variant="text" 
                  v-bind="props"
                  @click="toggleSidebar">
            <nuxt-img alt="site-icon" height="24" src="/site_icon.svg" width="24"/>
            <h1 class="text-xl font-bold ml-3">东方夜雀五札戏</h1>
          </v-btn>
        </template>
      </v-tooltip>
      <v-spacer />
      <Common-ConnectionStatus/>
      <v-tooltip text="点击：退出房间" location="top">
        <template v-slot:activator="{ props }">
          <v-btn title="点击：退出房间" :icon="true" variant="text" @click="quitRoom" color="error" size="small" v-bind="props">
            <Icon name="material-symbols:exit-to-app-rounded" size="22" />
          </v-btn>
        </template>
      </v-tooltip>
    </div>
    <!-- Left Overlay -->
    <div class="overlay left-overlay" :class="{ 'hidden-left': !showSidebar }">
      <!-- Game Title -->
      <div class="h-10">
      </div>

      <!-- Room URL Section -->
      <div class="overlay-card room-url-section">
        <h2 class="title-with-dots">邀请</h2>
        <div class="url-container">
          <v-text-field type="text" density="compact" variant="solo-filled" hide-details :value="'https://richup.io/room/' + roomCode" readonly />
          <v-tooltip text="点击：复制房间链接" location="top">
            <template v-slot:activator="{ props }">
              <v-btn class="!h-10" size="small" @click="copyRoomUrl" v-bind="props">
                <Icon name="material-symbols:content-copy-rounded" size="20" />
              </v-btn>
            </template>
          </v-tooltip>
        </div>
      </div>
      <div class="overlay-card room-settings-section grow">
        <h2 class="title-with-dots">设置</h2>
        <div class="room-settings-container">
        </div>
      </div>

    </div>

    <!-- Main Game Area -->
    <div class="game-area">
      <!-- ... existing game content ... -->
    </div>

    <!-- Right Overlay -->
    <div class="overlay right-overlay" :class="{ 'hidden-right': !showSidebar }">
      <!-- Members List -->
      <div class="overlay-card members-list">
        <Room-UserList/>
      </div>

      <!-- Room Chat Section -->
      <div class="overlay-card chat-section">
        <Room-Chat />
      </div>
    </div>
  </div>
</template>
<style scoped lang="postcss">
.overlay-container {
  @apply flex sm:flex-row flex-col;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  z-index: 100;
}

.status-bar {
  @apply fixed left-0 top-0 z-10 p-2 px-2.5 flex items-center;
}

.overlay {
  @apply bg-[#f8dcbc] shadow-xl relative;
  @apply xl:w-[28%] lg:w-[35%] md:w-[42%] sm:w-[50%] p-3 flex flex-col gap-3;
  transition: transform 0.2s ease-out;
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

.hidden-right {
  transform: translateX(100%);
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
  @apply mr-0 !h-12 px-2;
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
