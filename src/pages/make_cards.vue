<script lang="ts" setup>
import {cardEditModel} from "@/utils/card_edit";
import {LoadingState} from "@/utils/loading";

const cardValues = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]

onMounted(() => {
  LoadingState.isLoading = false;
})
</script>

<template>
  <div class="page-root">
    <div class="grow flex flex-col">
      <h5 class="my-8">制作牌组</h5>
      <Card-EditForm/>
    </div>
    <div class="h-full py-14 pl-14">
      <Card-Addons-HoverRotationWrapper>
        <template #default="{ rx, ry }">
          <Card-Base 
            :style="`--rotate-x: ${rx}deg;--rotate-y: ${ry}deg;`"
            :suit="cardEditModel.suit"
            :value="cardValues.findIndex((val) => val === cardEditModel.number) + 1"
          >
            <template #backdrop>
              <Card-Addons-LaserEffect :rx="rx" :ry="ry"/>
            </template>
            <template #front>
              <Card-Addons-CharacterEdit
                :char-name="cardEditModel.character" 
                :char-variant="cardEditModel.characterVariant"
                :offset-x="cardEditModel.characterX" 
                :offset-y="cardEditModel.characterY"
              />
              <Card-Addons-LightEffect :rx="rx" :ry="ry"/>
            </template>
          </Card-Base>
        </template>
      </Card-Addons-HoverRotationWrapper>
    </div>
  </div>
</template>
<style lang="postcss">
button[role="tab"] span.truncate {
  @apply text-xl mb-1;
}

</style>