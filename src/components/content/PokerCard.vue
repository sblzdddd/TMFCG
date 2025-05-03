<template>
  <Card-RenderedBase
      :number="number"
      :suit="suit"
      class="!w-full !max-w-[200px]"
  >
    <template #front>
      <Card-Addons-CharacterEdit
          :char-name="character"
          :char-variant="characterVariant"
          :offset-x="characterX"
          :offset-y="characterY"
      />
    </template>
  </Card-RenderedBase>
</template>
<script lang="ts" setup>
import {watch} from 'vue';
import type {CardProfile, CardData, CardSuit, CardNumber} from '~/types/Card';
import {initializeProfile} from '~/utils/profile_helper';

import SetB from '~/assets/Set B.json';

const character = ref('');
const characterVariant = ref('');
const characterX = ref(0);
const characterY = ref(0);

const props = defineProps({
  cardSet: {
    type: String,
    required: false,
    default: 'B',
  },
  suit: {
    type: Number,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
});


const currentProfile = ref<CardProfile>(initializeProfile());

const loadProfile = (profile: CardProfile) => {

  // initialize profile
  currentProfile.value = initializeProfile();

  const loadedCards = new Map(
    profile.cards.map(card => [`${card.suit}-${card.number}`, card])
  )

  // merge loaded cards into initialized profile cards
  currentProfile.value.cards = currentProfile.value.cards.map((card: CardData) => {
    const key = `${card.suit}-${card.number}`
    return loadedCards.get(key) || card
  })

  currentProfile.value.name = profile.name
}

const getCardProfile = (suit: CardSuit, number: CardNumber): CardData | undefined => {
  const card = currentProfile.value.cards.find(card => card.suit === suit && card.number === number)
  return card
}

watch([() => props.cardSet, () => props.suit, () => props.number], () => {
  const map = {"B": SetB};
  if (Object.prototype.hasOwnProperty.call(map, props.cardSet)) {
    loadProfile(map[props.cardSet as keyof typeof map] as CardProfile);
  } else {
    loadProfile(SetB as CardProfile);
  }
  const profile = getCardProfile(props.suit, props.number);
  if (profile) {
    character.value = profile.appearance.character;
    characterVariant.value = profile.appearance.characterVariant;
    characterX.value = profile.appearance.characterX;
    characterY.value = profile.appearance.characterY;
  }
}, {immediate: true});

</script>


