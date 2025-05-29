import { RoomManager } from "@/server/managers/RoomManager"; // Updated import
import { UserManager } from "@/server/managers"; // Assuming UserManager is still a class
import type { Room } from "~/types/room";
import type { User } from "~/types/user";
import { useLogger } from "~/composables/useLogger";

const { debug } = useLogger("roomService"); 

export const RoomService = {
	joinRoom(room: Room, user: User): void { 
		debug(`${user.name} Joining room ${room.code}`);
		user.currentRoomCode = room.code;
		user.isRoomOwner = room.owner === user.id;

		if (!room.memberIds.includes(user.id)) {
			room.memberIds.push(user.id);
			room.members = room.memberIds
				.map((id) => UserManager.getUserFromToken(id))
				.filter((user): user is User => user !== undefined);
		}

		UserManager.updateUser(user);
	},

	leaveRoom(room: Room, user: User): User | undefined { 
		debug(`${user.name} Leaving room ${room.code}`);
		user.currentRoomCode = null;
		user.isRoomOwner = false;

		room.memberIds = room.memberIds.filter((id) => id !== user.id);
		room.members = room.memberIds
			.map((id) => UserManager.getUserFromToken(id))
			.filter((user): user is User => user !== undefined);

		if (room.memberIds.length === 0) {
			RoomManager.deleteRoom(room.code); // Now using the imported module

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
	},
}
