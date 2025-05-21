<template>
  <div ref="container" class="pane-container" />
</template>

<script lang="ts" setup>
import { Pane } from 'tweakpane';
import { VERSION } from '@/constants/version';
import { useLogger } from '@/composables/useLogger';

const props = defineProps<{
  onTogglePanes: () => void;
  onToggleCollapse: () => void;
  onRefreshAll: () => void;
}>();

const container = ref<HTMLElement | null>(null);
const pane = ref<Pane | null>(null);
const { debug, info } = useLogger('debug-pane');


onMounted(() => {
  if (!container.value) return;

  pane.value = new Pane({
    title: 'De莉格露',
    container: container.value,
  });

  const mainPaneInfo = reactive({
    version: VERSION,
  });

  pane.value.addBinding(mainPaneInfo, 'version', {
    label: 'Version',
    readonly: true,
  });

  pane.value.addButton({
    title: 'Hide Panes',
  }).on('click', () => {
    debug('Hiding all panes');
    props.onTogglePanes();
  });

  pane.value.addButton({
    title: 'Toggle Collapse',
  }).on('click', () => {
    info('Toggling collapse state');
    props.onToggleCollapse();
  });

  pane.value.addButton({
    title: 'Refresh All',
  }).on('click', () => {
    info('Refreshing all panes');
    props.onRefreshAll();
  });
});

defineExpose({
  refresh: () => pane.value?.refresh(),
});
</script>

<style lang="postcss" scoped>
:deep(.tp-dfwv) {
  .tp-dfwv[data-title="Logs"] {
    .tp-dfwv {
      background: rgba(0, 0, 0, 0.1);
      border-radius: 4px;
      padding: 8px;
      font-family: monospace;
      white-space: pre-wrap;
      max-height: 200px;
      overflow-y: auto;
    }
  }
}
</style> 