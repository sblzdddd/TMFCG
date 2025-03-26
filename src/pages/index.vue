<script lang="ts" setup>
// import {useRoom} from '@/composables/useRoom';
// import {useGsap} from '#gsap'
// import {waitForConnection} from '@/lib/socket';
import {useRouter} from 'vue-router'

const router = useRouter()
const tab = ref(0);
const currentRoomCode = ref('');
const isCreatingRoom = ref(false);
const showPanel = ref(0);
const titleRef = ref(null);
// const {user, updateUserName} = useUser()
// const {currentRoom, createRoom} = useRoom()

onMounted(async () => {
  if (!import.meta.client) return
  // await waitForConnection();
  // console.log(currentRoom.value)
  // console.log(user.value)
  // if (currentRoom.value) {
  //   router.push(`/room/${currentRoom.value.code}`);
  //   return;
  // }
  // showPanel.value = 0;
  // useGsap.to(titleRef.value, {
  //   scale: 1,
  //   duration: 0.25,
  // });
})

const createRoomCallback = async () => {
  // if (!createRoom || !import.meta.client) return
  // isCreatingRoom.value = true;
  // const data = await createRoom();
  // isCreatingRoom.value = false;
  // if (!data || !data.room) {
  //   return;
  // }
  // currentRoomCode.value = data.room.code;
  // await router.push(`/room/${data.room.code}`);
}

// watch(() => user.value.name, (newValue) => {
//   updateUserName(newValue);
// })

</script>

<template>
  <div class="page-root flex !flex-col gap-5 items-center justify-center pb-10">
    <h4 ref="titleRef" class="mb-4 scale-125">东方夜雀五札戏</h4>
    <v-expansion-panels v-model="showPanel">
      <!--expansion animation-->
      <v-expansion-panel elevation="0">
        <v-expansion-panel-text class="expansion-panel-text">
          <!-- <div class="xl:w-[38%] lg:w-[48%] w-[90%] px-4">
            <v-text-field
                :model-value="user.name"
                hide-details
                density="comfortable"
                label="昵称"
                variant="outlined"
                @update:model-value="(newValue) => user.name = newValue"
            >
              <template #append-inner>
                <v-btn icon size="small" title="随机昵称" variant="text"
                       @click="user.name = '哇多么好的机会啊' + Math.random().toString(36).substring(2, 8)">
                  <Icon class="w-6 h-6" name="mingcute:random-line"/>
                </v-btn>
              </template>
            </v-text-field>
          </div> -->
          <v-window v-model="tab" class="xl:w-[38%] lg:w-[48%] w-[90%]">
            <v-window-item class="w-full" value="0">
              <div class="flex flex-col flex-wrap items-stretch w-full gap-2 p-4 pt-0">
                <v-btn color="primary" density="default" size="x-large" title="快速加入随机房间" variant="flat">快速加入
                </v-btn>
                <div class="flex flex-col lg:flex-row flex-wrap items-stretch w-full gap-2">
                  <v-btn
                      class="grow" color="primary" density="compact" size="x-large" title="查看公开房间" variant="flat"
                      @click="tab = 2">房间列表
                  </v-btn>
                  <v-btn
                      class="grow" color="primary" density="compact" size="x-large" title="创建一个房间" variant="flat"
                      @click="tab = 1">创建房间
                  </v-btn>
                </div>
                <v-btn color="primary" density="compact" size="x-large" title="前往游戏设置" to="/settings"
                       variant="flat">
                  设置
                </v-btn>
              </div>
            </v-window-item>
            <v-window-item value="1">
              <div class="p-4 pt-0">
                <v-btn
                    :disabled="isCreatingRoom || currentRoomCode !== ''"
                    :loading="isCreatingRoom"
                    class="w-full mb-3"
                    color="primary"
                    size="x-large"
                    variant="flat"
                    @click="createRoomCallback"
                >
                  {{ currentRoomCode ? `房间代码: ${currentRoomCode}` : '创建房间' }}
                </v-btn>
                <v-btn class="w-full" variant="text" @click="tab = 0">
                  <v-icon>mdi-arrow-left</v-icon>
                  返回
                </v-btn>
              </div>
            </v-window-item>
            <v-window-item value="2">
              <div class="p-4 pt-0">
                <p class="w-full text-center text-2xl font-bold">房间列表</p>
                <v-list>
                  <v-list-item>
                    <v-list-item-title>房间1</v-list-item-title>
                  </v-list-item>
                </v-list>
                <v-btn class="w-full" variant="text" @click="tab = 0">
                  返回
                  <v-icon>mdi-arrow-right</v-icon>
                </v-btn>
              </div>
            </v-window-item>
          </v-window>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>
<style lang="postcss">
.expansion-panel-text .v-expansion-panel-text__wrapper {
  @apply flex flex-col w-full items-center justify-center gap-5;
}
</style>

