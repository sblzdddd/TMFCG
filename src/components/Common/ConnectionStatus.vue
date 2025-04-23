<script lang="ts" setup>

const {isConnected} = useSocket();
const {latency, startPing, stopPing} = usePing();
const isMounted = ref(false);

onMounted(() => {
  isMounted.value = true;
  waitForConnection();
  startPing();
});

onUnmounted(() => {
  stopPing();
});
</script>

<template>
  <div class="flex items-center justify-center gap-2">
        <span class="text-sm text-black/50">
            <template v-if="isMounted">
                {{ isConnected ? `${latency}ms` : 'offline' }}
            </template>
            <template v-else>
                connecting...
            </template>
        </span>
    <template v-if="isMounted">
      <v-badge
          v-if="isConnected"
          class="mb-0.5"
          color="success"
          dot
          inline/>
      <v-badge
          v-else
          class="mb-0.5"
          color="error"
          dot
          inline/>
    </template>
  </div>
</template>