import {socket} from "~/composables/useSocket";
import type {PingRequest, PingResponse} from "~/types/DTO/ping.dto";

const globalPingState = reactive({
	latency: -1,
	isStarted: false,
});

const pingInterval = ref<ReturnType<typeof setInterval> | null>(null);

const ping = () => {
	socket.emit("ping", {timestamp: Date.now()} as PingRequest);
}

socket.on("connect", () => {
	// pingInterval.value = setInterval(ping, 1000);
});

socket.on("disconnect", () => {
	if (pingInterval.value) {
		clearInterval(pingInterval.value);
	}
});

socket.on("pong", (data: PingResponse) => {
	globalPingState.latency = Date.now() - data.timestamp;
});

export const usePing = () => {
	if (typeof window === 'undefined') {
		return {
			latency: computed(() => 0),
			startPing: () => {
			},
			stopPing: () => {
			},
		};
	}

	const startPing = () => {
		// pingInterval.value = setInterval(ping, 1000);
		// globalPingState.isStarted = true;
	};

	const stopPing = () => {
		if (pingInterval.value) {
			clearInterval(pingInterval.value);
		}
		globalPingState.isStarted = false;
	};

	return {
		latency: computed(() => globalPingState.latency),
		startPing,
		stopPing,
	};
}; 
