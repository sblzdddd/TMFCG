import {reactive, watch} from "vue";
import {useCardProfile} from "~/composables/useCardProfile";
import {type CardData, CardNumber, type CardProfile, CardSuit} from "~/types/Card";


const cardEditModel = reactive<CardData>({
	suit: CardSuit.CLUBS,
	number: CardNumber.ACE,
	appearance: {
		character: "【无角色】",
		characterVariant: "0",
		characterY: 0,
		characterX: 0,
	}
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

	watch(() => cardEditModel, (newVal) => {

		const index = currentProfile.value.cards.findIndex(
			(card: CardData) => card.suit === newVal.suit && card.number === newVal.number
		)
		if (index !== -1) {
			currentProfile.value.cards[index] = {...newVal}
			editorStatus.hasChanges = true
		}
	}, {deep: true})

	watch(() => currentProfile.value.name, () => {
		editorStatus.hasChanges = true
	})

	const newProfile = () => {
		setCardProfile(initializeProfile())
		editorStatus.hasChanges = false
	}

	const addCard = (card: CardData) => {
		// card.suit = parseInt(card.suit.toString())
		// card.characterY = parseFloat(card.characterY.toString())
		// card.characterX = parseFloat(card.characterX.toString())
		const index = currentProfile.value.cards.findIndex(
			(c: CardData) => c.suit === card.suit && c.number === card.number
		)
		if (index !== -1) {
			currentProfile.value.cards[index] = {...card}
			editorStatus.hasChanges = true
		}
	}

	const setProfileName = (name: string) => {
		currentProfile.value.name = name
		editorStatus.hasChanges = true
	}


	const resetChanges = () => {
		if (editorStatus.lastSavedState) {
			setCardProfile(JSON.parse(editorStatus.lastSavedState) as CardProfile)
			editorStatus.hasChanges = false
		}
	}
	return {
		newProfile,
		editorStatus,
		cardEditModel,
		resetChanges,
		addCard,
		setProfileName,
	}
}
