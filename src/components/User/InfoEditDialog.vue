<script setup lang="ts">

const {user, updateUserName, updateUserAvatar, avatarUrl} = useUser()
const userName = ref('')

onMounted(async () => {
  if (!import.meta.client) return
  await waitForConnection();
  userName.value = user.value.name
})

watch(() => userName.value, (newValue) => {
  updateUserName(newValue);
})

watch(() => user.value.avatar, (newValue) => {
  updateUserAvatar(newValue);
})
</script>

<template>
  <v-dialog activator="parent" max-width="500">
    <template #default="{ isActive }">
      <v-card title="编辑用户信息">
        <v-card-text>
          <v-text-field
              :model-value="userName"
              hide-details
              density="comfortable"
              label="昵称"
              variant="outlined"
              @update:model-value="(newValue) => userName = newValue"
          >
            <template #prepend>
              <v-tooltip text="点击：更换头像" location="top">
                <template #activator="{ props }">
                  <v-btn variant="flat" v-bind="props" class="px-0 rounded-lg !border-2 !border-primary overflow-hidden !min-w-12 !min-h-12 !max-w-12 !max-h-12">
                    <img :src="avatarUrl" class="w-full h-full" alt="avatar">

                    <v-menu activator="parent" transition="scale-transition">
                      <v-card class="max-w-[440px] max-h-[46vh]">
                        <v-card-title>选择头像</v-card-title>
                        <v-card-text>
                          <div class="flex flex-wrap justify-start items-start">
                            <button
                                v-for="i in 94"
                                :key="i-1"
                                v-ripple
                                class="avatar-item rounded-lg"
                                :class="{'scale-105 shadow-md !border-[var(--v-theme-on-surface)]': user.avatar === i-1}"
                                @click="user.avatar = i-1">
                              <img :src="`/assets/images/avatars/${String(i-1).padStart(5, '0')}.png`" alt="avatar">
                            </button>
                          </div>
                        </v-card-text>
                      </v-card>
                    </v-menu>
                  </v-btn>
                </template>
              </v-tooltip>
            </template>
            <template #append-inner>
              <v-btn
                  icon
                  size="small"
                  title="随机昵称"
                  variant="text"
                  @click="userName = '哇多么好的机会啊' + Math.random().toString(36).substring(2, 8)">
                <Icon class="w-6 h-6" name="mingcute:random-line"/>
              </v-btn>
            </template>
          </v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-spacer/>
          <v-btn
              class="!m-3 mt-0"
              color="primary"
              variant="elevated"
              text="关闭"
              @click="isActive.value = false"
          />
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
<style scoped lang="postcss">
.avatar-item {
  @apply w-12 h-12 m-1 overflow-hidden cursor-pointer hover:scale-105 hover:shadow-md transition-all duration-200 ease-in-out hover:border-[var(--v-theme-on-surface)];
  border: 2px solid transparent;
}
</style>
