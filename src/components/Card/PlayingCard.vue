<template>
  <Card-RenderedBase
      :number="number"
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
  </Card-RenderedBase>
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


