<template>
  <div class="w-screen h-screen">
    <Room-Gameplay-GameTable/>
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
const {currentRoom, joinRoom} = useRoom()
const {user} = useUser()
const {isConnected} = useSocket()

const updateRoomMembers = (members: RoomMember[]) => {
  user.value.isRoomOwner = members.find(m => m.id === user.value.id)?.isRoomOwner || false
}

onMounted(async () => {
  LoadingState.isLoading = true;
  if (!isConnected.value) {
    console.log("socket not connected, waiting for connection")
    await waitForConnection()
  }
  if (user.value.currentRoomCode && currentRoom.value) {
    if (user.value.currentRoomCode !== roomCode.value) {
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
  if (!currentRoom.value) {
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
<style lang="postcss">

</style>
