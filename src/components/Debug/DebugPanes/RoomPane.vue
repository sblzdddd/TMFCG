<template>
  <div ref="container" class="pane-container" />
</template>

<script lang="ts" setup>
import { Pane } from 'tweakpane';

const { currentRoom } = useRoom();

const container = ref<HTMLElement | null>(null);
const pane = ref<Pane | null>(null);

const readOnlyRoomState = reactive({
  code: "None",
  owner: "None",
  members: 0,
});

onMounted(() => {
  if (!container.value) return;

  pane.value = new Pane({
    title: 'Room',
    container: container.value,
  });

  pane.value.addBinding(readOnlyRoomState, 'code', {
    label: 'Room Code',
    readonly: true,
  });

  pane.value.addBinding(readOnlyRoomState, 'owner', {
    label: 'Owner',
    readonly: true,
  });

  pane.value.addBinding(readOnlyRoomState, 'members', {
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
  refresh: () => {
    refreshRoomState();
  },
  toggleCollapse: (isCollapsed: boolean) => {
    if (pane.value) {
      pane.value.expanded = !isCollapsed;
    }
  },
});
</script> 