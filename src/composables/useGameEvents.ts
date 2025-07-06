import type { ICardProfile } from '~/lib/CardProfile';

// Event Payloads (mirroring backend and useGameTable)
export interface CardDrawnPayload {
  count: number;
  cards?: string[];
  drawerId: string;
  source: string;
  sourceId?: string;
}

export interface CardPlayedPayload {
  userId: string;
  cardIds: string[];
}

export interface PlayHistoryEntry {
  userId: string;
  cards: string[];
}

export interface GetRoomCardProfileResponse {
  roomCardProfile: ICardProfile;
}