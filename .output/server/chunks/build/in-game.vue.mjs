import { V as VApp, a as VMain, _ as __nuxt_component_0 } from './VMain.mjs';
import { withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
import 'vue-router';
import './resizeObserver.mjs';
import './ssrBoot.mjs';
import '../_/nitro.mjs';
import 'node:crypto';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:async_hooks';
import 'engine.io';
import 'socket.io';
import 'node:fs';
import 'node:url';
import '@iconify/utils';
import 'consola';
import 'ipx';
import 'node:path';
import 'gsap';
import '@iconify/vue';

const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_NuxtPage = __nuxt_component_0;
  _push(ssrRenderComponent(VApp, _attrs, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(VMain, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_NuxtPage, null, null, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_NuxtPage)
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(VMain, null, {
            default: withCtx(() => [
              createVNode(_component_NuxtPage)
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/in-game.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const inGame = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { inGame as default };
//# sourceMappingURL=in-game.vue.mjs.map
