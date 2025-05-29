import {reactive, watch} from "vue";
import {useCardProfile} from "./useCardProfile";
import type {IBaseCard} from "~/lib/Card/BaseCard";
import { CardSuit, CardNumber } from "~/types/Card";
import { CardProfileFactory } from "~/lib/CardProfile/CardProfileFactory";
import type { ICardProfile } from "~/lib/CardProfile/CardProfile";
import { CardCharacterFactory } from "~/lib/CardCharacter/CardCharacterFactory";
import type { ICardCharacter } from "~/lib/CardCharacter/CardCharacter";
interface CardInfoModel {
	id: string,
	suit: CardSuit,
	number: CardNumber,
	description: string,
	character: ICardCharacter,
}

const cardInfoModel = reactive<CardInfoModel>({
	id: '',
	suit: CardSuit.CLUBS,
	number: CardNumber.ACE,
	description: '',
	character: CardCharacterFactory.createDefaultCardCharacter()
})

const editorStatus = reactive<{
	hasChanges: boolean,
	lastSavedState: string,
}>({
	hasChanges: false,
	lastSavedState: '',
})
export const useCardEditor = () => {
	const {currentProfile, setCardProfile} = useCardProfile()

	watch(() => cardInfoModel, (newVal) => {

		const index = currentProfile.value.cards.findIndex(
			(card: IBaseCard) => card.suit === newVal.suit && card.number === newVal.number
		)
		if (index !== -1) {
			currentProfile.value.cards[index].setInfo(newVal)
			editorStatus.hasChanges = true
		}
	}, {deep: true})

	watch(() => currentProfile.value.name, () => {
		editorStatus.hasChanges = true
	})

	const newProfile = () => {
		setCardProfile(CardProfileFactory.createInitialCardProfile())
		editorStatus.hasChanges = false
	}

	const saveCurrentCard = () => {
		const index = currentProfile.value.cards.findIndex(
			(c: IBaseCard) => c.suit === cardInfoModel.suit && c.number === cardInfoModel.number
		)
		if (index !== -1) {
			currentProfile.value.cards[index].setInfo(cardInfoModel)
			editorStatus.hasChanges = true
		}
	}

	const setProfileName = (name: string) => {
		currentProfile.value.name = name
		editorStatus.hasChanges = true
	}


	const resetChanges = () => {
		if (editorStatus.lastSavedState) {
			setCardProfile(JSON.parse(editorStatus.lastSavedState) as ICardProfile)
			editorStatus.hasChanges = false
		}
	}
	return {
		newProfile,
		editorStatus,
		cardInfoModel,
		resetChanges,
		saveCurrentCard,
		setProfileName,
	}
}
