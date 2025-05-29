import { BaseCard, type IBaseCard } from "./BaseCard";
import {type CardNumber, type CardSuit, CardType} from "~/types/Card";
import type {ICardCharacter} from "~/lib/CardCharacter/CardCharacter";

export enum EffectTiming {
  ON_PLAY = 'onPlay',
  ON_DRAW = 'onDraw',
  ON_DISCARD = 'onDiscard',
  CONTINUOUS = 'continuous',
}

export interface ICardEffect {
  effectType: string;
  effectData: Record<string, unknown>;
  conditions?: {
    timing: EffectTiming;
    requirements?: Record<string, unknown>;
  }
}

export interface IEffectCard extends IBaseCard {
  effectType: string;
  effectData: Record<string, unknown>;
  conditions?: {
    timing: EffectTiming;
    requirements?: Record<string, unknown>;
  }
}
// Effect card class
export class EffectCard extends BaseCard {
  constructor(
    id: string,
    suit: CardSuit,
    number: CardNumber,
    name: string,
    character: ICardCharacter,
    public readonly effectType: string,
    public readonly effectData: Record<string, unknown>,
    description?: string,
    public readonly conditions?: {
      timing: EffectTiming;
      requirements?: Record<string, unknown>;
    }
  ) {
    super(id, suit, number, name, character, description);
  }

  public get type(): CardType {
    return CardType.EFFECT;
  }

  // Effect card specific methods
  public canActivate(): boolean {
    // Implementation depends on your game rules
    return true;
  }

  public getEffectValue<T>(key: string): T | undefined {
    return this.effectData[key] as T;
  }

  public getTiming(): string | undefined {
    return this.conditions?.timing;
  }
}