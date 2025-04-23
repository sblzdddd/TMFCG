<script lang="ts" setup>
import {LoadingState} from "@/utils/loading";

definePageMeta({
  layout: 'fullscreen',
})

const {cardEditModel} = useCardEditor();

onMounted(() => {
  LoadingState.isLoading = false;
})
</script>

<template>
  <div class="flex flex-col h-full">
    <Header-EditorTitleBar/>
    <div class="flex px-10 pt-4 w-full h-full">
      <div class="grow flex flex-col">
        <Form-CardEdit/>
      </div>
      <div class="h-full py-14 pl-14">
        <Card-Addons-HoverRotationWrapper>
          <template #default="{ rx, ry }">
            <Card-Base
                :number="cardEditModel.number"
                :style="`--rotate-x: ${rx}deg;--rotate-y: ${ry}deg;`"
                :suit="cardEditModel.suit"
            >
              <template #backdrop>
                <Card-Addons-LaserEffect :rx="rx" :ry="ry"/>
              </template>
              <template #front>
                <Card-Addons-CharacterEdit
                    :char-name="cardEditModel.appearance.character"
                    :char-variant="cardEditModel.appearance.characterVariant"
                    :offset-x="cardEditModel.appearance.characterX"
                    :offset-y="cardEditModel.appearance.characterY"
                />
                <Card-Addons-LightEffect :rx="rx" :ry="ry"/>
              </template>
            </Card-Base>
          </template>
        </Card-Addons-HoverRotationWrapper>
      </div>
    </div>
  </div>
</template>
<style lang="postcss">
button[role="tab"] span.truncate {
  @apply text-xl mb-1;
}

</style>