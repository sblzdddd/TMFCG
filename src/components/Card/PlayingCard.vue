<template>
  <Card-RenderedBase
      :number="number"
      :suit="suit"
  >
    <template #front>
      <Card-Addons-CardCharacter :character="character" />
    </template>
  </Card-RenderedBase>
</template>
<script lang="ts" setup>
import { CardCharacter } from "~/lib/CardCharacter/CardCharacter";

const character = ref<CardCharacter>(new CardCharacter("【无角色】", "0", 0, 0));

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
    character.value = profile.character;
  }
}, {immediate: true});

</script>


