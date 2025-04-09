<!--Card Layout-->
<template>
  <div class="card">
    <div class="card-sub card-deco-stars"/>
    <slot name="backdrop"/>
    <div class="card-sub card-value-display">
      <div class="card-value-container h-[16%]">
        <span :class="{'ml-[5%]': CardValueString==='10'}"
              :style="{fontSize: value >= 11?'35cqw':'45cqw'}"
              class="gloock card-value"
        >
          {{ CardValueString }}
        </span>
        <img :src="CardValueSuits[suit]" alt="Suit" class="card-suit">
      </div>
      <div class="card-value-container absolute bottom-0 right-0 m-[3.05%] h-[15.3%] rotate-180">
        <span :class="{'ml-[5%]': CardValueString==='10'}"
              :style="{fontSize: value >= 11?'35cqw':'45cqw'}"
              class="gloock card-value"
        >
          {{ CardValueString }}
        </span>
        <img :src="CardValueSuits[suit]" alt="Suit" class="card-suit">
      </div>
    </div>
    <div class="card-sub px-[12%] pb-[10.3%] pt-[7.4%] flex flex-col justify-between items-center">
      <img ref="topImage" alt="top" class="w-[66%]" src="">
      <div class="grow"/>
      <img ref="bottomImage" alt="bottom" class="w-[98%]" src="">
    </div>
    <div class="card-sub card-bg-mask">
      <div class="card-bg"/>
    </div>
    <slot name="front"/>
  </div>
</template>
<!--Card Logic-->
<script lang="ts" setup>
import ClubValueSuit from "@/assets/images/cards/Suits/Club/CardValue_Suit_Albedo.svg";
import HeartValueSuit from "@/assets/images/cards/Suits/Heart/CardValue_Suit_Albedo.svg";
import DiamondValueSuit from "@/assets/images/cards/Suits/Diamond/CardValue_Suit_Albedo.svg";
import SpadeValueSuit from "@/assets/images/cards/Suits/Spade/CardValue_Suit_Albedo.svg";
import {onMounted} from "vue";

const suits = ['Club', 'Diamond', 'Heart', 'Spade'];
const topImage = ref();
const bottomImage = ref();

const CardValueSuits = [ClubValueSuit, DiamondValueSuit, HeartValueSuit, SpadeValueSuit]

const props = defineProps({
  value: {
    type: Number,
    default: 1,
    required: false
  },
  suit: {
    type: Number,
    default: 2,
    required: false
  },
  animateBackground: {
    type: Boolean,
    default: false,
    required: false
  }
})

function setup() {
  const top = [0, 1, 2, 3, 2, 3, 4, 3, 4, 5]
  const bottom = [1, 1, 1, 1, 2, 2, 2, 3, 3, 3]
  import(`@/assets/images/cards/Suits/${suits[props.suit]}/Top${top[props.value - 1]}.svg`).then((module) => {
    if (topImage.value) topImage.value.src = module.default;
  })
  import(`@/assets/images/cards/Suits/${suits[props.suit]}/Bottom${bottom[props.value - 1]}.svg`).then((module) => {
    if (bottomImage.value) bottomImage.value.src = module.default;
  })
}

watch(() => props.suit, () => {
  setup()
}, {immediate: true})
watch(() => props.value, () => {
  setup()
}, {immediate: true})

onMounted(() => {
  setup()
})

const extra_values = ["J", "Q", "K", "", ""]

const CardValueString = computed(() => {
  if (2 <= props.value && props.value <= 10) return props.value.toString();
  if (props.value == 1) return "A";
  if (11 <= props.value && props.value <= 15) return extra_values[props.value - 11];
  return "?"
})
</script>
<!--Card's related exposed class styles-->
<style lang="postcss">
.card .card-sub {
  @apply w-full h-full absolute top-0 left-0 right-0 bottom-0;
}
</style>
<!--Card Local Style-->
<style lang="postcss" scoped>
.card {
  @apply shadow-xl overflow-hidden rounded-[2%] relative z-[20];
  aspect-ratio: 756/1051 !important;
  height: 100%;
  width: auto;
  background: url('@/assets/images/cards/CardBase.svg') no-repeat center center;
  background-size: cover;
}

.card-deco-stars {
  background: url('@/assets/images/cards/SideStars_Normal_Albedo.png') no-repeat center center;
  background-size: contain;
}

.card-value-display {
  @apply p-[3%] relative;
}

div.card-value-container {
  @apply flex flex-col justify-center items-center aspect-square gap-[10%];
  container-type: inline-size;
}

.card-suit {
  @apply text-[300%] w-[25%] h-[25%];
}

.card-value {
  @apply text-[calc(300%+1px)] leading-[55%] mt-[5%] tracking-wide;
}

.card-bg-mask {
  mask-image: url('@/assets/images/cards/BG_Mask.png');
  mask-size: contain;
}

.card-bg {
  @apply absolute top-0 left-0 w-full h-full rotate-[-15deg] bg-repeat;
  background-image: url('@/assets/images/cards/BG_Tile_Albedo.png');
  background-position: center 0;
  background-size: 41%;
  animation: 10s downward infinite linear;
}

@keyframes downward {
  from {
    background-position: center 0;
  }
  to {
    background-position: center 47%;
  }
}
</style>