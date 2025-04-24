<template>
  <div class="card-sub card-char-root">
    <div :style="`padding-bottom: ${currentOffsetY}%`" class="card-sub card-char-mask">
      <img
          ref="characterImage"
          :src="charImageSrc"
          :style="`transform: translateX(${currentOffsetX}%)`"
          alt="character"
          class="card-char"
          @load="onImageLoad"
      >
    </div>
    <div class="card-sub pt-[16%] px-[18%]">
      <svg class="w-full h-auto itim character-name" viewBox="0 0 500 150">
        <path id="curve" d="M 40,126 A 420,420 0 0,1 460,126" fill="transparent"/>
        <text
            :style="`text-anchor: middle; font-size: ${charNameSize}px; fill: #492712; stroke: #d3c3a1; stroke-width: 6px; paint-order: stroke;`"
        >
          <textPath href="#curve" startOffset="50%">
            {{ charEnglishName }}
          </textPath>
        </text>
      </svg>
    </div>
  </div>
</template>
<script lang="ts" setup>

const {GetCharacterData} = useCharacterData();

const charEnglishName = ref("Unknown");
const charImageSrc = ref("");
const characterImage = ref();
const isImageLoaded = ref(false);
const currentOffsetX = ref(0);
const currentOffsetY = ref(0);

const charNameSize = computed(() => {
  if (!charEnglishName.value) {
    return 45;
  }
  const unclipped_size = 80 - 2 * charEnglishName.value.length;
  return Math.max(24, Math.min(unclipped_size, 55));
})

const props = defineProps({
  charName: {
    type: String,
    default: "橙",
    required: false
  },
  charVariant: {
    type: String,
    default: "无表情",
    required: false
  },
  offsetX: {
    type: Number,
    default: 0,
    required: false
  },
  offsetY: {
    type: Number,
    default: 0,
    required: false
  }
})

function setup() {
  const charData = GetCharacterData(props.charName);
  if (!charData) {
    return;
  }
  charEnglishName.value = charData.en_name;
  if (!charData.images.includes(props.charVariant)) {
    return;
  }
  isImageLoaded.value = false;
  import(`@/assets/images/characters/${charData.image_prefix} ${props.charVariant}.png`).then((module) => {
    if (characterImage.value) charImageSrc.value = module.default;
  })
}

function onImageLoad() {
  isImageLoaded.value = true;
  currentOffsetX.value = props.offsetX;
  currentOffsetY.value = props.offsetY;
}

watch(() => props.charName, () => {
  setup();
})

watch(() => props.charVariant, () => {
  setup();
})

watch(() => props.offsetX, (newVal) => {
  if (isImageLoaded.value) {
    currentOffsetX.value = newVal;
  }
})

watch(() => props.offsetY, (newVal) => {
  if (isImageLoaded.value) {
    currentOffsetY.value = newVal;
  }
})

onMounted(() => {
  setup();
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
</style>