<template>
  <div class="debug-panel" :style="{ pointerEvents: isHidden ? 'none' : 'auto' }">
    <MainPane 
      ref="mainPaneRef"
      :on-toggle-panes="togglePanes"
      :on-refresh-all="refreshAll"
    />
    <SocketPane ref="socketPaneRef" />
    <CardPane ref="cardPaneRef" />
    <DeckPane ref="deckPaneRef" />
  </div>
</template>

<script lang="ts" setup>
import MainPane from './DebugPanes/MainPane.vue';
import SocketPane from './DebugPanes/SocketPane.vue';
import CardPane from './DebugPanes/CardPane.vue';
import DeckPane from './DebugPanes/DeckPane.vue';
interface PaneComponent {
  refresh: () => void;
}

const mainPaneRef = ref<InstanceType<typeof MainPane> & PaneComponent | null>(null);
const socketPaneRef = ref<InstanceType<typeof SocketPane> & PaneComponent | null>(null);
const cardPaneRef = ref<InstanceType<typeof CardPane> & PaneComponent | null>(null);
const deckPaneRef = ref<InstanceType<typeof DeckPane> & PaneComponent | null>(null);
const panes = [socketPaneRef, cardPaneRef, deckPaneRef];


const isHidden = ref(true);

const togglePanes = () => {
  if (isHidden.value) {
    showPanes();
  } else {
    hidePanes();
  }
};

const showPanes = () => {
  console.log("Show Panes")
  isHidden.value = false;
  document.querySelectorAll('.pane-container').forEach((pane) => {
    (pane as HTMLElement).style.display = "block";
  });
};

const hidePanes = () => {
  console.log("Hide Panes")
  isHidden.value = true;
  document.querySelectorAll('.pane-container').forEach((pane) => {
    (pane as HTMLElement).style.display = "none";
  });
};

const handleKeyPress = (e: KeyboardEvent) => {
  if (e.key.toLowerCase() === 'p') {
    togglePanes();
  }
};

const refreshAll = () => {
  panes.forEach((pane) => pane.value?.refresh());
};

onMounted(async () => {
  window.addEventListener('keydown', handleKeyPress);

  await nextTick();

  hidePanes();
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
