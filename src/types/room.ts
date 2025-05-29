import type {ChatMessage} from "./chat";
import type {User} from "./user";
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
	members: User[];
	messages: ChatMessage[];
  deck: IBaseCard[];
  cardProfile: ICardProfile | null;
  playerHands: Record<string, string[]>; // userId: cardIds
  playHistory: PlayHistoryEntry[];
}

export type PublicRoomInfo = {
	code: string;
	owner: string;
	memberCount: number;
}
