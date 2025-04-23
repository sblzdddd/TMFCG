<template>
  <Card-Base
      :number="number"
      :rotate-x="rotateX"
      :rotate-y="rotateY"
      :show-back="false"
      :suit="suit"
  >
    <template #front>
      <Card-Addons-CharacterEdit
          :char-name="character"
          :char-variant="characterVariant"
          :offset-x="characterX"
          :offset-y="characterY"
      />
    </template>
  </Card-Base>
</template>
<script lang="ts" setup>
import {watch} from 'vue';

const character = ref('');
const characterVariant = ref('');
const characterX = ref(0);
const characterY = ref(0);

const props = defineProps({
  suit: {
    type: Number,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  rotateY: {
    type: Number,
    required: false,
    default: 0,
  },
  rotateX: {
    type: Number,
    required: false,
    default: 0,
  },
});

const {getCardProfile} = useCardProfile();

watch(props, () => {
  const profile = getCardProfile(props.suit, props.number);
  if (profile) {
    character.value = profile.appearance.character;
    characterVariant.value = profile.appearance.characterVariant;
    characterX.value = profile.appearance.characterX;
    characterY.value = profile.appearance.characterY;
  }
}, {immediate: true});

</script>


