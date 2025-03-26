<script lang="ts" setup>
onMounted(() => {
    console.log('mounted');
});
// import { useSocketStatus } from '@/lib/socket';
// import { ref, onMounted } from 'vue';

// const socketStatus = useSocketStatus();
// const isMounted = ref(false);

// onMounted(() => {
//     isMounted.value = true;
// });
</script>

<template>
    <div class="flex items-center justify-center gap-2">
        <!-- <span class="text-sm text-gray-400">
            <template v-if="isMounted">
                {{ socketStatus.connected ? `${socketStatus.latency}ms` : 'offline' }}
            </template>
            <template v-else>
                connecting...
            </template>
        </span>
        <template v-if="isMounted">
            <v-badge
                v-if="socketStatus.connected"
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
        </template> -->
    </div>
</template>