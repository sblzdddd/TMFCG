<template>
  <div class="w-full flex flex-col gap-2 justify-center pb-8">
    <div class="flex w-full flex-wrap gap-2 justify-center items-center">
      <Card-RenderedBase v-for="(card, index) in profile.cards" :key="index" :number="card.number" :suit="card.suit" class="render-card !w-[256px]" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useCardLoader } from "@/composables/useCardLoader";
import { LoadingState } from "@/utils/loading";
import setB from "@/assets/Set B.json";
import type { CardProfile } from "@/types/Card";
import { useCardProfile } from "@/composables/useCardProfile";

const profile = ref<CardProfile>({
  cards: [],
  name: "",
});

onMounted(() => {
  const {loadProfile} = useCardLoader();
  loadProfile(setB as CardProfile);
  const {currentProfile} = useCardProfile();
  LoadingState.isLoading = false;
  profile.value = currentProfile.value;
});
</script>

