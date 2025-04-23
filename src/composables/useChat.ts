import {socket, useSocket, waitForConnection} from "~/composables/useSocket";
import type {ChatMessage} from "~/types/chat";
import type {RoomChatHistoryResponse} from "~/types/DTO/chat.dto";

// Symbol for dependency injection
const CHAT_STATE_SYMBOL = 'chatState';

const globalChatState = reactive<{
	messages: ChatMessage[];
}>({
	messages: []
});

export const useChat = () => {
	if (typeof window === 'undefined') {
		return {
			messages: computed(() => []),
			sendChat: () => {
			},
			getChatHistory: () => {
			},
		};
	}

	provide(CHAT_STATE_SYMBOL, globalChatState);

	const sendChat = async (message: string) => {
		if (!useSocket().isConnected) {
			await waitForConnection()
		}
		socket.emit('sendChat', {content: message});
	};

	const getChatHistory = async () => {

		if (!useSocket().isConnected) {
			await waitForConnection()
		}

		socket.on('onRoomChat', (data) => {
			globalChatState.messages = data.messages;
		})

		return new Promise((resolve, reject) => {
			setTimeout(() => {
				socket.off('roomChats');
				reject(new Error('Join room timeout'));
			}, 10000);
			socket.once('roomChats', (data) => {
				const response = data as RoomChatHistoryResponse
				globalChatState.messages = response.messages;
				resolve(data);
			});

			socket.emit('getChats');
		});
	}

	return {
		messages: computed(() => globalChatState.messages),
		sendChat,
		getChatHistory,
	};
}; 
