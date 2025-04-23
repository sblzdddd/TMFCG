import type {RoomMembersUpdateResponse} from '@/types/DTO/room.dto';
import {BaseHandler} from '../base/base.handler';
import {RoomManager, UserManager} from '@/server/managers';

export class DisconnectRoomHandler extends BaseHandler {
	public initialize() {
		this.on("disconnect", () => this.handleDisconnect());
	}

	private handleDisconnect() {
		const user = UserManager.getUser(this.socket);
		if (user && user.currentRoomCode) {
			const room = RoomManager.getRoom(user.currentRoomCode);
			if (!room) return;

			// Notify others in the room
			this.emitToRoom(room.code, 'user_disconnected', {
				members: RoomManager.getMembersFromRoom(room)
			} as RoomMembersUpdateResponse);
		}
	}
}

