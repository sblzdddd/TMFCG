import { ref, computed } from 'vue'
import type { CardNumber, CardSuit } from '~/types/Card'
import type { BaseCard, IBaseCard } from '@/lib/Card'
import { type CardProfile, CardProfileFactory, type ICardProfile } from '@/lib/CardProfile'

const defaultProfile = CardProfileFactory.createInitialCardProfile()
const globalCardProfile = ref<CardProfile>(defaultProfile);

export const useCardProfile = () => {
	
	if (typeof window === 'undefined') {
		return {
			currentProfile: computed(() => globalCardProfile.value),
			getCardProfile: () => undefined,
			setCardProfile: (_profile: ICardProfile) => {},
			addCard: () => undefined,
			removeCard: () => undefined,
			getStandardCards: () => [],
			getEffectCards: () => [],
			sortCards: () => undefined,
		}
	}

	const getCardProfile = (suit: CardSuit, number: CardNumber): IBaseCard | undefined => {
		if (!globalCardProfile.value) return undefined;
		return globalCardProfile.value.cards.find(
			card => card.suit === suit && card.number === number
		) as IBaseCard | undefined;
	}

	const setCardProfile = (profileData: ICardProfile | null) => {
		console.log('setCardProfile', profileData);
		if (profileData) {
			globalCardProfile.value = CardProfileFactory.createCardProfile(profileData);
		}
	}

	const addCard = (card: BaseCard) => {
		if (!globalCardProfile.value) globalCardProfile.value = CardProfileFactory.createInitialCardProfile() as CardProfile;
		globalCardProfile.value.cards.push(card)
		sortCards()
	}

	const removeCard = (cardId: string) => {
		if (!globalCardProfile.value) return;
		globalCardProfile.value.cards = globalCardProfile.value.cards
			.filter(card => card.id !== cardId)
	}

	const sortCards = () => {
		if (!globalCardProfile.value) return;
		globalCardProfile.value.cards.sort((a, b) => a.compareTo(b))
	}

	return {
		currentProfile: globalCardProfile,
		getCardProfile,
		setCardProfile,
		addCard,
		removeCard,
		sortCards,
	}
} 