import type { IBaseCard } from "../Card/BaseCard";

// Card Profile type
export interface IDeck {
  cards: IBaseCard[];
}

export class Deck implements IDeck {
	constructor(
		public cards: IBaseCard[]
	) {
	}
}

