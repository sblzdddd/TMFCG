<template>
  <div ref="container" class="pane-container" />
</template>

<script lang="ts" setup>
import { Pane } from 'tweakpane';
const { playerCards, cardPool } = useGameTable();

const container = ref<HTMLElement | null>(null);
const pane = ref<Pane | null>(null);

onMounted(() => {
  if (!container.value) return;

  pane.value = new Pane({
    title: 'Game',
    container: container.value,
  });

  const gameFolder = pane.value.addFolder({
    title: 'Game State',
  });

  const gameState = reactive({
    playerCardsLength: playerCards.value.length,
    cardPoolLength: cardPool.value.length,
  });

  gameFolder.addBinding(gameState, 'playerCardsLength', {
    label: 'Player Cards',
    readonly: true,
    format: (v) => v.toFixed(0),
  });

  gameFolder.addBinding(gameState, 'cardPoolLength', {
    label: 'Pool Cards',
    readonly: true,
    format: (v) => v.toFixed(0),
  });
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