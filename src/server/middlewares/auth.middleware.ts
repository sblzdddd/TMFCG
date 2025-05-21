import type { Socket } from "socket.io";
import {UserManager} from "@/server/managers";
import { useLogger } from "~/composables/useLogger";

const { debug } = useLogger("auth");

export const authMiddleware = (socket: Socket, next: (err?: Error) => void) => {

	const token = socket.handshake.auth.token;

	if (!token) {
		return next(new Error("Authentication error"));
	}
	debug(`User attempting authentication with token ${token}`);

	// Store the token with the socket
	socket.data.token = token;

	// Restore previous session if it exists
	const user = UserManager.getUserFromToken(token);

	if (socket.recovered) {
		debug(`Client recovered: ${socket.data.user.id}(${socket.id})`);
	}

	if (user) {
		socket.data.user = user;
		UserManager.updateUserSocketId(user.id, socket.id);
		debug(`Existing user session restored for ${user.name}`);
	} else {
		debug(`Creating new user from token for ${token}`);
		socket.data.user = UserManager.createUserFromToken(token, socket.id);
		debug(`New user created: ${socket.data.user.name}`);
	}


	next();
};
