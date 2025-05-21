import type {StandardCard} from './StandardCard';
import type {EffectCard} from './EffectCard';
import type {BaseCard, IBaseCard} from './BaseCard';
import {CardType} from "~/types/Card";


// Type guard functions
export const isStandardCard = (card: IBaseCard | BaseCard): card is StandardCard => {
  return 'type' in card && card.type === CardType.STANDARD;
};

export const isEffectCard = (card: IBaseCard | BaseCard): card is EffectCard => {
  return 'type' in card && card.type === CardType.EFFECT;
};


// Helper functions for filtering cards
export const getStandardCards = (cards: BaseCard[]): StandardCard[] => 
  cards.filter(isStandardCard);

export const getEffectCards = (cards: BaseCard[]): EffectCard[] => 
  cards.filter(isEffectCard);

