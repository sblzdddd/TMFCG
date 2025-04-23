import {BaseHandler} from '../base/base.handler';
import {RoomManager, UserManager} from '@/server/managers';
import {RoomService} from '@/server/services/RoomService';
import type {JoinRoomRequest, JoinRoomResponse, RoomMembersUpdateResponse} from '@/types/DTO/room.dto';

// Join a room by room code
export class JoinRoomHandler extends BaseHandler {
	public initialize() {
		this.on("joinRoom", (data: JoinRoomRequest) => this.handleJoinRoom(data));
	}

	private handleJoinRoom(data: JoinRoomRequest) {
		try {
			const user = UserManager.getUser(this.socket);
			if (!user) {
				throw new Error('User not found');
			}
			UserManager.updateUser(user);

			const room = RoomManager.getRoom(data.roomCode);
			if (!room) {
				throw new Error('Room does not exist');
			}

			RoomService.joinRoom(room, user);
			this.joinRoom(data.roomCode);

			// Notify others in the room
			this.emitToRoom(room.code, 'user_joined', {
				members: RoomManager.getMembersFromRoom(room)
			} as RoomMembersUpdateResponse);

			// Confirm join to the user
			this.emit('room_joined', {
				success: true,
				room: room,
			} as JoinRoomResponse);
		} catch (error) {
			this.emit('room_joined', {
				success: false,
				error: error instanceof Error ? error.message : 'Unknown error'
			});
		}
	}
}
