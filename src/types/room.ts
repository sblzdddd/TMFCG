import type {ChatMessage} from "./chat";
import type {RoomMember} from "./user";
import type { IBaseCard } from "~/lib/Card/BaseCard";
import type { ICardProfile } from "~/lib/CardProfile/CardProfile";

export interface PlayHistoryEntry {
  userId: string;
  cards: string[]; // card IDs
}

export interface Room {
	code: string;
	owner: string;
	isPrivate: boolean;
	memberIds: string[];
	members: RoomMember[];
	messages: ChatMessage[];
  deck: IBaseCard[];
  cardProfile: ICardProfile | null;
  playerHands: Record<string, string[]>; // userId: cardIds
  playHistory: PlayHistoryEntry[];
  lastPlayedCards: Record<string, string[]>; // userId: cardIds of last played cards
}

export type PublicRoomInfo = {
	code: string;
	owner: string;
	memberCount: number;
}
