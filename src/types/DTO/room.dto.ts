import type { Room, PublicRoomInfo } from "@/types/Room";
import type { RoomMember } from "@/types/User";

// Create Room
export type CreateRoomRequest = {
  isPrivate: boolean;
};

export type CreateRoomResponse = {
  room: Room;
  roomCode: string;
  isOwner: boolean;
};

// Join Room
export type JoinRoomRequest = {
  roomCode: string;
};

export type JoinRoomResponse = {
  success: boolean;
  message?: string;
  room?: Room;
};

// List Rooms
export type ListRoomsRequest = object;

export type ListRoomsResponse = {
  rooms: PublicRoomInfo[];
};

// Leave Room
export type LeaveRoomRequest = object;

export type LeaveRoomResponse = {
  success: boolean;
  message?: string;
};

// Room Members Update
export type RoomMembersUpdateResponse = {
  members: RoomMember[];
};

// Room Info
export type RoomInfoResponse = {
  room: Room | undefined;
};
