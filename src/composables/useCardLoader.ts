import {useCardProfile} from "./useCardProfile";
import {useCardEditor} from "./useCardEditor";
import type {CardData, CardProfile} from "~/types/Card";

const {currentProfile} = useCardProfile();
const {editorStatus, newProfile} = useCardEditor()

export const useCardLoader = () => {
	if (typeof window === 'undefined') {
		return {
			downloadProfile: () => {
			},
			loadProfile: () => {
			},
			loadProfileFromFile: () => {
			},
		}
	}


	const downloadProfile = () => {
		const dataStr = JSON.stringify(currentProfile.value, null, 2)
		const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr)

		const exportFileDefaultName = `${currentProfile.value.name}.json`

		const linkElement = document.createElement('a')
		linkElement.setAttribute('href', dataUri)
		linkElement.setAttribute('download', exportFileDefaultName)
		linkElement.click()

		editorStatus.lastSavedState = dataStr
		editorStatus.hasChanges = false
	}

	const loadProfile = (profile: CardProfile) => {

		// initialize profile
		newProfile()

		const loadedCards = new Map(
			profile.cards.map(card => [`${card.suit}-${card.number}`, card])
		)

		console.log(profile)

		console.log(loadedCards)

		// merge loaded cards into initialized profile cards
		currentProfile.value.cards = currentProfile.value.cards.map((card: CardData) => {
			const key = `${card.suit}-${card.number}`
			return loadedCards.get(key) || card
		})

		currentProfile.value.name = profile.name
		editorStatus.lastSavedState = JSON.stringify(currentProfile.value, null, 2)
		editorStatus.hasChanges = false

		console.log(currentProfile.value)
	}
	const loadProfileFromFile = (file: File): Promise<void> => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader()

			reader.onload = (e) => {
				try {
					const content = e.target?.result as string
					const profile = JSON.parse(content) as CardProfile

					// Validate the profile structure
					if (!profile.name || !Array.isArray(profile.cards)) {
						throw new Error('Invalid profile format')
					}

					// Ensure all cards have required properties
					for (const card of profile.cards) {
						if (
							typeof card.suit !== 'number' ||
							typeof card.number !== 'number' ||
							typeof card.appearance.character !== 'string' ||
							typeof card.appearance.characterVariant !== 'string' ||
							typeof card.appearance.characterY !== 'number' ||
							typeof card.appearance.characterX !== 'number'
						) {
							throw new Error('Invalid card format: ' + JSON.stringify(card))
						}
					}

					loadProfile(profile)
					resolve()
				} catch (error) {
					reject(error)
				}
			}

			reader.onerror = () => {
				reject(new Error('Failed to read file'))
			}

			reader.readAsText(file)
		})
	}

	return {
		downloadProfile,
		loadProfile,
		loadProfileFromFile,
	}
}

