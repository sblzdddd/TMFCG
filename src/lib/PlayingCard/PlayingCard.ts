import type { IBaseCard } from "../Card";

export interface IPlayingCard {
  data: IBaseCard;
  isAnimating: boolean;
  id: number;
}

export class PlayingCard implements IPlayingCard {
  public data: IBaseCard;
  public isAnimating: boolean;
  public id: number;

  constructor(data: IBaseCard) {
    this.data = data;
    this.isAnimating = false;
    this.id = 0;
  }
}
