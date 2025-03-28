export interface User {
  id: string;
  socketId: string;
  name: string;
  isRoomOwner: boolean;
  currentRoomCode: string | null;
  connected: boolean;
}

export interface RoomMember {
  id: string;
  name: string;
  isRoomOwner: boolean;
  connected: boolean;
}
