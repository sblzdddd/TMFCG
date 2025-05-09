import {RoomManager} from '~/server/managers';
import {BaseHandler} from '../base/base.handler';
import type {ListRoomsResponse} from '@/types/DTO/room.dto';

// List all public rooms
export class ListRoomsHandler extends BaseHandler {
	public initialize() {
		this.on("listRooms", () => this.handleListRooms());
	}

	private handleListRooms() {
		const rooms = RoomManager.getPublicRooms();
		this.emit("publicRooms", {rooms} as ListRoomsResponse);
	}
}
