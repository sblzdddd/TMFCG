<template>
  <div ref="container" class="pane-container" />
</template>

<script lang="ts" setup>
import { Pane } from 'tweakpane';

defineExpose({
  refresh: () => pane.value?.refresh(),
  toggleCollapse: (isCollapsed: boolean) => {
    if (pane.value) {
      pane.value.expanded = !isCollapsed;
    }
  },
});

const {
  deckCardsCount,
  requestDrawCard,
} = await useGameTable();

const container = ref<HTMLElement | null>(null);
const pane = ref<Pane | null>(null);

const numOfDrawCards = ref(1);
const drawTarget = ref(1);

onMounted(() => {
  if (!container.value) return;

  pane.value = new Pane({
    title: 'Deck',
    container: container.value,
  });

  const cardsInDeck = computed(() => {
    return deckCardsCount.value;
  });

  pane.value.addBinding(cardsInDeck, 'value', {
    label: 'Total Cards',
    readonly: true,
    format: (v) => v.toFixed(0),
  });

  const tab = pane.value.addTab({
    pages: [
      {title: 'Operations'},
      {title: 'Contents'},
    ],
  });
  const f1 = tab.pages[0].addFolder({
    title: 'Draw Card',
  });

  f1.addBinding(numOfDrawCards, 'value', {
    label: 'Count',
    step: 1,
    min: 1,
    max: 10,
  });

  f1.addBinding(drawTarget, 'value', {
    label: 'Target',
    step: 1,
    min: 0,
    max: 3,
  });

  f1.addButton({
    title: 'Draw Card',
  }).on('click', async () => {
    if (drawTarget.value === 0) {
      await requestDrawCard(numOfDrawCards.value);
    } else {
      // await requestDrawCard(drawTarget.value - 1, numOfDrawCards.value);
    }
  });

  f1.addButton({
    title: 'Draw Cards to All Players',
  }).on('click', async () => {
    await requestDrawCard(numOfDrawCards.value);
  });
});

</script> 