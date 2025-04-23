import {RoomManager, UserManager} from "@/server/managers";
import {logger} from "@/server/utils/logger";

export class RoomService {
	static joinRoom(room: Room, user: User) {
		logger.roomService(`${user.name} Joining room ${room.code}`);
		user.currentRoomCode = room.code;
		user.isRoomOwner = room.owner === user.id;

		if (!room.memberIds.includes(user.id)) {
			room.memberIds.push(user.id);
			room.members = room.memberIds
				.map((id) => UserManager.getUserFromToken(id))
				.filter((user): user is User => user !== undefined);
		}

		UserManager.updateUser(user);
	}

	static leaveRoom(room: Room, user: User): User | undefined {
		logger.roomService(`${user.name} Leaving room ${room.code}`);
		user.currentRoomCode = null;
		user.isRoomOwner = false;

		room.memberIds = room.memberIds.filter((id) => id !== user.id);
		room.members = room.memberIds
			.map((id) => UserManager.getUserFromToken(id))
			.filter((user): user is User => user !== undefined);

		if (room.memberIds.length === 0) {
			RoomManager.deleteRoom(room.code);

			return undefined;
		}

		if (room.owner === user.id) {
			const newOwner = UserManager.getUserFromToken(room.memberIds[0])!;

			room.owner = newOwner.id;
			newOwner.isRoomOwner = true;
			room.members.find((m) => m.id === newOwner.id)!.isRoomOwner = true;
			UserManager.updateUser(newOwner);

			return newOwner;
		}

		return undefined;
	}
}
