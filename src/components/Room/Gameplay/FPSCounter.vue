<script lang="ts" setup>
import {useLoop} from '@tresjs/core'

const props = defineProps({
  fpsGraph: {
    type: Object,
    required: true
  }
})

const {onBeforeRender, onAfterRender} = useLoop()

onBeforeRender(() => {
  props.fpsGraph.begin();
})

onAfterRender(() => {
  props.fpsGraph.end();
})
</script>
<template>
  <TresMesh/>
</template>