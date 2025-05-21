<template>
  <Card-RenderedBase
      :number="number"
      :suit="suit"
      class="!w-full !max-w-[200px]"
  >
    <template #front>
      <Card-Addons-CardCharacter
          :character="character"
      />
    </template>
  </Card-RenderedBase>
</template>
<script lang="ts" setup>
import type {CardSuit, CardNumber} from '~/types/Card';
import type { ICardProfile } from '~/lib/CardProfile/CardProfile';
import type { ICardCharacter } from '~/lib/CardCharacter/CardCharacter';
import { CardCharacterFactory } from '~/lib/CardCharacter/CardCharacterFactory';
import SetB from '~/assets/Set B.json';
import type { IBaseCard } from '~/lib/Card/BaseCard';
import { CardProfileFactory } from '~/lib/CardProfile/CardProfileFactory';
import { ProfileLoader } from '~/lib/CardProfile';


const character = ref<ICardCharacter>(CardCharacterFactory.createDefaultCardCharacter());


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


const currentProfile = ref<ICardProfile>(CardProfileFactory.createInitialCardProfile());

const loadProfile = (profile: ICardProfile) => {
    const loadedProfile = ProfileLoader.fromObject(profile);
    currentProfile.value = loadedProfile;
}

const getCardProfile = (suit: CardSuit, number: CardNumber): IBaseCard | undefined => {
  const card = currentProfile.value.cards.find(card => card.suit === suit && card.number === number)
  return card
}

watch([() => props.cardSet, () => props.suit, () => props.number], () => {
  const map = {"B": SetB};
  if (Object.prototype.hasOwnProperty.call(map, props.cardSet)) {
    loadProfile(map[props.cardSet as keyof typeof map] as ICardProfile);
  } else {
    loadProfile(SetB as ICardProfile);
  }
  const profile = getCardProfile(props.suit, props.number);
  if (profile) {
    character.value = profile.character;
  }
}, {immediate: true});

</script>


