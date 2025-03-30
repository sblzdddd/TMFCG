
declare global {
  // Create Room
  type CreateRoomRequest = {
    isPrivate: boolean;
  };

  type CreateRoomResponse = {
    room: Room;
    roomCode: string;
    isOwner: boolean;
  };

  // Join Room
  type JoinRoomRequest = {
    roomCode: string;
  };

  type JoinRoomResponse = {
    success: boolean;
    message?: string;
    room?: Room;
  };

  // List Rooms
  type ListRoomsRequest = object;

  type ListRoomsResponse = {
    rooms: PublicRoomInfo[];
  };

  // Leave Room
  type LeaveRoomRequest = object;

  type LeaveRoomResponse = {
    success: boolean;
    message?: string;
  };

  // Room Members Update
  type RoomMembersUpdateResponse = {
    members: RoomMember[];
  };

  // Room Info
  type RoomInfoResponse = {
    room: Room | undefined;
  };

}