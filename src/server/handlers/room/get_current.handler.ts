import { BaseHandler } from '../base/base.handler';
import { UserManager } from '@/server/managers';
import { RoomManager } from '@/server/managers';
import type { RoomInfoResponse } from '@/types/DTO/room.dto';

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
                this.emit('current_room', {
                    room: room
                } as RoomInfoResponse);
                return;
            };

		}
        
        this.emit('current_room', {
            room: undefined
        } as RoomInfoResponse);
	}
}

