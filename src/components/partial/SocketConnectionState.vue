<script lang="ts" setup>
import { useSocket, waitForConnection } from '@/composables/useSocket';
import { usePing } from '@/composables/usePing';
import { ref, onMounted, onUnmounted } from 'vue';

const { isConnected } = useSocket();
const { latency, startPing, stopPing } = usePing();
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
        <span class="text-sm text-gray-400">
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
                inline
                dot />
            <v-badge
                v-else
                class="mb-0.5"
                color="error"
                inline
                dot />
        </template>
    </div>
</template>