import {BaseHandler} from '../base/base.handler';
import {RoomManager, UserManager} from '@/server/managers';
import {RoomService} from '@/server/services/RoomService';
import type {RoomMembersUpdateResponse} from '@/types/DTO/room.dto';

// Leave the current room that the user is in
export class LeaveRoomHandler extends BaseHandler {
	public initialize() {
		this.on("leaveRoom", () => this.handleLeaveRoom());
	}

	private handleLeaveRoom() {
		const user = UserManager.getUser(this.socket);
		if (!user) {
			throw new Error('User not found');
		}
		if (!user.currentRoomCode) {
			throw new Error('User is not in a room');
		}
		const room = RoomManager.getRoom(user.currentRoomCode);
		if (!room) {
			throw new Error('Room does not exist');
		}

		// Leave the Socket.IO room
		this.leaveRoom(room.code);

		// Handle room leaving logic and get new owner if needed
		RoomService.leaveRoom(room, user);

		// Notify others in the room
		this.emitToRoom(room.code, 'user_left', {
			members: RoomManager.getMembersFromRoom(room)
		} as RoomMembersUpdateResponse);

		// Confirm leave to the user
		this.emit('room_left', {
			success: true,
			roomId: room.code
		});
	}
}