import type { IBaseCard } from "../Card/BaseCard";

// Card Profile type
export interface ICardProfile {
  name: string;
  author: string;
  version: string;
  apiVersion: string;
  description: string;
  cards: IBaseCard[];
	getCardById(id: string): IBaseCard | undefined;
}

export class CardProfile implements ICardProfile {
	constructor(
		public name: string,
		public author: string,
		public version: string,
		public apiVersion: string,
		public description: string,
		public cards: IBaseCard[]
	) {
	}

	public getCardById(id: string): IBaseCard | undefined {
		return this.cards.find(card => card.id === id);
	}
}

