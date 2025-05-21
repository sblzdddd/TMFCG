import type { IBaseCard } from "../Card/BaseCard";

// Card Profile type
export interface ICardProfile {
  name: string;
  author: string;
  version: string;
  apiVersion: string;
  description: string;
  cards: IBaseCard[];
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
}

