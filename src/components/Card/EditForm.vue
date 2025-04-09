<template>
  <v-form @submit.prevent="addCurrentCard">
    <div class="my-4 flex gap-2 items-center">
      <v-text-field
        v-model="profileName"
        label="牌组名称"
        variant="outlined"
        density="compact"
        @update:model-value="setProfileName"
        hide-details
      />

      <v-btn
        color="primary"
        @click="addCurrentCard"
      >
        保存当前
      </v-btn>

      <v-btn
        color="primary"
        @click="downloadProfile"
      >
        导出
      </v-btn>

      <v-btn
        color="primary"
        @click="fileInput?.click()"
      >
        导入
      </v-btn>
      <input
        ref="fileInput"
        type="file"
        accept=".json"
        class="d-none"
        @change="handleFileUpload"
      />
    </div>

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
              v-model="cardEditModel.number"
              :items="cardValues"
              class="mt-6"
              density="comfortable"
              label="牌面"
              required
              transition="scale-transition"
              variant="outlined"
          />

          <div class="flex flex-col lg:flex-row gap-4">
            <v-autocomplete
                v-model="cardEditModel.character"
                :items="GetCharacterList()"
                density="comfortable"
                label="对应角色"
                required
                transition="scale-transition"
                variant="outlined"
            />

            <v-autocomplete
                v-model="cardEditModel.characterVariant"
                :items="characterVariants"
                density="comfortable"
                label="角色差分"
                required
                transition="scale-transition"
                variant="outlined"
            />
          </div>

          <v-slider
              v-model="cardEditModel.characterY"
              :max="40"
              :min="0"
              :step="0.1"
              label="角色下边界"
              thumb-label
          />

          <v-slider
              v-model="cardEditModel.characterX"
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
            prepend-inner-icon="mdi-magnify"
            label="搜索"
            variant="outlined"
            density="comfortable"
            class="mb-4"
            hide-details
          />

          <div class="flex flex-wrap gap-2 pb-2 h-[50vh] overflow-y-auto">
            <v-btn
              v-for="(card, index) in filteredCards"
              :key="index"
              :variant="card.suit === cardEditModel.suit && card.number === cardEditModel.number ? 'elevated' : 'flat'"
              :color="card.suit === cardEditModel.suit && card.number === cardEditModel.number ? 'primary' : 'default'"
              @click="selectCard(card)"
            >
              {{ card.character }} - {{ card.number }}{{ ['♣', '♦', '♥', '♠'][card.suit] }}
            </v-btn>
          </div>
        </div>
      </v-window-item>
    </v-window>
  </v-form>
</template>

<script lang="ts" setup>
import {GetCharacterList, GetCharacterVariants} from '@/utils/character'
import {cardEditModel} from '@/utils/card_edit'
import { useCardProfile } from '@/utils/card_profile'

const { currentProfile, addCard, setProfileName, downloadProfile, hasChanges, loadProfileFromFile } = useCardProfile()
const profileName = ref(currentProfile.value.name)
const activeTab = ref('edit')
const search = ref('')
const fileInput = ref<HTMLInputElement | null>(null)


const updateExistingCard = () => {
  if (!import.meta.client) return
  const existingCard = currentProfile.value.cards.find(
    card => card.suit.toString() === cardEditModel.suit.toString() && card.number.toString() === cardEditModel.number.toString()
  )
  
  console.log(existingCard)
  
  if (existingCard) {
    cardEditModel.character = existingCard.character
    cardEditModel.characterVariant = existingCard.characterVariant
    cardEditModel.characterY = existingCard.characterY
    cardEditModel.characterX = existingCard.characterX
  }
}

// Watch for changes in suit or number to load existing card data
watch(() => cardEditModel.suit, () => {
  updateExistingCard()
}, { immediate: true })

watch(() => cardEditModel.number, () => {
  updateExistingCard()
}, { immediate: true })

// Handle unsaved changes warning
const handleBeforeUnload = (e: BeforeUnloadEvent) => {
  if (hasChanges()) {
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
    card.character.toLowerCase().includes(searchLower) ||
    card.number.toLowerCase().includes(searchLower) ||
    ['♣', '♦', '♥', '♠'][card.suit].toLowerCase().includes(searchLower)
  )
})

const cardValues = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]

const characterVariants = computed(() => GetCharacterVariants(cardEditModel.character))

watch(() => cardEditModel.character, (value) => {
  const variants = GetCharacterVariants(value)
  if (variants.length > 0) {
    // Only set default variant if current variant is not available for the new character
    if (!variants.includes(cardEditModel.characterVariant)) {
      cardEditModel.characterVariant = variants[0]
    }
  }
})

const nextCard = () => {
  if (cardEditModel.number === "K") {
    cardEditModel.number = "A"
    cardEditModel.suit = (cardEditModel.suit + 1) % 4
  } else {
    const currentIndex = cardValues.findIndex((val) => val === cardEditModel.number)
    cardEditModel.number = cardValues[currentIndex + 1]
  }
  updateExistingCard()
}

const prevCard = () => {
  if (cardEditModel.number === "A") {
    cardEditModel.number = "K"
    cardEditModel.suit = (cardEditModel.suit - 1 + 4) % 4
  } else {
    const currentIndex = cardValues.findIndex((val) => val === cardEditModel.number)
    cardEditModel.number = cardValues[currentIndex - 1]
  }
  updateExistingCard()
}

const addCurrentCard = () => {
  addCard({...cardEditModel})
}

const selectCard = (card: CardAppearance) => {
  cardEditModel.suit = card.suit
  cardEditModel.number = card.number
  cardEditModel.character = card.character
  cardEditModel.characterVariant = card.characterVariant
  cardEditModel.characterY = card.characterY
  cardEditModel.characterX = card.characterX
}

const handleFileUpload = async (event: Event) => {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  
  if (!file) return
  
  try {
    await loadProfileFromFile(file)
    profileName.value = currentProfile.value.name
    // Reset file input
    if (fileInput.value) {
      fileInput.value.value = ''
    }
  } catch (error) {
    alert('加载牌组失败：' + (error instanceof Error ? error.message : '未知错误'))
  }
}
</script>

<style>
.v-card.border-primary {
  border: 2px solid rgb(var(--v-theme-primary));
}
</style>