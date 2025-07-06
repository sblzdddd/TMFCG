<template>
  <div ref="container" class="pane-container" />
</template>

<script lang="ts" setup>
import { Pane } from 'tweakpane';

const { currentProfile } = useCardProfile();

const container = ref<HTMLElement | null>(null);
const pane = ref<Pane | null>(null);

const cardProfileInfo = reactive({
  name: "None",
  cardsLength: 0,
});

onMounted(() => {
  if (!container.value) return;

  pane.value = new Pane({
    title: 'Card Profile',
    container: container.value,
  });

  if (currentProfile.value) {


    pane.value.addBinding(cardProfileInfo, 'name', {
      label: 'Profile Name',
      readonly: true,
    });

    pane.value.addBinding(cardProfileInfo, 'cardsLength', {
      label: 'Total Cards',
      format: (v) => v.toFixed(0),
      readonly: true,
    });
  }
});

watch(() => currentProfile.value, () => {
  cardProfileInfo.name = currentProfile.value.name;
  cardProfileInfo.cardsLength = currentProfile.value.cards.length;
  pane.value?.refresh();
});

defineExpose({
  refresh: () => pane.value?.refresh(),
});
</script> 