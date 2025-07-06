<template>
  <div ref="container" class="pane-container" />
</template>

<script lang="ts" setup>
import { Pane } from 'tweakpane';

const { user } = useUser();

const container = ref<HTMLElement | null>(null);
const pane = ref<Pane | null>(null);

onMounted(() => {
  if (!container.value) return;

  pane.value = new Pane({
    title: 'User',
    container: container.value,
  });

  const userInfo = computed(() => ({
    id: user.value.id,
    name: user.value.name,
  }));

  pane.value.addBinding(userInfo.value, 'id', {
    label: 'User ID',
    readonly: true,
  });

  pane.value.addBinding(userInfo.value, 'name', {
    label: 'Username',
    readonly: true,
  });
});

defineExpose({
  refresh: () => pane.value?.refresh(),
});
</script> 