<template>
  <div ref="container" class="pane-container" />
</template>

<script lang="ts" setup>
import { Pane } from 'tweakpane';

const container = ref<HTMLElement | null>(null);
const pane = ref<Pane | null>(null);

onMounted(() => {
  if (!container.value) return;

  pane.value = new Pane({
    title: 'Animation',
    container: container.value,
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