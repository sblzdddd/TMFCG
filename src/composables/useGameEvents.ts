import type { ICardProfile } from '~/lib/CardProfile';

// Event Payloads (mirroring backend and useGameTable)
export interface CardDrawnPayload {
  receiver: number; 
  count: number;
  cards?: string[];
  drawerId: string;
}

export interface CardPlayedPayload {
  userId: string;
  cardId: string;
}

export interface PlayHistoryEntry {
  userId: string;
  cards: string[];
}

export interface GetRoomCardProfileResponse {
  roomCardProfile: ICardProfile;
}