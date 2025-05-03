<template>
  <div 
    class="dialog-root" 
    :class="`${props.rightAlign ? 'justify-end' : 'justify-start'}`"
    :style="`
      --char-width-max: ${props.sizes[0][0]}rem;
      --char-width-lg: ${props.sizes[0][1]}vw;
      --char-width-md: ${props.sizes[0][2]}vw;
      --char-width-sm: ${props.sizes[0][3]}vw;
      --char-width-default: ${props.sizes[0][4]}vw;
      --char-height-max: ${props.sizes[1][0]}rem;
      --char-height-lg: ${props.sizes[1][1]}vw;
      --char-height-md: ${props.sizes[1][2]}vw;
      --char-height-sm: ${props.sizes[1][3]}vw;
      --char-height-default: ${props.sizes[1][4]}vw;
    `"
  >
    <!-- Character Portrait Section -->
    <div
      class="character-section"
      :class="`${props.rightAlign ? 'rounded-br-[18px]' : 'rounded-bl-[18px]'} ${props.characterClass}`"
    >
      <img
        ref="characterImage"
        :src="charImageSrc"
        alt="character"
        class="character-image"
        :class="{ 'black-masked': blackMask }"
        @load="onImageLoad"
      >
    </div>
    
    <!-- Dialog Box Section -->
    <div class="dialog-box absolute bottom-0" :class="`${props.rightAlign ? 'isRight' : 'isLeft'}`">
      <!-- Character Name -->
      <div class="character-name-section border-b-2 border-primary/20 pb-1 mb-1">
        <span class="character-name jiangxizhuokai">{{ charDisplayName || character }}</span>
      </div>
      
      <!-- Dialog Content -->
      <div class="dialog-content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const {GetCharacterData} = useCharacterData();

const charImageSrc = ref("");
const characterImage = ref();
const isImageLoaded = ref(false);

const props = defineProps({
  character: {
    type: String,
    default: "橙",
    required: false
  },
  charDisplayName: {
    type: String,
    default: undefined,
    required: false
  },
  variant: {
    type: String,
    default: "无表情",
    required: false
  },
  rightAlign: {
    type: Boolean,
    default: false,
    required: false
  },
  sizes: {
    type: Array<Array<number>>,
    default: () => [[12, 16, 20, 27, 35], [12, 16, 20, 27, 35]],
    required: false
  },
  characterClass: {
    type: String,
    default: "",
    required: false
  },
  blackMask: {
    type: Boolean,
    default: false,
    required: false
  }
})

function setup() {
  const charData = GetCharacterData(props.character);
  if (!charData) {
    console.log("charData not found:", props.character)
    import(`@/assets/images/characters/Fallback 0.png`).then((module) => {
      charImageSrc.value = module.default;
    })
    return;
  }
  if (!charData.images.includes(props.variant)) {
    console.log("variant not found:", props.variant)
    import(`@/assets/images/characters/Fallback 0.png`).then((module) => {
      charImageSrc.value = module.default;
    })
    return;
  }
  isImageLoaded.value = false;
  import(`@/assets/images/characters/${charData.image_prefix} ${props.variant}.png`).then((module) => {
    if (characterImage.value) charImageSrc.value = module.default;
    else {
      import(`@/assets/images/characters/Fallback 0.png`).then((module) => {
        charImageSrc.value = module.default;
      })
    }
  })
}

function onImageLoad() {
  isImageLoaded.value = true;
}

watch(() => props.character, () => {
  setup();
})

watch(() => props.variant, () => {
  setup();
})


onMounted(() => {
  setup();
})
</script>

<style lang="postcss" scoped>
.dialog-root {
  @apply relative min-h-[120px] flex items-center mb-1;
}

.character-section {
  @apply mb-[5.9px] mx-[6px] overflow-hidden z-10
  max-w-[var(--char-width-max)] max-h-[var(--char-height-max)]
  lg:w-[var(--char-width-lg)] lg:h-[var(--char-height-lg)]
  md:w-[var(--char-width-md)] md:h-[var(--char-height-md)]
  sm:w-[var(--char-width-sm)] sm:h-[var(--char-height-sm)]
  w-[var(--char-width-default)] h-[var(--char-height-default)];
}

.character-image {
  @apply w-full h-full object-cover object-top;
  image-rendering: pixelated;
  filter: drop-shadow(2px 0px 0px #f3ecdc) drop-shadow(-1px 0px 0px #f3ecdc) drop-shadow(0px 2px 0px #f3ecdc) drop-shadow(0px -1px 0px #f3ecdc);

  &.black-masked {
    filter: brightness(0) drop-shadow(2px 0px 0px #f3ecdc) drop-shadow(-1px 0px 0px #f3ecdc) drop-shadow(0px 2px 0px #f3ecdc) drop-shadow(0px -1px 0px #f3ecdc);
  }
}

.dialog-box {
  @apply bg-[#8f6547] border-[6px] border-primary rounded-3xl py-1 md:py-2 min-h-[120px] w-full
  px-[calc(var(--char-width-default)+12px)]
  sm:px-[calc(var(--char-width-sm)+12px)]
  md:px-[calc(var(--char-width-md)+12px)]
  lg:px-[calc(var(--char-width-lg)+12px)]
  xl:px-[calc(var(--char-width-max)+12px)];
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  &.isRight {
    @apply !pl-4;
  }
  &.isLeft {
    @apply !pr-4;
  }
}

.character-name {
  @apply text-lg md:text-xl lg:text-2xl text-foreground;
  text-shadow: 1px 0 #d3c3a1, -1px 0 #d3c3a1, 0 1px #d3c3a1, 0 -1px #d3c3a1;
}

.dialog-content {
  @apply text-white text-xs sm:text-sm md:text-base lg:text-lg;
  text-shadow: 1px 0 #000, -1px 0 #000, 0 1px #000, 0 -1px #000;
}
</style>