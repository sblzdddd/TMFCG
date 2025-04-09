import { ref, watch } from 'vue'
import { cardEditModel } from './card_edit'

const cardValues = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]
const suits = [0, 1, 2, 3] // ♣, ♦, ♥, ♠

const createDefaultCard = (suit: number, number: string): CardAppearance => ({
  suit,
  number,
  character: "帕秋莉",
  characterVariant: "无表情",
  characterY: 0,
  characterX: 0
})

const initializeProfile = (): CardProfile => {
  const cards: CardAppearance[] = []
  suits.forEach(suit => {
    cardValues.forEach(number => {
      cards.push(createDefaultCard(suit, number))
    })
  })
  return {
    name: 'New Profile',
    cards
  }
}

const currentProfile = ref<CardProfile>(initializeProfile())
const hasUnsavedChanges = ref(false)
const lastSavedState = ref<string>('')

watch(() => cardEditModel, (newVal) => {
  const index = currentProfile.value.cards.findIndex(
    card => card.suit === newVal.suit && card.number === newVal.number
  )
  if (index !== -1) {
    currentProfile.value.cards[index] = { ...newVal }
    hasUnsavedChanges.value = true
  }
}, { deep: true })

watch(() => currentProfile.value.name, () => {
  hasUnsavedChanges.value = true
})

export const useCardProfile = () => {
  const addCard = (card: CardAppearance) => {
    card.suit = parseInt(card.suit.toString())
    card.characterY = parseFloat(card.characterY.toString())
    card.characterX = parseFloat(card.characterX.toString())
    const index = currentProfile.value.cards.findIndex(
      c => c.suit.toString() === card.suit.toString() && c.number.toString() === card.number.toString()
    )
    if (index !== -1) {
      currentProfile.value.cards[index] = { ...card }
      hasUnsavedChanges.value = true
    }
  }

  const removeCard = (index: number) => {
    const card = currentProfile.value.cards[index]
    currentProfile.value.cards[index] = createDefaultCard(card.suit, card.number)
    hasUnsavedChanges.value = true
  }

  const updateCard = (index: number, card: CardAppearance) => {
    currentProfile.value.cards[index] = { ...card }
    hasUnsavedChanges.value = true
  }

  const setProfileName = (name: string) => {
    currentProfile.value.name = name
    hasUnsavedChanges.value = true
  }

  const downloadProfile = () => {
    const dataStr = JSON.stringify(currentProfile.value, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
    
    const exportFileDefaultName = `${currentProfile.value.name}.json`
    
    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()

    lastSavedState.value = dataStr
    hasUnsavedChanges.value = false
  }

  const loadProfile = (profile: CardProfile) => {
    const loadedCards = new Map(
      profile.cards.map(card => [`${card.suit}-${card.number}`, card])
    )
    
    const completeCards = suits.flatMap(suit =>
      cardValues.map(number => {
        const key = `${suit}-${number}`
        return loadedCards.has(key) 
          ? loadedCards.get(key)!
          : createDefaultCard(suit, number)
      })
    )
    
    currentProfile.value = {
      name: profile.name,
      cards: completeCards
    }
    lastSavedState.value = JSON.stringify(currentProfile.value, null, 2)
    hasUnsavedChanges.value = false
  }

  const hasChanges = () => {
    return hasUnsavedChanges.value
  }

  const resetChanges = () => {
    if (lastSavedState.value) {
      currentProfile.value = JSON.parse(lastSavedState.value)
      hasUnsavedChanges.value = false
    }
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
              typeof card.number !== 'string' ||
              typeof card.character !== 'string' ||
              typeof card.characterVariant !== 'string' ||
              typeof card.characterY !== 'number' ||
              typeof card.characterX !== 'number'
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
    currentProfile,
    hasUnsavedChanges,
    addCard,
    removeCard,
    updateCard,
    setProfileName,
    downloadProfile,
    loadProfile,
    hasChanges,
    resetChanges,
    loadProfileFromFile
  }
} 