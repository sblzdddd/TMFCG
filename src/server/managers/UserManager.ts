import type { Socket } from "socket.io";
import type { User } from "~/types/user";

const users: User[] = [];

export const UserManager = {

	getUser(socket: Socket): User | undefined {
		return users.find((user) => user.socketId === socket.id);
	},

	getUserFromToken(token: string): User | undefined {
		return users.find((user) => user.id === token);
	},

	createUserFromToken(token: string, socketId: string): User {
		const user: User = {
			id: token,
			socketId: socketId,
			name: "哇多么好的机会啊" + Math.random().toString(36).substring(2, 8),
			isRoomOwner: false,
			currentRoomCode: null,
			connected: false,
			avatar: Math.floor(Math.random() * 94),
		} as User;

		users.push(user);

		return user;
	},

	updateUserSocketId(token: string, socketId: string) {
		const user = this.getUserFromToken(token);

		if (user) {
			user.socketId = socketId;
			this.updateUser(user);
		}
	},

	updateUser(user: User) {
		const index = users.findIndex((u) => u.id === user.id);

		if (index !== -1) {
			users[index] = user;
		} else {
			users.push(user);
		}
	},

	changeUserName(user: User, name: string) {
		const index = users.findIndex((u) => u.id === user.id);

		if (index !== -1) {
			users[index].name = name;
		}
	},

	changeUserAvatar(user: User, avatar: number) {
		const index = users.findIndex((u) => u.id === user.id);

		if (index !== -1) {
			users[index].avatar = avatar;
		}
	},
}
