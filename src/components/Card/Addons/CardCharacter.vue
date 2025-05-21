<template>
  <div class="card-sub card-char-root">
    <div :style="`padding-bottom: ${imageOffsetY}%`" class="card-sub card-char-mask">
      <img
        ref="characterImage"
        :src="charImageSrc"
        :style="`transform: translateX(${imageOffsetX}%)`"
        alt="character"
        class="card-char"
        @load="onCharacterImageLoad"
      >
    </div>
    <div class="card-sub pt-[16%] px-[18%]">
      <svg class="character-name itim" viewBox="0 0 500 150">
        <path id="curve" d="M 40,126 A 420,420 0 0,1 460,126" fill="transparent"/>
        <text class="character-name-text" :style="`font-size: ${charNameSize}px;`">
          <textPath href="#curve" startOffset="50%">
            {{ charEnglishName }}
          </textPath>
        </text>
      </svg>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { ICardCharacter } from "~/lib/CardCharacter/CardCharacter";

const charEnglishName = ref("Unknown");
const charImageSrc = ref("");
const characterImage = ref();
const isImageLoaded = ref(false);
const imageOffsetX = ref(0);
const imageOffsetY = ref(0);

const charNameSize = computed(() => {
  if (!charEnglishName.value) return 45;
  const unclipped_size = 80 - 2 * charEnglishName.value.length;
  return Math.max(24, Math.min(unclipped_size, 55));
})

const props = defineProps({
  character: {
    type: Object as () => ICardCharacter,
    required: true
  }
})

function loadCharacterImage(character: ICardCharacter) {

  if (!character.englishName || !character.characterImageName) return;
  charEnglishName.value = character.englishName;
  isImageLoaded.value = false;
  import(`@/assets/images/characters/${character.characterImageName}.png`).then((module) => {
    if (characterImage.value) charImageSrc.value = module.default;
  })
}

function onCharacterImageLoad() {
  isImageLoaded.value = true;
  imageOffsetX.value = props.character.offsetX;
  imageOffsetY.value = props.character.offsetY;
}

watch([() => props.character.name, () => props.character.variant], async () => {
  await nextTick();
  if (props.character) loadCharacterImage(props.character);
}, { immediate: true })

watch([() => props.character?.offsetX, () => props.character?.offsetY], (newOffset) => {
  if (isImageLoaded.value) {
    imageOffsetX.value = newOffset[0];
    imageOffsetY.value = newOffset[1];
  }
})
</script>
<style lang="postcss" scoped>
.card-char-mask {
  @apply pt-[27%];
  mask-image: url('@/assets/images/cards/Character_Mask.png');
  mask-size: contain;
}

.card-char {
  @apply w-full h-full object-contain;
  image-rendering: pixelated;
  filter: drop-shadow(2px 0px 0px #f3ecdc) drop-shadow(-1px 0px 0px #f3ecdc) drop-shadow(0px 2px 0px #f3ecdc) drop-shadow(0px -1px 0px #f3ecdc);
  transform: translateX(3%);
}
.character-name {
  @apply w-full h-auto;
  
  .character-name-text { 
    text-anchor: middle;
    fill: #492712;
    stroke: #d3c3a1;
    stroke-width: 6px;
    paint-order: stroke;
  }
}
</style>
