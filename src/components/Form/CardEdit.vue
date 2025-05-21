<template>
  <v-form :style="`max-height: ${windowHeight-54}px;height: ${windowHeight-54}px;`" @submit.prevent="saveCurrentCard">
    <splitpanes class="default-theme">
      <pane min-size="20" max-size="80" size="70">
        <div class="h-full w-full px-4">
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
                      v-model="cardInfoModel.suit"
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
                      v-model="cardInfoModel.character.name"
                      :items="characterList"
                      density="comfortable"
                      label="对应角色"
                      required
                      transition="scale-transition"
                      variant="outlined"
                  />

                  <v-autocomplete
                      v-model="cardInfoModel.character.variant"
                      :items="characterVariants"
                      density="comfortable"
                      label="角色差分"
                      required
                      transition="scale-transition"
                      variant="outlined"
                  />
                </div>

                <v-slider
                    v-model="cardInfoModel.character.offsetY"
                    :max="40"
                    :min="0"
                    :step="0.1"
                    label="角色下边界"
                    thumb-label
                />

                <v-slider
                    v-model="cardInfoModel.character.offsetX"
                    :max="15"
                    :min="-15"
                    :step="0.1"
                    label="角色X偏移"
                    thumb-label
                />
              </div>
            </v-window-item>

            <v-window-item value="list"/>
          </v-window>
        </div>
      </pane>
      <pane min-size="20" max-size="80">
        <splitpanes class="default-theme max-h-full" horizontal>
          <pane>
            <div class="w-full h-full p-4 flex" style="aspect-ratio: 756/1051 !important;">
              <Card-Base
                :number="cardInfoModel.number"
                :suit="cardInfoModel.suit"
              >
                <template #front>
                  <Card-Addons-CardCharacter
                      :character="cardInfoModel.character"
                  />
                </template>
              </Card-Base>
              </div>
          </pane>
          <pane size="40">
            <div class="w-full h-full min-h-0 max-h-full flex flex-col relative !px-2 overflow-y-auto">
              <div class="pt-2">
                <v-text-field
                    v-model="search"
                    class="!max-h-10"
                    density="compact"
                    hide-details
                    label="搜索"
                    prepend-inner-icon="mdi-magnify"
                    variant="outlined"
                />
              </div>

              <div class="flex flex-wrap grow items-center gap-1 py-2">
                <button
                    v-for="(card, index) in filteredCards"
                    :key="index"
                    v-ripple
                    class="card-select-btn"
                    :class="isCardSelected(card) ? 'bg-primary' : 'bg-transparent hover:!bg-black/20'"
                    @click="!isCardSelected(card) ? selectCard(card) : null"
                >
                  <div class="text-xl">
                    {{ card.number }}{{ ['♣', '♦', '♥', '♠'][card.suit] }}
                  </div>
                  <div class="text-[0.6rem] whitespace-nowrap max-w-full overflow-hidden text-ellipsis">
                    {{ card.character.name }}
                  </div>
                </button>
              </div>
            </div>
          </pane>
        </splitpanes>
      </pane>
  </splitpanes>
</v-form>
</template>

<script lang="ts" setup>
import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'
import {CardNumber} from "~/types/Card"
import type {IBaseCard} from "~/lib/Card/"
import SetB from "@/assets/Set B.json"
import type {ICardProfile} from "~/lib/CardProfile"
const {characterList, GetCharacterVariants} = useCharacterData();
const {cardInfoModel, editorStatus} = useCardEditor();
const {currentProfile} = useCardProfile()
const {saveCurrentCard} = useCardEditor()
const {loadProfile} = useCardProfileLoader()

const activeTab = ref('edit')
const search = ref('')

const cardNumbers = computed(() => Array.from({length: 13}, (_, i) => (i + 1).toString()))
const cardNumber = ref(cardInfoModel.number.toString())

const {windowHeight} = useViewport()

const updateExistingCard = () => {

  // find existing card
  const existingCard = currentProfile.value.cards.find(
      card => card.suit === cardInfoModel.suit && card.number === cardInfoModel.number
  )

  // if card exists, update cardInfoModel with existing card data
  if (existingCard) {
    cardInfoModel.character.name = existingCard.character.name
    cardInfoModel.character.variant = existingCard.character.variant
    cardInfoModel.character.offsetY = existingCard.character.offsetY
    cardInfoModel.character.offsetX = existingCard.character.offsetX
  }
}

// Watch for changes in suit or number to load existing card data
watch(() => cardInfoModel.suit, () => {
  updateExistingCard()
}, {immediate: true})

watch(() => cardNumber.value, () => {
  cardInfoModel.number = parseInt(cardNumber.value)
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
  loadProfile(SetB as ICardProfile)
  selectCard(currentProfile.value.cards[0])
})

onBeforeUnmount(() => {
  window.removeEventListener('beforeunload', handleBeforeUnload)
})

const filteredCards = computed(() => {
  if (!search.value) return currentProfile.value.cards
  const searchLower = search.value.toLowerCase()
  return currentProfile.value.cards.filter(card =>
      card.character.name.toLowerCase().includes(searchLower) ||
      card.number.toString().toLowerCase().includes(searchLower) ||
      ['♣', '♦', '♥', '♠'][card.suit].toLowerCase().includes(searchLower)
  )
})

const characterVariants = computed(() => GetCharacterVariants(cardInfoModel.character.name))

watch(() => cardInfoModel.character.name, (value) => {
  const variants = GetCharacterVariants(value)
  // Only set default variant if current variant is not available for the new character
  if (variants.length > 0 && !variants.includes(cardInfoModel.character.variant)) {
    cardInfoModel.character.variant = variants[0]
  }
})

const nextCard = () => {
  if (cardInfoModel.number === CardNumber.KING) {
    cardInfoModel.number = CardNumber.ACE
    cardInfoModel.suit = (cardInfoModel.suit + 1) % 4
  } else {
    cardInfoModel.number += 1
  }
  updateExistingCard()
}

const prevCard = () => {
  if (cardInfoModel.number === CardNumber.ACE) {
    cardInfoModel.number = CardNumber.KING
    cardInfoModel.suit = (cardInfoModel.suit - 1 + 4) % 4
  } else {
    cardInfoModel.number -= 1
  }
  updateExistingCard()
}

const selectCard = (card: IBaseCard) => {
  cardInfoModel.suit = card.suit
  cardInfoModel.number = card.number
  cardInfoModel.character = card.character
  cardInfoModel.character.variant = card.character.variant
  cardInfoModel.character.offsetY = card.character.offsetY
  cardInfoModel.character.offsetX = card.character.offsetX
}

const isCardSelected = (card: IBaseCard) => {
  return card.suit === cardInfoModel.suit && card.number === cardInfoModel.number
}
</script>
<style scoped lang="postcss">

.card-select-btn {
  @apply w-16 h-20 rounded-md flex flex-col items-center justify-center overflow-hidden p-1 shrink-0;
  transition: background-color 0.2s ease-in-out;
}
</style>
<style lang="postcss">
.v-card.border-primary {
  border: 2px solid rgb(var(--v-theme-primary));
}
.splitpanes.default-theme .splitpanes__pane {
  @apply bg-transparent;
}
</style>