<template>
  <div ref="container" class="pane-container" />
</template>

<script lang="ts" setup>
import { Pane } from 'tweakpane';

const latencyMax = 200;
const latencyMin = 0;

const { isConnected, transport } = useSocket();
const { latency } = usePing();

const container = ref<HTMLElement | null>(null);
const pane = ref<Pane | null>(null);
const { user } = useUser();
const { currentRoom } = useRoom();

const readOnlyRoomState = reactive({
  code: "None",
  owner: "None",
  members: 0,
});

onMounted(() => {
  if (!container.value) return;

  pane.value = new Pane({
    title: 'Socket',
    container: container.value,
  });

  pane.value.addBinding(isConnected, 'value', {
    label: 'Connected',
    readonly: true,
  });

  pane.value.addBinding(transport, 'value', {
    label: 'Transport',
    readonly: true,
  });

  pane.value.addBinding(latency, 'value', {
    label: 'Latency',
    readonly: true,
  });

  pane.value.addBinding(latency, 'value', {
    label: 'Latency',
    readonly: true,
    view: 'graph',
    rows: 2,
    min: latencyMin,
    max: latencyMax,
  });

  const userFolder = pane.value.addFolder({
    title: 'User',
  });

  const userInfo = computed(() => ({
    id: user.value.id,
    name: user.value.name,
  }));

  userFolder.addBinding(userInfo.value, 'id', {
    label: 'User ID',
    readonly: true,
  });

  userFolder.addBinding(userInfo.value, 'name', {
    label: 'Username',
    readonly: true,
  });

  const roomFolder = pane.value.addFolder({
    title: 'Room',
  });

  roomFolder.addBinding(readOnlyRoomState, 'code', {
    label: 'Room Code',
    readonly: true,
  });

  roomFolder.addBinding(readOnlyRoomState, 'owner', {
    label: 'Owner',
    readonly: true,
  });

  roomFolder.addBinding(readOnlyRoomState, 'members', {
    label: 'Players',
    readonly: true,
    format: (v) => v.toFixed(0),
  });
});

const refreshRoomState = () => {
  if (currentRoom.value && pane.value) {
    readOnlyRoomState.code = currentRoom.value.code;
    readOnlyRoomState.owner = currentRoom.value.owner;
    readOnlyRoomState.members = currentRoom.value.members.length;
  }
  pane.value?.refresh();
};

watch(() => currentRoom.value, () => {
  refreshRoomState();
});

defineExpose({
  refresh: () => pane.value?.refresh(),
  toggleCollapse: (isCollapsed: boolean) => {
    if (pane.value) {
      pane.value.expanded = !isCollapsed;
    }
  },
});
</script> 