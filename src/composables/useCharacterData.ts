import charactersData from "@/assets/characters.json"
import type { CharacterData } from "@/types/Character"

export const useCharacterData = () => {
	if (typeof window === 'undefined') {
		return {
			GetCharacterData: () => undefined,
			GetCharacterList: () => [],
			GetCharacterVariants: () => [],
		}
	}

	const GetCharacterData = (characterName: string): CharacterData | undefined => {
		const charData = (charactersData as unknown) as CharacterData[];
		const data = charData.find((character) => character.name.includes(characterName))
		if (data) {
			data.en_name = data.en_name.split("，")[0]
		}
		return data
	}

	const GetCharacterList = (): string[] => {
		const charData = (charactersData as unknown) as CharacterData[];
		return charData.map((character) => character.name)
	}

	const GetCharacterVariants = (characterName: string): string[] => {
		const charData = GetCharacterData(characterName);
		if (!charData) {
			return [];
		}
		return charData.images;
	}

	return {
		GetCharacterData,
		characterList: computed(() => GetCharacterList()),
		GetCharacterVariants,
	}
}
