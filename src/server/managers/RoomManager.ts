import type { Room, PublicRoomInfo } from "@/types/Room";
import type { RoomMember, User } from "@/types/User";

import { logger } from "@/server/utils/logger";

export class RoomManager {
  private static rooms = new Map<string, Room>();

  static getRoom(code: string | undefined | null): Room | undefined {
    logger.roomManager(`Getting room with code ${code}`);
    if (!code) {
      logger.roomManager(`No code provided`);

      return undefined;
    }

    const room = this.rooms.get(code);

    return room;
  }

  static getPublicRooms(): PublicRoomInfo[] {
    // Log the actual size of the rooms Map
    logger.roomManager(`Total rooms in Map: ${this.rooms.size}`);
    
    const publicRooms = Array.from(this.rooms.values()).filter((room) => !room.isPrivate);
    
    // Add more detailed logging
    logger.roomManager(`Found ${publicRooms.length} public rooms out of ${this.rooms.size} total rooms`);
    
    // Log each public room for debugging
    publicRooms.forEach(room => {
      logger.roomManager(`Public room: ${room.code}, Owner: ${room.owner}, Members: ${room.members}`);
    });

    return publicRooms.map((room) => ({
      code: room.code,
      owner: room.members.find((m) => m.id === room.owner)?.name || "Unknown",
      memberCount: room.members.length,
    }));
  }

  static createRoom(user: User, isPrivate: boolean): Room {
    const roomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    const newRoom: Room = {
      code: roomCode,
      owner: user.id,
      isPrivate: isPrivate,
      memberIds: [user.id],
      members: [user],
    };

    this.rooms.set(roomCode, newRoom);

    return newRoom;
  }

  static deleteRoom(code: string) {
    this.rooms.delete(code);
  }

  static getMembersFromRoom(room: Room): RoomMember[] {
    return room.members.map((m) => ({
      id: m.id,
      name: m.name || "Guest",
      isRoomOwner: m.isRoomOwner,
      connected: m.connected,
    }));
  }
}
