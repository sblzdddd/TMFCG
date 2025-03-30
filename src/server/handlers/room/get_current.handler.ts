import { BaseHandler } from '../base/base.handler';
import { UserManager } from '@/server/managers';
import { RoomManager } from '@/server/managers';
import { logger } from '@/server/utils/logger';

// Get Current Room that the user is in
export class GetCurrentRoomHandler extends BaseHandler {
	public initialize() {
		this.on("get_current_room", () => this.handleGetCurrentRoom());
	}

	private handleGetCurrentRoom() {
		const user = UserManager.getUser(this.socket);
		if (user && user.currentRoomCode) {
			const room = RoomManager.getRoom(user.currentRoomCode);
			if (room) {
				// Join the socket room if not already joined
				if (!this.socket.rooms.has(user.currentRoomCode)) {
					logger.roomManager(`Joining room ${user.currentRoomCode}`);
					this.joinRoom(user.currentRoomCode);
				}
				
				this.emitToRoom(user.currentRoomCode, 'current_room', {
					room: room
				} as RoomInfoResponse);
			}
		}
		
		this.emit('current_room', {
			room: undefined
		} as RoomInfoResponse);
	}
}

