import type {ChatMessage} from "../chat";

// Room Chat
export type RoomChatResponse = {
	success: boolean;
};

export type RoomChatRequest = {
	content: string;
};

export type RoomChatHistoryResponse = {
	messages: ChatMessage[];
};
  