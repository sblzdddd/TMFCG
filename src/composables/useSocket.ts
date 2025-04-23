import {io} from "socket.io-client";
import {useRoom} from "./useRoom";
import {useUser} from "./useUser";

// Symbol for dependency injection
const SOCKET_STATE_SYMBOL = 'socketState';

const globalSocketState = reactive({
	connected: false,
	transport: "N/A",
});

// Generate a random UUID compatible with all browsers
const generateUUID = () => {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		const r = Math.random() * 16 | 0;
		const v = c === 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});
};

// Get stored token or generate a new one
const getOrCreateToken = () => {
	if (typeof window !== 'undefined') {
		let token = window.localStorage.getItem('socket_token');
		if (!token) {
			token = generateUUID();
			window.localStorage.setItem('socket_token', token);
		}
		return token;
	}
	return null;
};

// Initialize socket with auth token
export const socket = io({
	auth: {
		token: getOrCreateToken()
	}
});

socket.on("connect", async () => {
	try {
		globalSocketState.connected = true;
		globalSocketState.transport = socket.io.engine.transport.name;
		const {initializeUser} = useUser();
		await initializeUser();
		const {getCurrentRoom} = useRoom();
		await getCurrentRoom();
	} catch (error) {
		console.error('Failed to initialize connection:', error)
	}
});

socket.on("disconnect", () => {
	globalSocketState.connected = false;
});

socket.io.engine.on("upgrade", (rawTransport) => {
	globalSocketState.transport = rawTransport.name;
});

export const useSocket = () => {
	if (typeof window === 'undefined') {
		return {
			isConnected: computed(() => false),
			transport: computed(() => 'N/A'),
			socket: computed(() => null),
		};
	}

	provide(SOCKET_STATE_SYMBOL, globalSocketState);

	return {
		isConnected: computed(() => globalSocketState.connected),
		transport: computed(() => globalSocketState.transport),
		socket: computed(() => socket),
	};
};

export const waitForConnection = async () => {
	if (globalSocketState.connected) return;
	await new Promise((resolve) => {
		const unwatch = watch(() => globalSocketState.connected, (newStatus) => {
			if (newStatus) {
				unwatch()
				resolve(true)
			}
		})
	})
}
