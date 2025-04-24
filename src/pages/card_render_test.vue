<template>
  <div class="w-full flex flex-col gap-2 justify-center pb-8">
    <div v-if="isRendered" class="flex w-full flex-wrap gap-2 justify-center items-center">
      <img v-for="(image, index) in cardImages" :key="index" :src="image" alt="Card Image" class="!w-[256px]">
    </div>
    <div v-else class="flex w-full flex-wrap gap-2 justify-center items-center">
      <Card-PlayingCard v-for="(card, index) in profile.cards" :key="index" :number="card.number" :suit="card.suit" class="render-card !w-[256px]" />
    </div>
    <v-btn id="btn-render" @click="renderToImage">Render to Image</v-btn>
    <v-progress-linear :model-value="cardImages.length" :height="12" :max="profile.cards.length" />
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useCardLoader } from "@/composables/useCardLoader";
import { LoadingState } from "@/utils/loading";
import setB from "@/assets/Set B.json";
import type { CardProfile } from "@/types/Card";
import * as htmlToImage from 'html-to-image';
import { waitForAllImagesToLoad } from "@/utils/image-loading";
const profile = ref<CardProfile>({
  cards: [],
  name: "",
});

const isRendered = ref(false);

const cardImages = ref<string[]>([]);

onMounted(() => {
  const {loadProfile} = useCardLoader();
  loadProfile(setB as CardProfile);
  const {currentProfile} = useCardProfile();
  LoadingState.isLoading = false;
  profile.value = currentProfile.value;
});

const renderToImage = async () => {
  const cardElements = document.querySelectorAll('.render-card') as NodeListOf<HTMLElement>;
  const fontEmbedCSS = await htmlToImage.getFontEmbedCSS(cardElements[0].querySelector('.character-name') as HTMLElement)
                      + await htmlToImage.getFontEmbedCSS(cardElements[0] as HTMLElement);
  console.log(fontEmbedCSS);
  for(let i = 0; i < cardElements.length; i++) {
    const cardElement = cardElements[i];
    await waitForAllImagesToLoad(cardElement);
    const dataUrl = await htmlToImage.toPng(cardElement, {fontEmbedCSS});
    cardImages.value.push(dataUrl);
  }
  isRendered.value = true;
}
</script>

