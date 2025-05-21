<template>
  <div ref="container" class="pane-container" />
</template>

<script lang="ts" setup>
import { Pane } from 'tweakpane';

const latencyMax = 200;
const latencyMin = 0;

const { isConnected, transport } = useSocket();
const { latency } = usePing();

const container = ref<HTMLElement | null>(null);
const pane = ref<Pane | null>(null);
const { formattedLogs, clear } = useLogger('socket');

const logInfo = reactive({
  log: "",
});

onMounted(() => {
  if (!container.value) return;

  pane.value = new Pane({
    title: 'Socket',
    container: container.value,
  });

  pane.value.addBinding(isConnected, 'value', {
    label: 'Connected',
    readonly: true,
  });

  pane.value.addBinding(transport, 'value', {
    label: 'Transport',
    readonly: true,
  });

  pane.value.addBinding(latency, 'value', {
    label: 'Latency',
    readonly: true,
  });

  pane.value.addBinding(latency, 'value', {
    label: 'Latency',
    readonly: true,
    view: 'graph',
    min: latencyMin,
    max: latencyMax,
  });

  const logFolder = pane.value.addFolder({
    title: 'Logs',
  });

  logFolder.addBinding(logInfo, 'log', {
    label: undefined,
    multiline: true,
    rows: 5,
    readonly: true,
  });

  logFolder.addButton({
    title: 'Clear Logs',
  }).on('click', () => {
    clear();
    logInfo.log = formattedLogs.value;
  });

  // Watch for changes in formatted logs
  watch(formattedLogs, (newLogs) => {
    logInfo.log = newLogs;
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