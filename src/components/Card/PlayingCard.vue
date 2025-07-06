<template>
  <Card-RenderedBase
      :number="number"
      :suit="suit"
  >
    <template #front>
      <Card-Addons-CardCharacter :character="character" />
      <div class="card-darken" style="opacity: 0;" />
    </template>
  </Card-RenderedBase>
</template>
<script lang="ts" setup>
import type { CardCharacter } from "~/lib/CardCharacter";
import { CardCharacterFactory } from "~/lib/CardCharacter/CardCharacterFactory";

const character = ref<CardCharacter>(CardCharacterFactory.createDefaultCardCharacter());

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

const {getCardProfile, currentProfile} = useCardProfile();

watch(props, () => {
  const profile = getCardProfile(props.suit, props.number);
  if (profile) {
    character.value = profile.character;
  }
}, {immediate: true});

watch(currentProfile, () => {
  const profile = getCardProfile(props.suit, props.number);
  if (profile) {
    character.value = profile.character;
  }
}, {immediate: true});

</script>
<style lang="postcss" scoped>
.card-darken {
  @apply bg-black/50 absolute top-0 left-0 w-full h-full z-10;
}
</style>


