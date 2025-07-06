<template>
  <div class="w-screen h-screen">
    <Room-Gameplay-GameTableLayout/>
    <Room-Overlays-RoomOverlay/>
  </div>
</template>
<script lang="ts" setup>
import {LoadingState} from '@/utils/loading';
import type {RoomMember} from '@/types/user';
import type {RoomMembersUpdateResponse} from '@/types/DTO/room.dto';

definePageMeta({
  layout: 'fullscreen',
})

const route = useRoute()
const router = useRouter()
const roomCode = computed(() => String(route.params.code))
const {currentRoom, joinRoom, updateRoomMembers} = useRoom()
const {user} = useUser()
const {isConnected} = useSocket()

const updateMembers = (members: RoomMember[]) => {
  console.log('updateRoomMembers', members)
  user.value.isRoomOwner = members.find(m => m.id === user.value.id)?.isRoomOwner || false
  updateRoomMembers(members)
}

const {debug, info, error} = useLogger('room')

onMounted(async () => {
  LoadingState.isLoading = true;
  if (!isConnected.value) {
    info("socket not connected, waiting for connection")
    await waitForConnection()
  }
  if (user.value.currentRoomCode && currentRoom.value) {
    debug(`user.value.currentRoomCode: ${user.value.currentRoomCode}, roomCode.value: ${roomCode.value}`)
    if (user.value.currentRoomCode !== roomCode.value) {
      info("already in room, redirecting")
      await router.push(`/room/${user.value.currentRoomCode}`)
      return
    } else {
      info('already in room')
    }
  } else {
    info('not in any room')
    const response = await joinRoom(roomCode.value)
    if (!response.room) {
      error('room not found')
      alert('房间不存在或已关闭')
      await router.push('/')
      return
    }
  }
  if (!currentRoom.value) {
    error('room not found')
    alert('房间不存在或已关闭')
    await router.push('/')
    return
  }
  updateMembers(currentRoom.value.members)
  socket.on('user_joined', (message) => {
    const response = message as RoomMembersUpdateResponse
    console.log('user_joined', response)
    updateMembers(response.members)
  })
  socket.on('user_left', (message) => {
    const response = message as RoomMembersUpdateResponse
    console.log('user_left', response)
    updateMembers(response.members)
  })
  socket.on('room_member_update', (message) => {
    const response = message as RoomMembersUpdateResponse
    console.log('room_member_update', response)
    updateMembers(response.members)
  })
  console.log(111)
  LoadingState.isLoading = false;
})
</script>
<style lang="postcss">

</style>
