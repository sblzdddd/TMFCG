import { CardType } from "~/types/Card";
import { CardFactory } from "../Card/CardFactory";
import type { IBaseCard, IEffectCard, IStandardCard } from "../Card";
import { PlayingCard } from "./PlayingCard";

export const PlayingCardFactory = {
  createPlayingCard(cardData: IStandardCard | IEffectCard, id: number = 0): PlayingCard {
    if (cardData.type === CardType.EFFECT) {
      const cardInstance = CardFactory.createEffectCard(cardData as IEffectCard);
      return new PlayingCard(cardInstance, id);
    }
    return new PlayingCard(cardData, id);
  },

  createFromBaseCard(baseCard: IBaseCard): PlayingCard {
    return this.createPlayingCard(baseCard);
  }
}; 