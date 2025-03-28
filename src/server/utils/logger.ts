import debug from "debug";

// Create namespace for different parts of the application
const socketLogger = debug("socket:io");
const authLogger = debug("socket:auth");
const roomManagerLogger = debug("manager:room");
const userManagerLogger = debug("manager:user");
const roomServiceLogger = debug("service:room");

export const logger = {
  socket: socketLogger,
  auth: authLogger,
  roomManager: roomManagerLogger,
  userManager: userManagerLogger,
  roomService: roomServiceLogger,
};

// Enable all namespaces by default in development
if (process.env.NODE_ENV !== "production") {
  debug.enable("socket:*");
}
