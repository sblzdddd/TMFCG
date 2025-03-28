import { BaseHandler } from '../base/base.handler';
import { UserManager } from '@/server/managers';
import { RoomManager } from '@/server/managers';
import type { CreateRoomRequest, CreateRoomResponse } from '@/types/DTO/room.dto';

export class CreateRoomHandler extends BaseHandler {
	public initialize() {
		this.on("createRoom", (data: CreateRoomRequest) => this.handleCreateRoom(data));
	}

	private handleCreateRoom(data: CreateRoomRequest) {
		const user = UserManager.getUser(this.socket);
		if (!user) {
			throw new Error('User not found');
		}
		UserManager.updateUser(user);

		const room = RoomManager.createRoom(user, data.isPrivate);
		this.joinRoom(room.code);

		this.emit('room_created', {
			roomCode: room.code,
			isOwner: true,
			room: room
		} as CreateRoomResponse);
	}
}
