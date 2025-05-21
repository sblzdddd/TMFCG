import type { Socket } from "socket.io";
import type { User } from "~/types/user";

export class UserManager {
	private static users: User[] = [];

	static getUser(socket: Socket): User | undefined {
		return this.users.find((user) => user.socketId === socket.id);
	}

	static getUserFromToken(token: string): User | undefined {
		return this.users.find((user) => user.id === token);
	}

	static createUserFromToken(token: string, socketId: string): User {
		const user: User = {
			id: token,
			socketId: socketId,
			name: "哇多么好的机会啊" + Math.random().toString(36).substring(2, 8),
			isRoomOwner: false,
			currentRoomCode: null,
			connected: false,
			avatar: Math.floor(Math.random() * 94),
		} as User;

		this.users.push(user);

		return user;
	}

	static updateUserSocketId(token: string, socketId: string) {
		const user = this.getUserFromToken(token);

		if (user) {
			user.socketId = socketId;
			this.updateUser(user);
		}
	}

	static updateUser(user: User) {
		const index = this.users.findIndex((u) => u.id === user.id);

		if (index !== -1) {
			this.users[index] = user;
		} else {
			this.users.push(user);
		}
	}

	static changeUserName(user: User, name: string) {
		const index = this.users.findIndex((u) => u.id === user.id);

		if (index !== -1) {
			this.users[index].name = name;
		}
	}

	static changeUserAvatar(user: User, avatar: number) {
		const index = this.users.findIndex((u) => u.id === user.id);

		if (index !== -1) {
			this.users[index].avatar = avatar;
		}
	}
}
