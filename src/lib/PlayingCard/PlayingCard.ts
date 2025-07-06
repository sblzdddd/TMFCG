import type { BaseCard, IBaseCard } from "../Card";
import type { CardType } from "~/types/Card";

export interface IPlayingCard {
  data: IBaseCard;
  instance: BaseCard;
  type: CardType;
  isAnimating: boolean;
  isSelected: boolean;
  id: number;
}

export class PlayingCard implements IPlayingCard {
  public data: IBaseCard;
  public instance: BaseCard;
  public type: CardType;
  public isAnimating: boolean;
  public isSelected: boolean;
  public id: number;

  constructor(instance: BaseCard, id: number = 0) {
    this.instance = instance;
    this.data = instance;
    this.type = instance.type;
    this.isAnimating = false;
    this.isSelected = false;
    this.id = id;
  }
}
