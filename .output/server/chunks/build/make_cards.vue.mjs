import { useSSRContext } from 'vue';
import { _ as _export_sfc } from './server.mjs';
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
import 'vue-router';
import 'gsap';
import '@iconify/vue';
import 'vue/server-renderer';

const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(` make cards `);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/make_cards.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const make_cards = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { make_cards as default };
//# sourceMappingURL=make_cards.vue.mjs.map
