<template>
  <div ref="container" class="pane-container" />
</template>

<script lang="ts" setup>
import { Pane } from 'tweakpane';

const {
  deckCards,
  drawCard,
} = useGameTable();

const container = ref<HTMLElement | null>(null);
const pane = ref<Pane | null>(null);

const numOfDrawCards = ref(1);

onMounted(() => {
  if (!container.value) return;

  pane.value = new Pane({
    title: 'Deck',
    container: container.value,
  });

  const cardsInDeck = computed(() => {
    return deckCards.value.length;
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
    max: 7,
  });

  f1.addButton({
    title: 'Draw Card',
  }).on('click', async () => {
    await drawCard(numOfDrawCards.value);
  });

  watch(() => deckCards.value.length, () => {
    f1.refresh();
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