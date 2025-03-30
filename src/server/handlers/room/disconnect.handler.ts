import { BaseHandler } from '../base/base.handler';
import { UserManager } from '@/server/managers';
import { RoomManager } from '@/server/managers';

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

