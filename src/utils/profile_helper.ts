import type { CardSuit, CardData, CardNumber, CardProfile} from "~/types/Card";


export const createDefaultCard = (suit: CardSuit, number: CardNumber): CardData => ({
	suit,
	number,
	appearance: {
		character: "【无角色】",
		characterVariant: "0",
		characterY: 0,
		characterX: 0
	}
})

export const initializeProfile = (): CardProfile => {
	const cards: CardData[] = []
	Array.from({length: 4}, (_, i) => i).forEach(suit => {
		Array.from({length: 13}, (_, i) => i + 1).forEach(number => {
			cards.push(createDefaultCard(suit as CardSuit, number as CardNumber))
		})
	})
	return {
		name: 'New Profile',
		cards
	}
}
