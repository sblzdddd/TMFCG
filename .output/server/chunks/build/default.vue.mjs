import { defineComponent, ref, provide, createElementBlock, watch, mergeProps, withCtx, unref, createVNode, toDisplayString, toRef, shallowRef, computed, watchEffect, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { g as genericComponent, p as propsFactory, d as provideTheme, h as useRtl, e as provideDefaults, j as convertToUnit, m as makeThemeProps, G as clamp, o as useProxiedModel, H as useToggleScope, _ as _export_sfc } from './server.mjs';
import { u as useRender, c as makeTagProps, m as makeComponentProps } from './resizeObserver.mjs';
import { l as VBtn, a as useBackgroundColor, v as useBorder, e as useElevation, f as useRounded, G as VImg, b as VDefaultsProvider, V as VExpandTransition, g as makeRoundedProps, i as makeElevationProps, x as makeBorderProps, z as VSpacer } from './VSpacer.mjs';
import { u as useLayoutItem, m as makeLayoutItemProps, V as VApp, a as VMain, _ as __nuxt_component_0$2 } from './VMain.mjs';
import { u as useSsrBoot } from './ssrBoot.mjs';
import { u as useUser, V as VTooltip, _ as __nuxt_component_1, c as _sfc_main$3, d as _sfc_main$4 } from './InfoEditDialog.vue.mjs';
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
import './v3.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'unhead/utils';
import 'devalue';
import 'unhead/plugins';
import 'socket.io-client';
import './index2.mjs';
import '@iconify/utils/lib/css/icon';

const clientOnlySymbol = Symbol.for("nuxt:client-only");
const __nuxt_component_0$1 = defineComponent({
  name: "ClientOnly",
  inheritAttrs: false,
  props: ["fallback", "placeholder", "placeholderTag", "fallbackTag"],
  setup(_, { slots, attrs }) {
    const mounted = ref(false);
    provide(clientOnlySymbol, true);
    return (props) => {
      var _a;
      if (mounted.value) {
        return (_a = slots.default) == null ? void 0 : _a.call(slots);
      }
      const slot = slots.fallback || slots.placeholder;
      if (slot) {
        return slot();
      }
      const fallbackStr = props.fallback || props.placeholder || "";
      const fallbackTag = props.fallbackTag || props.placeholderTag || "span";
      return createElementBlock(fallbackTag, attrs, fallbackStr);
    };
  }
});

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "State",
  __ssrInlineRender: true,
  setup(__props) {
    const { user, avatarUrl } = useUser();
    watch(() => user.value.avatar, (newValue) => {
      console.log("Avatar changed to:", newValue);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_0$1;
      const _component_User_InfoEditDialog = __nuxt_component_1;
      _push(ssrRenderComponent(VTooltip, mergeProps({
        text: "点击：编辑用户信息",
        location: "bottom"
      }, _attrs), {
        activator: withCtx(({ props }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VBtn, mergeProps({
              class: "px-1",
              variant: "text"
            }, props), {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_ClientOnly, null, {}, _parent3, _scopeId2));
                  _push3(`<div class="flex flex-col max-w-[150px] truncate justify-start items-start"${_scopeId2}><span class="ml-2 mb-0.5"${_scopeId2}>${ssrInterpolate(unref(user).name)}</span><span class="text-[0.45rem] text-gray-500 ml-2 mb-0.5 truncate"${_scopeId2}>${ssrInterpolate(unref(user).id)}</span></div>`);
                  _push3(ssrRenderComponent(_component_User_InfoEditDialog, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_ClientOnly, null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "rounded-lg w-8 h-8 border-[1.5px] border-primary overflow-hidden" }, [
                          createVNode("img", {
                            src: unref(avatarUrl),
                            alt: "avatar"
                          }, null, 8, ["src"])
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "flex flex-col max-w-[150px] truncate justify-start items-start" }, [
                      createVNode("span", { class: "ml-2 mb-0.5" }, toDisplayString(unref(user).name), 1),
                      createVNode("span", { class: "text-[0.45rem] text-gray-500 ml-2 mb-0.5 truncate" }, toDisplayString(unref(user).id), 1)
                    ]),
                    createVNode(_component_User_InfoEditDialog)
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VBtn, mergeProps({
                class: "px-1",
                variant: "text"
              }, props), {
                default: withCtx(() => [
                  createVNode(_component_ClientOnly, null, {
                    default: withCtx(() => [
                      createVNode("div", { class: "rounded-lg w-8 h-8 border-[1.5px] border-primary overflow-hidden" }, [
                        createVNode("img", {
                          src: unref(avatarUrl),
                          alt: "avatar"
                        }, null, 8, ["src"])
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode("div", { class: "flex flex-col max-w-[150px] truncate justify-start items-start" }, [
                    createVNode("span", { class: "ml-2 mb-0.5" }, toDisplayString(unref(user).name), 1),
                    createVNode("span", { class: "text-[0.45rem] text-gray-500 ml-2 mb-0.5 truncate" }, toDisplayString(unref(user).id), 1)
                  ]),
                  createVNode(_component_User_InfoEditDialog)
                ]),
                _: 2
              }, 1040)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});

const makeVToolbarTitleProps = propsFactory({
  text: String,
  ...makeComponentProps(),
  ...makeTagProps()
}, "VToolbarTitle");
const VToolbarTitle = genericComponent()({
  name: "VToolbarTitle",
  props: makeVToolbarTitleProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    useRender(() => {
      const hasText = !!(slots.default || slots.text || props.text);
      return createVNode(props.tag, {
        "class": ["v-toolbar-title", props.class],
        "style": props.style
      }, {
        default: () => {
          var _a;
          return [hasText && createVNode("div", {
            "class": "v-toolbar-title__placeholder"
          }, [slots.text ? slots.text() : props.text, (_a = slots.default) == null ? void 0 : _a.call(slots)])];
        }
      });
    });
    return {};
  }
});

const allowedDensities = [null, "prominent", "default", "comfortable", "compact"];
const makeVToolbarProps = propsFactory({
  absolute: Boolean,
  collapse: Boolean,
  color: String,
  density: {
    type: String,
    default: "default",
    validator: (v) => allowedDensities.includes(v)
  },
  extended: Boolean,
  extensionHeight: {
    type: [Number, String],
    default: 48
  },
  flat: Boolean,
  floating: Boolean,
  height: {
    type: [Number, String],
    default: 64
  },
  image: String,
  title: String,
  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeElevationProps(),
  ...makeRoundedProps(),
  ...makeTagProps({
    tag: "header"
  }),
  ...makeThemeProps()
}, "VToolbar");
const VToolbar = genericComponent()({
  name: "VToolbar",
  props: makeVToolbarProps(),
  setup(props, _ref) {
    var _a;
    let {
      slots
    } = _ref;
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(toRef(props, "color"));
    const {
      borderClasses
    } = useBorder(props);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      roundedClasses
    } = useRounded(props);
    const {
      themeClasses
    } = provideTheme(props);
    const {
      rtlClasses
    } = useRtl();
    const isExtended = shallowRef(!!(props.extended || ((_a = slots.extension) == null ? void 0 : _a.call(slots))));
    const contentHeight = computed(() => parseInt(Number(props.height) + (props.density === "prominent" ? Number(props.height) : 0) - (props.density === "comfortable" ? 8 : 0) - (props.density === "compact" ? 16 : 0), 10));
    const extensionHeight = computed(() => isExtended.value ? parseInt(Number(props.extensionHeight) + (props.density === "prominent" ? Number(props.extensionHeight) : 0) - (props.density === "comfortable" ? 4 : 0) - (props.density === "compact" ? 8 : 0), 10) : 0);
    provideDefaults({
      VBtn: {
        variant: "text"
      }
    });
    useRender(() => {
      var _a2;
      const hasTitle = !!(props.title || slots.title);
      const hasImage = !!(slots.image || props.image);
      const extension = (_a2 = slots.extension) == null ? void 0 : _a2.call(slots);
      isExtended.value = !!(props.extended || extension);
      return createVNode(props.tag, {
        "class": ["v-toolbar", {
          "v-toolbar--absolute": props.absolute,
          "v-toolbar--collapse": props.collapse,
          "v-toolbar--flat": props.flat,
          "v-toolbar--floating": props.floating,
          [`v-toolbar--density-${props.density}`]: true
        }, backgroundColorClasses.value, borderClasses.value, elevationClasses.value, roundedClasses.value, themeClasses.value, rtlClasses.value, props.class],
        "style": [backgroundColorStyles.value, props.style]
      }, {
        default: () => [hasImage && createVNode("div", {
          "key": "image",
          "class": "v-toolbar__image"
        }, [!slots.image ? createVNode(VImg, {
          "key": "image-img",
          "cover": true,
          "src": props.image
        }, null) : createVNode(VDefaultsProvider, {
          "key": "image-defaults",
          "disabled": !props.image,
          "defaults": {
            VImg: {
              cover: true,
              src: props.image
            }
          }
        }, slots.image)]), createVNode(VDefaultsProvider, {
          "defaults": {
            VTabs: {
              height: convertToUnit(contentHeight.value)
            }
          }
        }, {
          default: () => {
            var _a3, _b, _c;
            return [createVNode("div", {
              "class": "v-toolbar__content",
              "style": {
                height: convertToUnit(contentHeight.value)
              }
            }, [slots.prepend && createVNode("div", {
              "class": "v-toolbar__prepend"
            }, [(_a3 = slots.prepend) == null ? void 0 : _a3.call(slots)]), hasTitle && createVNode(VToolbarTitle, {
              "key": "title",
              "text": props.title
            }, {
              text: slots.title
            }), (_b = slots.default) == null ? void 0 : _b.call(slots), slots.append && createVNode("div", {
              "class": "v-toolbar__append"
            }, [(_c = slots.append) == null ? void 0 : _c.call(slots)])])];
          }
        }), createVNode(VDefaultsProvider, {
          "defaults": {
            VTabs: {
              height: convertToUnit(extensionHeight.value)
            }
          }
        }, {
          default: () => [createVNode(VExpandTransition, null, {
            default: () => [isExtended.value && createVNode("div", {
              "class": "v-toolbar__extension",
              "style": {
                height: convertToUnit(extensionHeight.value)
              }
            }, [extension])]
          })]
        })]
      });
    });
    return {
      contentHeight,
      extensionHeight
    };
  }
});

const makeScrollProps = propsFactory({
  scrollTarget: {
    type: String
  },
  scrollThreshold: {
    type: [String, Number],
    default: 300
  }
}, "scroll");
function useScroll(props) {
  let args = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  const {
    canScroll
  } = args;
  let previousScroll = 0;
  let previousScrollHeight = 0;
  const target = ref(null);
  const currentScroll = shallowRef(0);
  const savedScroll = shallowRef(0);
  const currentThreshold = shallowRef(0);
  const isScrollActive = shallowRef(false);
  const isScrollingUp = shallowRef(false);
  const scrollThreshold = computed(() => {
    return Number(props.scrollThreshold);
  });
  const scrollRatio = computed(() => {
    return clamp((scrollThreshold.value - currentScroll.value) / scrollThreshold.value || 0);
  });
  const onScroll = () => {
    const targetEl = target.value;
    if (!targetEl || canScroll && !canScroll.value) return;
    previousScroll = currentScroll.value;
    currentScroll.value = "window" in targetEl ? targetEl.pageYOffset : targetEl.scrollTop;
    const currentScrollHeight = targetEl instanceof Window ? (void 0).documentElement.scrollHeight : targetEl.scrollHeight;
    if (previousScrollHeight !== currentScrollHeight) {
      previousScrollHeight = currentScrollHeight;
      return;
    }
    isScrollingUp.value = currentScroll.value < previousScroll;
    currentThreshold.value = Math.abs(currentScroll.value - scrollThreshold.value);
  };
  watch(isScrollingUp, () => {
    savedScroll.value = savedScroll.value || currentScroll.value;
  });
  watch(isScrollActive, () => {
    savedScroll.value = 0;
  });
  canScroll && watch(canScroll, onScroll, {
    immediate: true
  });
  return {
    scrollThreshold,
    currentScroll,
    currentThreshold,
    isScrollActive,
    scrollRatio,
    // required only for testing
    // probably can be removed
    // later (2 chars chlng)
    isScrollingUp,
    savedScroll
  };
}

const makeVAppBarProps = propsFactory({
  scrollBehavior: String,
  modelValue: {
    type: Boolean,
    default: true
  },
  location: {
    type: String,
    default: "top",
    validator: (value) => ["top", "bottom"].includes(value)
  },
  ...makeVToolbarProps(),
  ...makeLayoutItemProps(),
  ...makeScrollProps(),
  height: {
    type: [Number, String],
    default: 64
  }
}, "VAppBar");
const VAppBar = genericComponent()({
  name: "VAppBar",
  props: makeVAppBarProps(),
  emits: {
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const vToolbarRef = ref();
    const isActive = useProxiedModel(props, "modelValue");
    const scrollBehavior = computed(() => {
      var _a;
      const behavior = new Set(((_a = props.scrollBehavior) == null ? void 0 : _a.split(" ")) ?? []);
      return {
        hide: behavior.has("hide"),
        fullyHide: behavior.has("fully-hide"),
        inverted: behavior.has("inverted"),
        collapse: behavior.has("collapse"),
        elevate: behavior.has("elevate"),
        fadeImage: behavior.has("fade-image")
        // shrink: behavior.has('shrink'),
      };
    });
    const canScroll = computed(() => {
      const behavior = scrollBehavior.value;
      return behavior.hide || behavior.fullyHide || behavior.inverted || behavior.collapse || behavior.elevate || behavior.fadeImage || // behavior.shrink ||
      !isActive.value;
    });
    const {
      currentScroll,
      scrollThreshold,
      isScrollingUp,
      scrollRatio
    } = useScroll(props, {
      canScroll
    });
    const canHide = computed(() => scrollBehavior.value.hide || scrollBehavior.value.fullyHide);
    const isCollapsed = computed(() => props.collapse || scrollBehavior.value.collapse && (scrollBehavior.value.inverted ? scrollRatio.value > 0 : scrollRatio.value === 0));
    const isFlat = computed(() => props.flat || scrollBehavior.value.fullyHide && !isActive.value || scrollBehavior.value.elevate && (scrollBehavior.value.inverted ? currentScroll.value > 0 : currentScroll.value === 0));
    const opacity = computed(() => scrollBehavior.value.fadeImage ? scrollBehavior.value.inverted ? 1 - scrollRatio.value : scrollRatio.value : void 0);
    const height = computed(() => {
      var _a, _b;
      if (scrollBehavior.value.hide && scrollBehavior.value.inverted) return 0;
      const height2 = ((_a = vToolbarRef.value) == null ? void 0 : _a.contentHeight) ?? 0;
      const extensionHeight = ((_b = vToolbarRef.value) == null ? void 0 : _b.extensionHeight) ?? 0;
      if (!canHide.value) return height2 + extensionHeight;
      return currentScroll.value < scrollThreshold.value || scrollBehavior.value.fullyHide ? height2 + extensionHeight : height2;
    });
    useToggleScope(computed(() => !!props.scrollBehavior), () => {
      watchEffect(() => {
        if (canHide.value) {
          if (scrollBehavior.value.inverted) {
            isActive.value = currentScroll.value > scrollThreshold.value;
          } else {
            isActive.value = isScrollingUp.value || currentScroll.value < scrollThreshold.value;
          }
        } else {
          isActive.value = true;
        }
      });
    });
    const {
      ssrBootStyles
    } = useSsrBoot();
    const {
      layoutItemStyles
    } = useLayoutItem({
      id: props.name,
      order: computed(() => parseInt(props.order, 10)),
      position: toRef(props, "location"),
      layoutSize: height,
      elementSize: shallowRef(void 0),
      active: isActive,
      absolute: toRef(props, "absolute")
    });
    useRender(() => {
      const toolbarProps = VToolbar.filterProps(props);
      return createVNode(VToolbar, mergeProps({
        "ref": vToolbarRef,
        "class": ["v-app-bar", {
          "v-app-bar--bottom": props.location === "bottom"
        }, props.class],
        "style": [{
          ...layoutItemStyles.value,
          "--v-toolbar-image-opacity": opacity.value,
          height: void 0,
          ...ssrBootStyles.value
        }, props.style]
      }, toolbarProps, {
        "collapse": isCollapsed.value,
        "flat": isFlat.value
      }), slots);
    });
    return {};
  }
});

const _sfc_main$1 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_nuxt_img = _sfc_main$3;
  const _component_Common_ConnectionStatus = _sfc_main$4;
  const _component_User_State = _sfc_main$2;
  _push(ssrRenderComponent(VAppBar, mergeProps({
    elevation: 0,
    class: "!border-b-[1px] !border-gray-600/60",
    height: "54"
  }, _attrs), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="app-bar" data-v-50f70815${_scopeId}>`);
        _push2(ssrRenderComponent(VBtn, {
          active: false,
          exact: false,
          class: "mr-0 !h-12",
          to: "/",
          variant: "text"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_nuxt_img, {
                alt: "site-icon",
                height: "28",
                src: "/site_icon.svg",
                width: "28"
              }, null, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_nuxt_img, {
                  alt: "site-icon",
                  height: "28",
                  src: "/site_icon.svg",
                  width: "28"
                })
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(VBtn, { to: "/" }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` 起点 `);
            } else {
              return [
                createTextVNode(" 起点 ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(VBtn, { to: "/cards_wiki" }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` 卡牌 `);
            } else {
              return [
                createTextVNode(" 卡牌 ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(VBtn, { to: "/make_cards" }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` 制作牌组 `);
            } else {
              return [
                createTextVNode(" 制作牌组 ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(VSpacer, null, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_Common_ConnectionStatus, null, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_User_State, null, null, _parent2, _scopeId));
        _push2(`</div>`);
      } else {
        return [
          createVNode("div", { class: "app-bar" }, [
            createVNode(VBtn, {
              active: false,
              exact: false,
              class: "mr-0 !h-12",
              to: "/",
              variant: "text"
            }, {
              default: withCtx(() => [
                createVNode(_component_nuxt_img, {
                  alt: "site-icon",
                  height: "28",
                  src: "/site_icon.svg",
                  width: "28"
                })
              ]),
              _: 1
            }),
            createVNode(VBtn, { to: "/" }, {
              default: withCtx(() => [
                createTextVNode(" 起点 ")
              ]),
              _: 1
            }),
            createVNode(VBtn, { to: "/cards_wiki" }, {
              default: withCtx(() => [
                createTextVNode(" 卡牌 ")
              ]),
              _: 1
            }),
            createVNode(VBtn, { to: "/make_cards" }, {
              default: withCtx(() => [
                createTextVNode(" 制作牌组 ")
              ]),
              _: 1
            }),
            createVNode(VSpacer),
            createVNode(_component_Common_ConnectionStatus),
            createVNode(_component_User_State)
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Header/NavBar.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-50f70815"]]);

const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "DefaultLayout"
  },
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Header_NavBar = __nuxt_component_0;
      const _component_NuxtPage = __nuxt_component_0$2;
      _push(ssrRenderComponent(VApp, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Header_NavBar, null, null, _parent2, _scopeId));
            _push2(`<div class="decorations absolute top-0 left-0 right-0 w-full h-full flex pointer-events-none"${_scopeId}><div class="decoration"${_scopeId}></div><div class="grow"${_scopeId}></div><div class="decoration"${_scopeId}></div></div>`);
            _push2(ssrRenderComponent(VMain, { style: { "padding-top": "54px" } }, {
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
              createVNode(_component_Header_NavBar),
              createVNode("div", { class: "decorations absolute top-0 left-0 right-0 w-full h-full flex pointer-events-none" }, [
                createVNode("div", { class: "decoration" }),
                createVNode("div", { class: "grow" }),
                createVNode("div", { class: "decoration" })
              ]),
              createVNode(VMain, { style: { "padding-top": "54px" } }, {
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
    };
  }
});

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=default.vue.mjs.map
