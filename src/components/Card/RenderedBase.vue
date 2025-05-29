<!--Card Layout-->
<template>
  <div class="card" v-bind="$attrs">
    <div class="card-sub card-back" />
    <div class="card-sub card-front" :style="{backgroundImage: `url(${cardImage})`}">
      <slot name="front"/>
    </div>
  </div>
</template>
<!--Card Logic-->
<script lang="ts" setup>
import {onMounted} from "vue";

const cardImage = ref<string>('')

const props = defineProps({
  number: {
    type: Number,
    default: 0,
    required: false
  },
  suit: {
    type: Number,
    default: 0,
    required: false
  },
})

function setup() {
  import(`@/assets/images/cards/Rendered/${props.suit}_${props.number}.png`).then((module) => {
    cardImage.value = module.default;
  })
}

watch(() => props.suit, () => {
  setup()
}, {immediate: true})
watch(() => props.number, () => {
  setup()
}, {immediate: true})

onMounted(() => {
  setup()
})
</script>
<!--Card's related exposed class styles-->
<style lang="postcss">
.card .card-sub {
  @apply w-full h-full absolute top-0 left-0 right-0 bottom-0;
  user-select: none;
}
</style>
<!--Card Local Style-->
<style lang="postcss" scoped>
.card {
  @apply relative z-[20];
  aspect-ratio: 756/1051 !important;
  height: 100%;
  width: auto;
  user-select: none;
  backface-visibility: hidden;
}

.card-front {
  @apply overflow-hidden rounded-[3%];
  box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.1);
  border: 1px solid #36140899;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  backface-visibility: hidden;
}

.card-back {
  @apply bg-[url('@/assets/images/cards/CardBack2.png')] bg-no-repeat bg-center bg-cover;
  backface-visibility: hidden;
  transform: rotateY(180deg);
}

</style>
