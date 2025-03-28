import type { User } from "./User";

export interface Room {
  code: string;
  owner: string;
  isPrivate: boolean;
  memberIds: string[];
  members: User[];
}

export interface PublicRoomInfo {
  code: string;
  owner: string;
  memberCount: number;
}
