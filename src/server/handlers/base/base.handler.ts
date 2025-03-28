import type { Socket } from "socket.io";
import type { DefaultEventsMap } from "@socket.io/component-emitter";

export interface IBaseHandler {
  socket: Socket;
  initialize(): void;
}

export abstract class BaseHandler implements IBaseHandler {
  public readonly socket: Socket<
    DefaultEventsMap,
    DefaultEventsMap,
    DefaultEventsMap
  >;

  constructor(socket: Socket) {
    this.socket = socket;
    this.initialize();
  }

  abstract initialize(): void;

  protected emit<T>(event: string, data: T): void {
    this.socket.emit(event, data);
  }

  protected broadcast<T>(event: string, data: T): void {
    this.socket.broadcast.emit(event, data);
  }

  protected joinRoom(roomId: string): void {
    this.socket.join(roomId);
  }

  protected leaveRoom(roomId: string): void {
    this.socket.leave(roomId);
  }

  protected emitToRoom<T>(roomId: string, event: string, data: T): void {
    this.socket.to(roomId).emit(event, data);
  }

  protected on<T>(event: string, func: (data: T) => void) {
    this.socket.on(event, (data: T) => {
      try {
        func(data);
      } catch (error) {
        this.handleError(error as Error);
      }
    });
  }

  protected handleError(error: Error): void {
    console.error(error);
    this.emit("error", {
      code: error.name,
      message: error.message,
      details: { stack: error.stack },
    });
  }
}
