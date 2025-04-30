<template>
  <div class="w-full flex flex-col gap-2 justify-center pb-8">
    <div v-if="isRendered" class="flex w-full flex-wrap gap-2 justify-center items-center">
      <img v-for="(image, index) in cardImages" :key="index" :src="image" alt="Card Image" class="!w-[256px]">
    </div>
    <div v-else class="flex w-full flex-wrap gap-2 justify-center items-center">
      <Card-Base v-for="(card, index) in profile.cards" :key="index" :number="card.number" :suit="card.suit" class="render-card !w-[256px]" />
    </div>
    <div class="flex gap-2 justify-center">
      <v-btn id="btn-render" @click="renderToImage">Render to Image</v-btn>
      <v-btn id="btn-download-zip" @click="downloadAsZip" :disabled="!isRendered">Download as ZIP</v-btn>
    </div>
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
import JSZip from 'jszip';
import { useCardProfile } from "@/composables/useCardProfile";

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
  const fontEmbedCSS = await htmlToImage.getFontEmbedCSS(cardElements[0] as HTMLElement)
  // fontEmbedCSS += await htmlToImage.getFontEmbedCSS(cardElements[0].querySelector('.character-name') as HTMLElement);
  for(let i = 0; i < cardElements.length; i++) {
    const cardElement = cardElements[i];
    await waitForAllImagesToLoad(cardElement);
    const dataUrl = await htmlToImage.toPng(cardElement, {fontEmbedCSS});
    cardImages.value.push(dataUrl);
  }
  isRendered.value = true;
}

const downloadAsZip = async () => {
  if (cardImages.value.length === 0) return;
  
  const zip = new JSZip();
  
  // Add each image directly to the zip root (no folder)
  cardImages.value.forEach((dataUrl, index) => {
    const imageData = dataUrl.split(',')[1];
    const card = profile.value.cards[index];
    
    const fileName = `${card.suit}_${card.number}.png`;
    zip.file(fileName, imageData, { base64: true });
  });
  
  // Generate and download the zip file
  const content = await zip.generateAsync({ type: 'blob' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(content);
  link.download = `${profile.value.name || 'cards'}.zip`;
  link.click();
  URL.revokeObjectURL(link.href);
}
</script>

