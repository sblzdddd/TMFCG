<script lang="ts" setup>
import {TresCanvas} from '@tresjs/core'
import {Pane} from 'tweakpane';
import * as TweakpaneEssentialsPlugin from '@tweakpane/plugin-essentials';
import {addRenderParams, RenderParams} from './RenderParams';


let pane: any = null;
let fpsGraph: any = null;
const cameraRef = ref<any>(null);

onMounted(() => {
  if (!import.meta.client) return;

  pane = new Pane({title: 'Game Scene'});
  pane.registerPlugin(TweakpaneEssentialsPlugin);
  addRenderParams(pane);
  pane.addButton({
    title: 'Reset Camera',
  }).on('click', () => {
    cameraRef.value.position.set(0, 20, 0);
    cameraRef.value.lookAt(0, 0, 0);
  });
  fpsGraph = pane.addBlade({
    max: 260,
    view: 'fpsgraph',
    rows: 3,
    interval: 50,
  });
});

onBeforeUnmount(() => {
  pane?.dispose();
});
</script>

<template>
  <TresCanvas
      :alpha="RenderParams.alpha"
      :clearColor="RenderParams.clearColor"
      :output-color-space="RenderParams.outputColorSpace"
      :shadow-map-type="RenderParams.shadowMapType"
      :shadows="RenderParams.shadow"
      :tone-mapping="RenderParams.toneMapping"
      window-size
  >
    <Room-Gameplay-FPSCounter :fpsGraph="fpsGraph"/>
    <OrbitControls/>
    <TresPerspectiveCamera ref="cameraRef" :aspect="1" :far="1000" :fov="45" :look-at="[0, 0, 0]" :near="0.1"
                           :position="[0, 20, 0]"/>
    <TresMesh :position="[-2, 2, 0]" :rotation="[0, Math.PI, 0]">
      <TresConeGeometry :args="[1, 1.5, 3]"/>
      <TresMeshToonMaterial color="#82DBC5"/>
    </TresMesh>
    <TresMesh ref="boxRef" :position="[0, 0, 0]" cast-shadow>
      <TresBoxGeometry :args="[1.5, 1.5, 1.5]"/>
      <TresMeshToonMaterial color="#4F4F4F"/>
    </TresMesh>
    <TresMesh :position="[2, -2, 0]" cast-shadow>
      <TresSphereGeometry/>
      <TresMeshToonMaterial color="#FBB03B"/>
    </TresMesh>

    <TresMesh :position="[0, -3, 0]" :rotation="[-Math.PI / 2, 0, 0]" receive-shadow>
      <TresPlaneGeometry :args="[50, 20, 10, 10]"/>
      <TresMeshStandardMaterial color="#fef6ec"/>
    </TresMesh>

    <TresAmbientLight :intensity="1"/>
    <TresDirectionalLight :intensity="2" :position="[0, 2, 0]" cast-shadow/>
  </TresCanvas>
</template>