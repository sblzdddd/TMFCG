<template>
  <v-form @submit.prevent="addCurrentCard">
    <v-tabs v-model="activeTab" color="primary">
      <v-tab value="edit">编辑牌面</v-tab>
      <v-tab value="list">牌组列表</v-tab>
    </v-tabs>

    <v-window v-model="activeTab">
      <v-window-item value="edit">
        <div class="mt-4">
          <span>牌型</span>
          <div class="d-flex align-center">
            <v-btn-toggle
                v-model="cardEditModel.suit"
                class="flex-grow-1"
                density="comfortable"
                divided
                mandatory
                variant="outlined"
            >
              <v-btn class="!text-xl" value="0">♣</v-btn>
              <v-btn class="!text-xl" value="1">♦</v-btn>
              <v-btn class="!text-xl" value="2">♥</v-btn>
              <v-btn class="!text-xl" value="3">♠</v-btn>
            </v-btn-toggle>

            <v-btn class="ms-2" icon variant="text" @click="prevCard()">
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <v-btn class="ms-2" icon variant="text" @click="nextCard()">
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </div>

          <v-autocomplete
              v-model="cardNumber"
              :items="cardNumbers"
              class="mt-6"
              density="comfortable"
              label="牌面"
              required
              transition="scale-transition"
              variant="outlined"
          />

          <div class="flex flex-col lg:flex-row gap-4">
            <v-autocomplete
                v-model="cardEditModel.appearance.character"
                :items="characterList"
                density="comfortable"
                label="对应角色"
                required
                transition="scale-transition"
                variant="outlined"
            />

            <v-autocomplete
                v-model="cardEditModel.appearance.characterVariant"
                :items="characterVariants"
                density="comfortable"
                label="角色差分"
                required
                transition="scale-transition"
                variant="outlined"
            />
          </div>

          <v-slider
              v-model="cardEditModel.appearance.characterY"
              :max="40"
              :min="0"
              :step="0.1"
              label="角色下边界"
              thumb-label
          />

          <v-slider
              v-model="cardEditModel.appearance.characterX"
              :max="15"
              :min="-15"
              :step="0.1"
              label="角色X偏移"
              thumb-label
          />
        </div>
      </v-window-item>

      <v-window-item value="list">
        <div class="mt-4">
          <v-text-field
              v-model="search"
              class="mb-4"
              density="compact"
              hide-details
              label="搜索"
              prepend-inner-icon="mdi-magnify"
              variant="outlined"
          />

          <div class="flex flex-wrap gap-2 pb-2 h-[50vh] overflow-y-auto">
            <v-btn
                v-for="(card, index) in filteredCards"
                :key="index"
                :color="card.suit === cardEditModel.suit && card.number === cardEditModel.number ? 'primary' : 'default'"
                :variant="card.suit === cardEditModel.suit && card.number === cardEditModel.number ? 'elevated' : 'flat'"
                @click="selectCard(card)"
            >
              {{ card.number }}{{ ['♣', '♦', '♥', '♠'][card.suit] }} - {{ card.appearance.character }}
            </v-btn>
          </div>
        </div>
      </v-window-item>
    </v-window>
  </v-form>
</template>

<script lang="ts" setup>
import {type CardData, CardNumber} from "~/types/Card"

const {characterList, GetCharacterVariants} = useCharacterData();
const {cardEditModel, editorStatus} = useCardEditor();
const {currentProfile} = useCardProfile()
const {addCard} = useCardEditor()

const activeTab = ref('edit')
const search = ref('')

const cardNumbers = computed(() => Array.from({length: 13}, (_, i) => (i + 1).toString()))
const cardNumber = ref(cardEditModel.number.toString())

const updateExistingCard = () => {

  // find existing card
  const existingCard = currentProfile.value.cards.find(
      card => card.suit === cardEditModel.suit && card.number === cardEditModel.number
  )

  // if card exists, update cardEditModel with existing card data
  if (existingCard) {
    cardEditModel.appearance.character = existingCard.appearance.character
    cardEditModel.appearance.characterVariant = existingCard.appearance.characterVariant
    cardEditModel.appearance.characterY = existingCard.appearance.characterY
    cardEditModel.appearance.characterX = existingCard.appearance.characterX
  }
}

// Watch for changes in suit or number to load existing card data
watch(() => cardEditModel.suit, () => {
  updateExistingCard()
}, {immediate: true})

watch(() => cardNumber.value, () => {
  cardEditModel.number = parseInt(cardNumber.value)
  updateExistingCard()
}, {immediate: true})

// Handle unsaved changes warning
const handleBeforeUnload = (e: BeforeUnloadEvent) => {
  if (editorStatus.hasChanges) {
    const confirmationMessage = '您有未保存的更改。如果现在离开，您的更改将会丢失。'
    ;(e || window.event).returnValue = confirmationMessage // Gecko + IE
    return confirmationMessage // Gecko + Webkit, Safari, Chrome etc.
  }
}

onMounted(() => {
  window.addEventListener('beforeunload', handleBeforeUnload)
})

onBeforeUnmount(() => {
  window.removeEventListener('beforeunload', handleBeforeUnload)
})

const filteredCards = computed(() => {
  if (!search.value) return currentProfile.value.cards
  const searchLower = search.value.toLowerCase()
  return currentProfile.value.cards.filter(card =>
      card.appearance.character.toLowerCase().includes(searchLower) ||
      card.number.toString().toLowerCase().includes(searchLower) ||
      ['♣', '♦', '♥', '♠'][card.suit].toLowerCase().includes(searchLower)
  )
})


const characterVariants = computed(() => GetCharacterVariants(cardEditModel.appearance.character))

watch(() => cardEditModel.appearance.character, (value) => {
  const variants = GetCharacterVariants(value)
  if (variants.length > 0) {
    // Only set default variant if current variant is not available for the new character
    if (!variants.includes(cardEditModel.appearance.characterVariant)) {
      cardEditModel.appearance.characterVariant = variants[0]
    }
  }
})

const nextCard = () => {
  if (cardEditModel.number === CardNumber.KING) {
    cardEditModel.number = CardNumber.ACE
    cardEditModel.suit = (cardEditModel.suit + 1) % 4
  } else {
    cardEditModel.number += 1
  }
  updateExistingCard()
}

const prevCard = () => {
  if (cardEditModel.number === CardNumber.ACE) {
    cardEditModel.number = CardNumber.KING
    cardEditModel.suit = (cardEditModel.suit - 1 + 4) % 4
  } else {
    cardEditModel.number -= 1
  }
  updateExistingCard()
}

const addCurrentCard = () => {
  addCard({...cardEditModel})
}

const selectCard = (card: CardData) => {
  cardEditModel.suit = card.suit
  cardEditModel.number = card.number
  cardEditModel.appearance.character = card.appearance.character
  cardEditModel.appearance.characterVariant = card.appearance.characterVariant
  cardEditModel.appearance.characterY = card.appearance.characterY
  cardEditModel.appearance.characterX = card.appearance.characterX
}
</script>

<style>
.v-card.border-primary {
  border: 2px solid rgb(var(--v-theme-primary));
}
</style>