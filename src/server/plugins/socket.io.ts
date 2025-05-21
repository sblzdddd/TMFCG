import type {NitroApp} from "nitropack";
import {Server as Engine} from "engine.io";
import {Server} from "socket.io";
import {defineEventHandler} from "h3";
import registerHandlers from "../handlers";
import {authMiddleware} from "../middlewares/auth.middleware";
import { useLogger } from "~/composables/useLogger";

const { debug } = useLogger("socket");

export default defineNitroPlugin((nitroApp: NitroApp) => {
	const engine = new Engine();
	const io = new Server({
		connectionStateRecovery: {
			// Store session data for 2 minutes
			maxDisconnectionDuration: 2 * 60 * 1000,
			// Skip middlewares upon successful recovery
			skipMiddlewares: true,
		}
	});

	io.bind(engine);


	// register the auth middleware
	io.use(authMiddleware);

	io.on("connection", (socket) => {
		registerHandlers(socket);
	});

	io.on("disconnect", (socket) => {
		debug(`socket.io disconnect: ${socket.id}`);
	});

	nitroApp.router.use("/socket.io/", defineEventHandler({
		handler(event) {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			engine.handleRequest(event.node.req as any, event.node.res);
			event._handled = true;
		},
		websocket: {
			open(peer) {
				// @ts-expect-error private method and property
				engine.prepare(peer._internal.nodeReq);
				// @ts-expect-error private method and property
				engine.onWebSocket(peer._internal.nodeReq, peer._internal.nodeReq.socket, peer.websocket);
			}
		}
	}));
});