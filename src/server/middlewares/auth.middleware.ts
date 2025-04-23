import {Socket} from "socket.io";

import {logger} from "@/server/utils/logger";
import {UserManager} from "@/server/managers";

export const authMiddleware = (socket: Socket, next: (err?: Error) => void) => {

	const token = socket.handshake.auth.token;

	if (!token) {
		return next(new Error("Authentication error"));
	}
	logger.auth(`User attempting authentication with token ${token}`);

	// Store the token with the socket
	socket.data.token = token;

	// Restore previous session if it exists
	const user = UserManager.getUserFromToken(token);

	if (socket.recovered) {
		logger.auth(`Client recovered: ${socket.data.user.id}(${socket.id})`);
	}

	if (user) {
		socket.data.user = user;
		UserManager.updateUserSocketId(user.id, socket.id);
		logger.auth(`Existing user session restored for ${user.name}`);
	} else {
		logger.auth(`Creating new user from token for ${token}`);
		socket.data.user = UserManager.createUserFromToken(token, socket.id);
		logger.auth(`New user created: ${socket.data.user.name}`);
	}


	next();
};
