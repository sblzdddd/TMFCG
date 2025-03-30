
declare global {
  type User = {
    id: string;
    socketId: string;
    name: string;
    isRoomOwner: boolean;
    currentRoomCode: string | null;
    connected: boolean;
    avatar: number;
  }

  type RoomMember = {
    id: string;
    name: string;
    isRoomOwner: boolean;
    connected: boolean;
    avatar: number;
  }
}
