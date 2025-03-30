import { RoomManager, UserManager } from "~/server/managers";
import { BaseHandler } from "../base/base.handler";

export class GetChatsHandler extends BaseHandler {
  public initialize() {
      this.on("getChats", () => this.handleGetChats());
  }

  private handleGetChats() {
      const user = UserManager.getUser(this.socket);
      if (!user) {
        throw new Error('User not found');
      }
      if (!user.currentRoomCode) {
        throw new Error('User is not in a room');
      }
      const room = RoomManager.getRoom(user.currentRoomCode);
      if (!room) {
        throw new Error('Room does not exist');
      }

      this.emit('roomChats', {
          messages: room.messages
      } as RoomChatHistoryResponse);
  }
}