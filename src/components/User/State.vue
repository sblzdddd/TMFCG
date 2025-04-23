<script lang="ts" setup>

const {user, avatarUrl} = useUser()

onMounted(async () => {
  if (!import.meta.client) return
  await waitForConnection();
})

watch(() => user.value.avatar, (newValue) => {
  console.log('Avatar changed to:', newValue)
})
</script>

<template>
  <v-tooltip location="bottom" text="点击：编辑用户信息">
    <template #activator="{ props }">
      <v-btn
          class="px-1"
          v-bind="props"
          variant="text"
      >
        <ClientOnly>
          <div class="rounded-lg w-8 h-8 border-[1.5px] border-primary overflow-hidden">
            <img :src="avatarUrl" alt="avatar">
          </div>
        </ClientOnly>
        <div class="flex flex-col max-w-[150px] truncate justify-start items-start">
          <span class="ml-2 mb-0.5">{{ user.name }}</span>
          <span class="text-[0.45rem] text-gray-500 ml-2 mb-0.5 truncate">{{ user.id }}</span>
        </div>
        <User-InfoEditDialog/>
      </v-btn>
    </template>
  </v-tooltip>
</template>