<template>
  <div ref="container" class="pane-container" />
</template>

<script lang="ts" setup>
import { Pane } from 'tweakpane';

const { windowWidth, windowHeight, breakpoint } = useViewport();

const container = ref<HTMLElement | null>(null);
const pane = ref<Pane | null>(null);

onMounted(() => {
  if (!container.value) return;

  pane.value = new Pane({
    title: 'View',
    container: container.value,
  });

  pane.value.addBinding(windowWidth, 'value', {
    label: 'Window Width',
    format: (v) => v.toFixed(0),
    readonly: true,
  });

  pane.value.addBinding(windowHeight, 'value', {
    label: 'Window Height',
    format: (v) => v.toFixed(0),
    readonly: true,
  });

  pane.value.addBinding(breakpoint, 'value', {
    label: 'Breakpoint',
    readonly: true,
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