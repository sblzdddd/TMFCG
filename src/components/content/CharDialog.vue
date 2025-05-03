<template>
  <div class="dialog-root relative" :class="`${props.rightAlign ? 'justify-end' : 'justify-start'}`">
    <!-- Character Portrait Section -->
    <div
      class="character-section"
      :class="`${props.rightAlign ? 'rounded-br-[18px]' : 'rounded-bl-[18px]'}`"
      :style="`width: ${props.size}; transform: translateX(${props.offsetX}%);`"
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
    <div class="dialog-box absolute bottom-0" :class="`${props.rightAlign ? '!pr-52' : '!pl-52'}`">
      <!-- Character Name -->
      <div class="character-name-section border-b-2 border-primary/20 pb-1 mb-1">
        <span class="character-name jiangxizhuokai text-2xl text-foreground">{{ charDisplayName || character }}</span>
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
const currentOffsetX = ref(0);

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
  size: {
    type: String,
    default: "12rem",
    required: false
  },
  offsetX: {
    type: Number,
    default: 0,
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
  console.log(charData.image_prefix, props.variant)
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
  currentOffsetX.value = props.offsetX;
}

watch(() => props.character, () => {
  setup();
})

watch(() => props.variant, () => {
  setup();
})

watch(() => props.offsetX, (newVal) => {
  if (isImageLoaded.value) {
    currentOffsetX.value = newVal;
  }
})

onMounted(() => {
  setup();
})
</script>

<style lang="postcss" scoped>
.dialog-root {
  @apply min-h-[120px] flex items-center mb-1;
}

.character-section {
  @apply h-52 mb-[5.9px] mx-[6px] overflow-hidden z-10;
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
  @apply bg-[#8f6547] border-[6px] border-primary rounded-3xl p-2 px-4 min-h-[120px] w-full;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}

.character-name {
  text-shadow: 1px 0 #d3c3a1, -1px 0 #d3c3a1, 0 1px #d3c3a1, 0 -1px #d3c3a1;
}

.dialog-content {
  @apply text-white text-lg;
  text-shadow: 1px 0 #000, -1px 0 #000, 0 1px #000, 0 -1px #000;
}
</style>