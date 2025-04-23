<script lang="ts" setup>
import type {PublicRoomInfo} from '@/types/room';
import {LoadingState} from '@/utils/loading';

const router = useRouter()
const tab = ref(0);
const currentRoomCode = ref('');
const isCreatingRoom = ref(false);
const isPrivate = ref(false);
const showPanel = ref(1);
const titleRef = ref(null);
const {currentRoom, createRoom, listRooms} = useRoom()

const publicRooms = ref<PublicRoomInfo[]>([]);

const listPublicRooms = async () => {
  LoadingState.isLoading = true;
  const data = await listRooms();
  if (!data || !data.rooms) {
    return;
  }
  publicRooms.value = data.rooms;
  LoadingState.isLoading = false;
}

const createRoomCallback = async () => {
  isCreatingRoom.value = true;
  LoadingState.isLoading = true;
  if (!createRoom || !import.meta.client) return
  const data = await createRoom({isPrivate: isPrivate.value});
  if (!data || !data.room) {
    return;
  }
  isCreatingRoom.value = false;
  currentRoomCode.value = data.room.code;
  await router.push(`/room/${data.room.code}`);
}

onMounted(async () => {
  if (!import.meta.client) return
  LoadingState.isLoading = true;
  await waitForConnection();
  console.log(currentRoom.value)
  if (currentRoom.value) {
    await router.push(`/room/${currentRoom.value.code}`);
    return;
  }
  showPanel.value = 0;
  LoadingState.isLoading = false;
})

watch(() => tab.value, (newValue) => {
  // 刷新公开房间列表
  if (newValue === 2) {
    listPublicRooms();
  }
})

</script>

<template>
  <div class="page-root flex !flex-col gap-5 items-center justify-center pb-10">
    <h4 ref="titleRef" class="mb-4">东方夜雀五札戏</h4>
    <v-expansion-panels v-model="showPanel">
      <!--expansion animation-->
      <v-expansion-panel elevation="0">
        <v-expansion-panel-text class="expansion-panel-text">
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
                <v-btn
                    color="primary" density="compact" size="x-large" title="前往游戏设置" to="/settings"
                    variant="flat">
                  设置
                </v-btn>
                <v-btn
                    color="primary" density="compact" size="x-large" title="前往游戏设置"
                    variant="flat"
                    @click="LoadingState.isLoading = !LoadingState.isLoading">
                  按钮
                </v-btn>
              </div>
            </v-window-item>
            <v-window-item value="1">
              <div class="p-4 pt-0">
                <v-checkbox v-model="isPrivate" hide-details label="私密房间"/>
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
                <p class="w-full text-left text-2xl font-bold">公开房间列表</p>
                <p v-if="publicRooms.length === 0" class="w-full text-left text-sm text-gray-500 mt-2">暂无房间...</p>
                <v-list>
                  <v-list-item
                      v-for="room in publicRooms"
                      :key="room.code"
                      :number="room.code"
                      class="py-3"
                      @click="router.push(`/room/${room.code}`);"
                  >
                    <v-list-item-title>{{ room.code }}</v-list-item-title>

                    <v-list-item-subtitle class="mb-1 text-high-emphasis opacity-100">房主：{{
                        room.owner
                      }}
                    </v-list-item-subtitle>

                    <v-list-item-subtitle class="text-high-emphasis">人数：{{ room.memberCount }}</v-list-item-subtitle>

                    <template #append>
                      <v-list-item-action class="flex-column align-end">
                        <small class="mb-4 text-high-emphasis opacity-60">点击加入</small>

                        <v-spacer/>

                        <Icon class="w-6 h-6" name="material-symbols:arrow-right-alt-rounded"/>
                      </v-list-item-action>
                    </template>
                  </v-list-item>
                </v-list>
                <v-btn class="w-full" variant="text" @click="listPublicRooms">
                  刷新
                  <v-icon>mdi-refresh</v-icon>
                </v-btn>
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
<style lang="postcss" scoped>
h1 {
  @apply xl:text-[10vw] lg:text-[18vw] md:text-[20vw] text-[22vw]
}

h2 {
  @apply text-[8vw]
}

h3 {
  @apply text-[7vw]
}

h4 {
  @apply xl:text-[5vw] lg:text-[8vw] text-[10vw]
}

h5 {
  @apply text-[5vw]
}
</style>
<style lang="postcss">
/*noinspection ALL*/
.expansion-panel-text .v-expansion-panel-text__wrapper {
  @apply flex flex-col w-full items-center justify-center gap-5;
}
</style>

