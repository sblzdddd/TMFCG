<template>
  <Card-Addons-Character
      :char-name="character"
      :char-variant="characterVariant"
      :offset-x="characterX"
      :offset-y="characterY"
  />
</template>
<script lang="ts" setup>

const props = defineProps({
  cardSuitValue: {
    type: Object as () => CardSuitValue,
    required: true,
  },
});
</script>