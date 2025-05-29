import {CardFactory} from "../Card/CardFactory";
import {CardProfile, type ICardProfile} from "./CardProfile";
import type {IStandardCard} from "../Card/StandardCard";
import type {IEffectCard} from "../Card/EffectCard";
import type { CardNumber, CardSuit } from "~/types/Card";
import type { IBaseCard } from "../Card/BaseCard";

export const CardProfileFactory = {
  createCardProfile(profile: ICardProfile): CardProfile {
    const createdCards = profile.cards.map(card => {
      if ('effectType' in card && 'effectData' in card) {
        return CardFactory.createEffectCard(
          card as IEffectCard
        );
      } else {
        return CardFactory.createStandardCard(
          card as IStandardCard
        );
      }
    });

    return new CardProfile(
      profile.name,
      profile.author,
      profile.version,
      profile.apiVersion,
      profile.description,
      createdCards
    );
  },

  // 初始化默认54张牌式卡组
  createInitialCardProfile(): CardProfile {
    const cards: IBaseCard[] = []
    Array.from({length: 4}, (_, i) => i).forEach(suit => {
      Array.from({length: 13}, (_, i) => i + 1).forEach(number => {
        cards.push(CardFactory.createDefaultCard(number as CardNumber, suit as CardSuit))
      })
    })
    const initialProfile: ICardProfile = {
      name: "Default",
      author: "Default Author",
      version: "1.0.0",
      apiVersion: "1.0.0",
      description: "Default Card Profile",
      cards: cards,
      getCardById: () => undefined,
    };
    return this.createCardProfile(initialProfile);
  }
};
