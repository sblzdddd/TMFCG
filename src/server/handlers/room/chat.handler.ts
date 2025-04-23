import {BaseHandler} from "../base/base.handler";
import {RoomManager, UserManager} from "~/server/managers";
import type {RoomChatHistoryResponse, RoomChatRequest} from "@/types/DTO/chat.dto";
import type {ChatMessage} from "@/types/chat";

export class ChatHandler extends BaseHandler {
	public initialize() {
		this.on("sendChat", (data: RoomChatRequest) => this.handleRoomChat(data));
	}

	private handleRoomChat(data: RoomChatRequest) {
		const user = UserManager.getUser(this.socket);
		if (!user) {
			throw new Error('User not found');
		}
		const room = RoomManager.getRoom(user.currentRoomCode);
		if (!room) {
			throw new Error('Room not found');
		}

		const message = {
			sender: user,
			message: data.content,
			timestamp: Date.now()
		} as ChatMessage;

		const messages = RoomManager.addMessage(room.code, message);

		this.emitToAllInRoom(room.code, 'onRoomChat', {
			messages: messages
		} as RoomChatHistoryResponse);
	}
}