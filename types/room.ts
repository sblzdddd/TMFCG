

declare global {
  interface Room {
      code: string;
      owner: string;
      isPrivate: boolean;
      memberIds: string[];
      members: User[];
      messages: ChatMessage[];
  }

  type PublicRoomInfo = {
      code: string;
      owner: string;
      memberCount: number;
  }
}