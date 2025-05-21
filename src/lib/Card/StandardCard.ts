import type { IBaseCard } from "./BaseCard";
import { BaseCard } from "./BaseCard";
import {CardType} from "~/types/Card";

export type IStandardCard = IBaseCard

// Standard playing card class
export class StandardCard extends BaseCard implements IStandardCard {

	public get type(): CardType {
		return CardType.STANDARD;
	}
}