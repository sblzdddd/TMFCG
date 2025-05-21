// Card Factory
import {EffectCard, type IEffectCard} from "~/lib/Card/EffectCard";
import {StandardCard} from "~/lib/Card/StandardCard";
import {CardNumber, CardSuit} from "~/types/Card";
import {CardCharacterFactory} from "~/lib/CardCharacter/CardCharacterFactory";
import type {IStandardCard} from "~/lib/Card/StandardCard";

export const CardFactory = {
	createStandardCard(card: IStandardCard): StandardCard {
		return new StandardCard(
			card.cardId,
			card.suit,
			card.number,
			card.name || `${CardNumber[card.number]} of ${CardSuit[card.suit]}`,
			CardCharacterFactory.createFromInterface(card.character),
			card.description
		);
	},

	createEffectCard(card: IEffectCard): EffectCard {
		return new EffectCard(
			card.cardId,
			card.suit,
			card.number,
			card.name,
			CardCharacterFactory.createFromInterface(card.character),
			card.effectType,
			card.effectData,
			card.description,
			card.conditions
		);
	},

	createDefaultCard(number: CardNumber, suit: CardSuit, cardId: string="default"): StandardCard {
		if(cardId === "default") {
			cardId = "default-" + Math.random().toString(36).substring(2, 15);
		}
		return new StandardCard(
			cardId,
			suit,
			number,
			cardId,
			CardCharacterFactory.createDefaultCardCharacter(),
			`Default Description for ${cardId}`
		);
	},
};