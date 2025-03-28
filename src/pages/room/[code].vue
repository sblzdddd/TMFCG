<script lang="ts" setup>
import {useRoute, useRouter} from 'vue-router'
import {useRoom} from '@/composables/useRoom'
import { socket, waitForConnection } from '@/composables/useSocket'
import { useUser } from '@/composables/useUser'
import { useSocket } from '@/composables/useSocket'

import type { RoomMembersUpdateResponse } from '@/types/DTO/room.dto'
import type { RoomMember } from '@/types/User'

definePageMeta({
  layout: 'in-game',
})

const route = useRoute()
const router = useRouter()
const roomCode = computed(() => route.params.code as string)
const isRoomOwner = ref(false)
const showUsernameDialog = ref(false)
const roomMembers = ref<RoomMember[]>([])

const {currentRoom, joinRoom, leaveRoom} = useRoom()
const {user} = useUser()
const {isConnected} = useSocket()

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

const setUsername = () => {
  if (!user.value.name.trim()) return
  showUsernameDialog.value = false
  joinRoom(roomCode.value)
}

onMounted(async () => {
  if(!isConnected.value) {
    console.log("socket not connected, waiting for connection")
    await waitForConnection()
  }
  if(user.value.currentRoomCode && currentRoom.value) {
    if(user.value.currentRoomCode !== roomCode.value) {
      console.log(user.value.currentRoomCode, roomCode.value)
      console.log("already in room, redirecting")
      router.push(`/room/${user.value.currentRoomCode}`)
      return
    } else {
      console.log('already in room')
      isRoomOwner.value = user.value.isRoomOwner || false
      roomMembers.value = currentRoom.value.members || []
    }
  } else {
    console.log('not in any room')
    const response = await joinRoom(roomCode.value)
    if (response.room) {
      isRoomOwner.value = response.room.owner === user.value.id || false
      roomMembers.value = response.room.members || []
    } else {
      alert(response.message || '无法加入房间')
      router.push('/')
    }
  }
  socket.on('user_joined', (message) => {
    const response = message as RoomMembersUpdateResponse
    roomMembers.value = response.members || []
    isRoomOwner.value = response.members.find(m => m.name === user.value.name)?.isRoomOwner || false
  })
  socket.on('user_left', (message) => {
    const response = message as RoomMembersUpdateResponse
    roomMembers.value = response.members || []
    isRoomOwner.value = response.members.find(m => m.name === user.value.name)?.isRoomOwner || false
  })
})
</script>

<template>
  <div class="page-root !flex-col gap-5 !items-center !justify-center pb-10">
    <!-- Username Dialog -->
    <v-dialog v-model="showUsernameDialog" persistent width="300">
      <v-card>
        <v-card-title>请输入用户名</v-card-title>
        <v-card-text>
          <v-text-field
              v-model="user.name"
              label="用户名"
              required
              @keyup.enter="setUsername"
          />
        </v-card-text>
        <v-card-actions>
          <v-btn :disabled="!user.name.trim()" color="primary" @click="setUsername">
            确定
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <div class="flex items-center justify-between w-full px-4 py-2 bg-primary">
      <h4 class="text-white">房间: {{ roomCode }}</h4>
      <div class="flex items-center gap-2">
        <span v-if="isRoomOwner" class="text-white text-sm">房主</span>
        <v-btn
            color="white"
            size="small"
            variant="text"
            @click="quitRoom"
        >
          退出房间
        </v-btn>
      </div>
    </div>

    <div class="flex-1 w-full p-4">
      <!-- Room members list -->
      <div class="mb-4">
        <h5 class="mb-2">房间成员:</h5>
        <ul class="list-none p-0">
          <li v-for="member in roomMembers" :key="member.name" class="flex items-center gap-2">
            {{ member.name }}
            <span v-if="member.isRoomOwner" class="text-xs text-primary">(房主)</span>
          </li>
        </ul>
      </div>

      <!-- Room content -->
      <p class="text-center">房间内容将在这里显示</p>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.page-root {
  min-height: 100vh;
}
</style>