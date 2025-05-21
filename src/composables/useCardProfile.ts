import { ref, computed } from 'vue'
import type { CardNumber, CardSuit } from '~/types/Card'
import type { BaseCard, IBaseCard } from '@/lib/Card'
import { isStandardCard } from '@/lib/Card'
import { CardProfile, type ICardProfile } from '@/lib/CardProfile'

function initializeProfile(): ICardProfile {
	return new CardProfile(
		'Unnamed',
		'Unknown',
		'1.0.0',
		'1.0.0',
		'Default card profile',
		[]
	)
}

const defaultProfile = initializeProfile()
const globalCardProfile = ref<ICardProfile>(defaultProfile)

export const useCardProfile = () => {
	if (typeof window === 'undefined') {
		return {
			currentProfile: computed(() => defaultProfile),
			getCardProfile: () => undefined,
			setCardProfile: () => undefined,
			addCard: () => undefined,
			removeCard: () => undefined,
			getStandardCards: () => [],
			getEffectCards: () => [],
			sortCards: () => undefined,
		}
	}

	const getCardProfile = (suit: CardSuit, number: CardNumber): IBaseCard | undefined => {
		return globalCardProfile.value.cards.find(
			card => isStandardCard(card) && card.suit === suit && card.number === number
		) as IBaseCard | undefined;
	}

	const setCardProfile = (profile: ICardProfile) => {
		globalCardProfile.value = profile
	}

	const addCard = (card: BaseCard) => {
		globalCardProfile.value.cards.push(card)
		sortCards()
	}

	const removeCard = (cardId: string) => {
		globalCardProfile.value.cards = globalCardProfile.value.cards
			.filter(card => card.cardId !== cardId)
	}

	const sortCards = () => {
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