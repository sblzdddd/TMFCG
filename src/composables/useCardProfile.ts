import {ref} from 'vue'
import type {CardData, CardNumber, CardProfile, CardSuit} from '~/types/Card'

const defaultProfile = initializeProfile()

const globalCardProfile = ref<CardProfile>(defaultProfile)


export const useCardProfile = () => {

	if (typeof window === 'undefined') {
		return {
			currentProfile: computed(() => initializeProfile()),
			getCardProfile: () => undefined,
			setCardProfile: () => undefined,
		}
	}


	const getCardProfile = (suit: CardSuit, number: CardNumber): CardData | undefined => {
		const card = globalCardProfile.value.cards.find(card => card.suit === suit && card.number === number)
		return card
	}

	const setCardProfile = (profile: CardProfile) => {
		globalCardProfile.value = profile
	}

	return {
		currentProfile: globalCardProfile,
		getCardProfile,
		setCardProfile
	}
} 