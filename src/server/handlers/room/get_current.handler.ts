import {BaseHandler} from '../base/base.handler';
import {RoomManager, UserManager} from '@/server/managers';
import type {RoomInfoResponse} from '@/types/DTO/room.dto';
import { useLogger } from '~/composables/useLogger';

const { debug, info, warn, error } = useLogger("handler:get_current_room");

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
					debug(`Joining room ${user.currentRoomCode}`);
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

