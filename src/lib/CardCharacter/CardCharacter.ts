import type { CharacterData } from "~/types/Character";

export interface ICardCharacter {
	name: string;
	variant: string;
	offsetX: number;
	offsetY: number;
	characterData: CharacterData | undefined;
	englishName: string | undefined;
	characterImageName: string | undefined;
}

export class CardCharacter implements ICardCharacter {
	constructor(
		public name: string,
		public variant: string,
		public offsetX: number,
		public offsetY: number,
	) {
	}
	public get characterData(): CharacterData | undefined {
		const characterData = useCharacterData();
		return characterData.GetCharacterData(this.name);
	}

	public get englishName(): string | undefined {
		const characterData = this.characterData;
		if (!characterData) return undefined;
		return characterData.en_name;
	}

	public get characterImageName(): string | undefined {
		const characterData = this.characterData;
		if (!characterData) return undefined;
		return `${characterData.image_prefix} ${this.variant}`;
	}
}
