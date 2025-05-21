<template>
  <div class="debug-panel" :style="{ pointerEvents: isHidden ? 'none' : 'auto' }">
    <MainPane 
      ref="mainPaneRef"
      :on-toggle-panes="togglePanes"
      :on-toggle-collapse="toggleCollapse"
      :on-refresh-all="refreshAll"
    />
    <ViewPane ref="viewPaneRef"/>
    <SocketPane ref="socketPaneRef" />
    <UserPane ref="userPaneRef" />
    <RoomPane ref="roomPaneRef" />
    <CardPane ref="cardPaneRef" />
    <GamePane ref="gamePaneRef" />
    <DeckPane ref="deckPaneRef" />
    <AnimPane ref="animPaneRef" />
  </div>
</template>

<script lang="ts" setup>
import { createTimeline } from 'animejs';
import MainPane from './DebugPanes/MainPane.vue';
import ViewPane from './DebugPanes/ViewPane.vue';
import SocketPane from './DebugPanes/SocketPane.vue';
import UserPane from './DebugPanes/UserPane.vue';
import RoomPane from './DebugPanes/RoomPane.vue';
import CardPane from './DebugPanes/CardPane.vue';
import GamePane from './DebugPanes/GamePane.vue';
import DeckPane from './DebugPanes/DeckPane.vue';
import AnimPane from './DebugPanes/AnimPane.vue';
interface PaneComponent {
  refresh: () => void;
}

const mainPaneRef = ref<InstanceType<typeof MainPane> & PaneComponent | null>(null);
const viewPaneRef = ref<InstanceType<typeof ViewPane> & PaneComponent | null>(null);
const socketPaneRef = ref<InstanceType<typeof SocketPane> & PaneComponent | null>(null);
const userPaneRef = ref<InstanceType<typeof UserPane> & PaneComponent | null>(null);
const roomPaneRef = ref<InstanceType<typeof RoomPane> & PaneComponent | null>(null);
const cardPaneRef = ref<InstanceType<typeof CardPane> & PaneComponent | null>(null);
const gamePaneRef = ref<InstanceType<typeof GamePane> & PaneComponent | null>(null);
const deckPaneRef = ref<InstanceType<typeof DeckPane> & PaneComponent | null>(null);
const animPaneRef = ref<InstanceType<typeof AnimPane> & PaneComponent | null>(null);
const panes = [viewPaneRef, socketPaneRef, userPaneRef, roomPaneRef, cardPaneRef, gamePaneRef, deckPaneRef, animPaneRef];


const isHidden = ref(true);
const isCollapsed = ref(false);

const togglePanes = () => {
  if (isHidden.value) {
    showPanes();
  } else {
    hidePanes();
  }
};

const showPanes = () => {
  isHidden.value = false;
  const timeline = createTimeline();
  if(isCollapsed.value) toggleCollapse();
  document.querySelectorAll('.pane-container').forEach((pane) => {
    timeline.add(pane, { x: 0, y: 0, opacity: 1, duration: 350, ease: "outExpo" }, 0);
  });
};

const hidePanes = () => {
  isHidden.value = true;
  const timeline = createTimeline();
  document.querySelectorAll('.pane-container').forEach((pane) => {
    const targetPos = getRandomBorderPosition(pane as HTMLElement);
    timeline.add(pane, {x: targetPos.x, y: targetPos.y, duration: 350, ease: "outExpo"}, 0);
  });
};

const handleKeyPress = (e: KeyboardEvent) => {
  if (e.key.toLowerCase() === 'p') {
    togglePanes();
  }
};

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value;
  panes.forEach((pane) => pane.value?.toggleCollapse(isCollapsed.value));
};

const refreshAll = () => {
  panes.forEach((pane) => pane.value?.refresh());
};

onMounted(async () => {
  window.addEventListener('keydown', handleKeyPress);

  await nextTick();

  const timeline = createTimeline();
  document.querySelectorAll('.pane-container').forEach((pane) => {
    const targetPos = getRandomBorderPosition(pane as HTMLElement);
    timeline.add(pane, {x: targetPos.x, y: targetPos.y, duration: 0}, 0);
  });
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyPress);
});
</script>

<style lang="postcss" scoped>
.debug-panel {
  @apply fixed top-0 left-0 m-2 flex flex-col flex-wrap gap-2 z-[99999] h-[100vh];
}
</style>
<style lang="postcss">

.pane-container {
  @apply min-w-[120px] w-auto;
}

:deep(.tp-dfwv) {
  @apply !z-[99999];
}
.tp-mllv_i {
  @apply !text-[10px] !font-sans;
  line-height: 1.4 !important;
}
</style>
