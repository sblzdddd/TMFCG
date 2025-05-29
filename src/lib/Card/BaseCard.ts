import type {ICardCharacter} from "../CardCharacter/CardCharacter";
import {CardNumber, CardSuit, CardType} from "~/types/Card";

interface CardInfoModel {
	id: string,
	suit: CardSuit,
	number: CardNumber,
	description: string,
	character: {
		name: string,
		variant: string,
		offsetY: number,
		offsetX: number,
	},
}

export interface IBaseCard {
  id: string;
  suit: CardSuit;
  number: CardNumber;
	name: string;
  character: ICardCharacter;
  description?: string;
	type: CardType;
	getValue(): number;
	compareTo(other: BaseCard): number;
	updateCardInfo(card: IBaseCard): void;
	setInfo(info: CardInfoModel): void;
	toString(): string;
}

// Base card class
export abstract class BaseCard implements IBaseCard {

	constructor(
		public id: string,
		public suit: CardSuit,
		public number: CardNumber,
		public name: string,
		public character: ICardCharacter,
		public description?: string,
	) {
	}

	abstract get type(): CardType;

	// Common card methods
	public getValue(): number {
		return this.number === CardNumber.ACE ? 14 : this.number;
	}

	public compareTo(other: BaseCard): number {
		if (this.type !== other.type) {
			return this.type === CardType.STANDARD ? -1 : 1;
		}

		const valueComparison = this.getValue() - other.getValue();
		if (valueComparison !== 0) {
			return valueComparison;
		}
		return this.suit - other.suit;
	}

	public updateCardInfo(card: IBaseCard) {
		this.suit = card.suit;
		this.number = card.number;
		this.name = card.name;
		this.character = card.character;
		this.description = card.description;
	}

	public setInfo(info: CardInfoModel) {
		this.id = info.id;
		this.suit = info.suit;
		this.number = info.number;
		this.description = info.description;
		
		// Update character properties individually to maintain any additional properties
		// that might exist in the ICardCharacter interface
		this.character = {
			...this.character,
			name: info.character.name,
			variant: info.character.variant,
			offsetY: info.character.offsetY,
			offsetX: info.character.offsetX,
		};
	}

	public toString(): string {
		return `${this.name} (${CardSuit[this.suit]} ${CardNumber[this.number]})`;
	}
}
