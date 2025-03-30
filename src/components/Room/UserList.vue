<template>
  <h2 class="title-with-dots">成员</h2>
  <ul>
    <v-list-item v-if="currentRoom?.members.find(m => m.id === user.id)" class="member-item" rounded="lg" variant="tonal">
      <template #prepend>
        <v-avatar :image="avatarUrl" rounded="lg" border="md" color="primary" size="36"/>
      </template>
      <v-list-item-title>{{ user.name }}</v-list-item-title>
      <v-list-item-subtitle v-if="user.isRoomOwner" class="owner-badge">(房主)</v-list-item-subtitle>
      <template #append>
        <v-tooltip text="点击：更改信息" location="left">
          <template #activator="{ props }">
            <v-btn icon variant="text" size="small" v-bind="props">
              <Icon name="material-symbols:edit-outline-rounded" size="20"/>
              <User-InfoEditDialog/>
            </v-btn>
          </template>
        </v-tooltip>
      </template>
    </v-list-item>

    <v-list-item v-for="(member, index) in roomMembers" :key="index" class="member-item" rounded="lg">
      <template #prepend>
        <v-avatar :image="getMemberAvatarUrl(member.avatar)" rounded="lg" border="md" color="primary" size="36"/>
      </template>
      <v-list-item-title>{{ member.name }}</v-list-item-title>
      <v-list-item-subtitle v-if="member.isRoomOwner" class="owner-badge">(房主)</v-list-item-subtitle>
      <template #append>
        <v-tooltip v-if="user.isRoomOwner && member.id !== user.id" text="点击：踢出成员" location="left">
          <template #activator="{ props }">
            <v-btn icon variant="text" color="error" size="small" v-bind="props">
              <Icon name="material-symbols:exit-to-app-rounded" size="20"/>
            </v-btn>
          </template>
        </v-tooltip>
      </template>
    </v-list-item>
  </ul>
</template>
<script setup lang="ts">

const {user, avatarUrl} = useUser()
const {currentRoom} = useRoom()

const roomMembers = computed(() => {
  return currentRoom.value?.members.filter(m => m.id !== user.value.id) || []
})
</script>
<style scoped lang="postcss">
.members-list {
  h5 {
    margin-bottom: 1rem;
  }

  ul {
    list-style: none;
    padding: 0;
  }
}
.member-item {
  @apply px-3 py-2;
}
.owner-badge {
  @apply !text-orange-500;
}
</style>