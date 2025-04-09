declare global {
	export interface CardAppearance {
		suit: number;
		number: string;
		character: string;
		characterVariant: string;
		characterY: number;
		characterX: number;
	}

	export interface Card {
		appearance: CardAppearance;
		id: string;
	}

	export interface CardProfile {
		name: string;
		cards: CardAppearance[];
	}
}
