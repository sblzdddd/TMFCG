import type {Socket} from "socket.io";

import {CommonHandler} from "./common";
import {UserHandler} from "./user";
import {RoomHandler} from "./room";

export default (socket: Socket) => {
	new CommonHandler(socket);
	new UserHandler(socket);
	new RoomHandler(socket);
};
