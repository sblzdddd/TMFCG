import __nuxt_component_2 from './index2.mjs';
import { inject, createVNode, withDirectives, vShow, computed, resolveDirective, provide, toRef, ref, shallowRef, watch, nextTick, onScopeDispose, mergeProps, Fragment, defineComponent as defineComponent$1, unref, isRef, withCtx, createTextVNode, toDisplayString, createBlock, openBlock, renderList, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { g as genericComponent, p as propsFactory, I as IconValue, d as provideTheme, e as provideDefaults, m as makeThemeProps, f as pick, k as keys, h as useRtl, i as useLocale, j as convertToUnit, l as deepEqual, o as useProxiedModel, q as getUid, s as filterInputAttrs, w as wrapInArray, t as matchesSelector, v as omit, x as defineComponent, E as EventProp, y as focusChild, z as getPropertyFromItem, A as isPrimitive, u as useRouter, _ as _export_sfc } from './server.mjs';
import { u as useLazy, m as makeLazyProps, V as VExpandTransition, R as Ripple, a as useBackgroundColor, b as VDefaultsProvider, c as VIcon, d as useGroupItem, e as useElevation, f as useRounded, g as makeRoundedProps, h as makeGroupItemProps, i as makeElevationProps, j as useGroup, k as makeGroupProps, l as VBtn, M as MaybeTransition, n as makeDensityProps, o as VLabel, p as useDensity, q as useTextColor, r as useFocus, s as makeVInputProps, t as VInput, v as useBorder, w as makeVariantProps, x as makeBorderProps, y as useRoom, z as VSpacer } from './VSpacer.mjs';
import { u as useRender, m as makeComponentProps, a as makeDimensionProps, b as useDimension, c as makeTagProps } from './resizeObserver.mjs';
import { u as useSsrBoot } from './ssrBoot.mjs';
import { u as useNestedItem, a as useList, b as useNestedGroupActivator, c as createList, V as VListItem, d as useNested, m as makeNestedProps, e as VListItemTitle, f as VListItemSubtitle } from './VListItem.mjs';
import '@iconify/utils/lib/css/icon';
import '@iconify/vue';
import './v3.mjs';
import '../routes/renderer.mjs';
import 'node:async_hooks';
import 'vue-bundle-renderer/runtime';
import '../_/nitro.mjs';
import 'node:crypto';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'engine.io';
import 'socket.io';
import 'node:fs';
import 'node:url';
import '@iconify/utils';
import 'consola';
import 'ipx';
import 'node:path';
import 'unhead/server';
import 'unhead/utils';
import 'devalue';
import 'unhead/plugins';
import 'vue-router';
import 'gsap';

const VExpansionPanelSymbol = Symbol.for("vuetify:v-expansion-panel");

const makeVExpansionPanelTextProps = propsFactory({
  ...makeComponentProps(),
  ...makeLazyProps()
}, "VExpansionPanelText");
const VExpansionPanelText = genericComponent()({
  name: "VExpansionPanelText",
  props: makeVExpansionPanelTextProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const expansionPanel = inject(VExpansionPanelSymbol);
    if (!expansionPanel) throw new Error("[Vuetify] v-expansion-panel-text needs to be placed inside v-expansion-panel");
    const {
      hasContent,
      onAfterLeave
    } = useLazy(props, expansionPanel.isSelected);
    useRender(() => createVNode(VExpandTransition, {
      "onAfterLeave": onAfterLeave
    }, {
      default: () => {
        var _a;
        return [withDirectives(createVNode("div", {
          "class": ["v-expansion-panel-text", props.class],
          "style": props.style
        }, [slots.default && hasContent.value && createVNode("div", {
          "class": "v-expansion-panel-text__wrapper"
        }, [(_a = slots.default) == null ? void 0 : _a.call(slots)])]), [[vShow, expansionPanel.isSelected.value]])];
      }
    }));
    return {};
  }
});

const makeVExpansionPanelTitleProps = propsFactory({
  color: String,
  expandIcon: {
    type: IconValue,
    default: "$expand"
  },
  collapseIcon: {
    type: IconValue,
    default: "$collapse"
  },
  hideActions: Boolean,
  focusable: Boolean,
  static: Boolean,
  ripple: {
    type: [Boolean, Object],
    default: false
  },
  readonly: Boolean,
  ...makeComponentProps(),
  ...makeDimensionProps()
}, "VExpansionPanelTitle");
const VExpansionPanelTitle = genericComponent()({
  name: "VExpansionPanelTitle",
  directives: {
    Ripple
  },
  props: makeVExpansionPanelTitleProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const expansionPanel = inject(VExpansionPanelSymbol);
    if (!expansionPanel) throw new Error("[Vuetify] v-expansion-panel-title needs to be placed inside v-expansion-panel");
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(props, "color");
    const {
      dimensionStyles
    } = useDimension(props);
    const slotProps = computed(() => ({
      collapseIcon: props.collapseIcon,
      disabled: expansionPanel.disabled.value,
      expanded: expansionPanel.isSelected.value,
      expandIcon: props.expandIcon,
      readonly: props.readonly
    }));
    const icon = computed(() => expansionPanel.isSelected.value ? props.collapseIcon : props.expandIcon);
    useRender(() => {
      var _a;
      return withDirectives(createVNode("button", {
        "class": ["v-expansion-panel-title", {
          "v-expansion-panel-title--active": expansionPanel.isSelected.value,
          "v-expansion-panel-title--focusable": props.focusable,
          "v-expansion-panel-title--static": props.static
        }, backgroundColorClasses.value, props.class],
        "style": [backgroundColorStyles.value, dimensionStyles.value, props.style],
        "type": "button",
        "tabindex": expansionPanel.disabled.value ? -1 : void 0,
        "disabled": expansionPanel.disabled.value,
        "aria-expanded": expansionPanel.isSelected.value,
        "onClick": !props.readonly ? expansionPanel.toggle : void 0
      }, [createVNode("span", {
        "class": "v-expansion-panel-title__overlay"
      }, null), (_a = slots.default) == null ? void 0 : _a.call(slots, slotProps.value), !props.hideActions && createVNode(VDefaultsProvider, {
        "defaults": {
          VIcon: {
            icon: icon.value
          }
        }
      }, {
        default: () => {
          var _a2;
          return [createVNode("span", {
            "class": "v-expansion-panel-title__icon"
          }, [((_a2 = slots.actions) == null ? void 0 : _a2.call(slots, slotProps.value)) ?? createVNode(VIcon, null, null)])];
        }
      })]), [[resolveDirective("ripple"), props.ripple]]);
    });
    return {};
  }
});

const makeVExpansionPanelProps = propsFactory({
  title: String,
  text: String,
  bgColor: String,
  ...makeElevationProps(),
  ...makeGroupItemProps(),
  ...makeRoundedProps(),
  ...makeTagProps(),
  ...makeVExpansionPanelTitleProps(),
  ...makeVExpansionPanelTextProps()
}, "VExpansionPanel");
const VExpansionPanel = genericComponent()({
  name: "VExpansionPanel",
  props: makeVExpansionPanelProps(),
  emits: {
    "group:selected": (val) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const groupItem = useGroupItem(props, VExpansionPanelSymbol);
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(props, "bgColor");
    const {
      elevationClasses
    } = useElevation(props);
    const {
      roundedClasses
    } = useRounded(props);
    const isDisabled = computed(() => (groupItem == null ? void 0 : groupItem.disabled.value) || props.disabled);
    const selectedIndices = computed(() => groupItem.group.items.value.reduce((arr, item, index) => {
      if (groupItem.group.selected.value.includes(item.id)) arr.push(index);
      return arr;
    }, []));
    const isBeforeSelected = computed(() => {
      const index = groupItem.group.items.value.findIndex((item) => item.id === groupItem.id);
      return !groupItem.isSelected.value && selectedIndices.value.some((selectedIndex) => selectedIndex - index === 1);
    });
    const isAfterSelected = computed(() => {
      const index = groupItem.group.items.value.findIndex((item) => item.id === groupItem.id);
      return !groupItem.isSelected.value && selectedIndices.value.some((selectedIndex) => selectedIndex - index === -1);
    });
    provide(VExpansionPanelSymbol, groupItem);
    useRender(() => {
      const hasText = !!(slots.text || props.text);
      const hasTitle = !!(slots.title || props.title);
      const expansionPanelTitleProps = VExpansionPanelTitle.filterProps(props);
      const expansionPanelTextProps = VExpansionPanelText.filterProps(props);
      return createVNode(props.tag, {
        "class": ["v-expansion-panel", {
          "v-expansion-panel--active": groupItem.isSelected.value,
          "v-expansion-panel--before-active": isBeforeSelected.value,
          "v-expansion-panel--after-active": isAfterSelected.value,
          "v-expansion-panel--disabled": isDisabled.value
        }, roundedClasses.value, backgroundColorClasses.value, props.class],
        "style": [backgroundColorStyles.value, props.style]
      }, {
        default: () => [createVNode("div", {
          "class": ["v-expansion-panel__shadow", ...elevationClasses.value]
        }, null), createVNode(VDefaultsProvider, {
          "defaults": {
            VExpansionPanelTitle: {
              ...expansionPanelTitleProps
            },
            VExpansionPanelText: {
              ...expansionPanelTextProps
            }
          }
        }, {
          default: () => {
            var _a;
            return [hasTitle && createVNode(VExpansionPanelTitle, {
              "key": "title"
            }, {
              default: () => [slots.title ? slots.title() : props.title]
            }), hasText && createVNode(VExpansionPanelText, {
              "key": "text"
            }, {
              default: () => [slots.text ? slots.text() : props.text]
            }), (_a = slots.default) == null ? void 0 : _a.call(slots)];
          }
        })]
      });
    });
    return {
      groupItem
    };
  }
});

const allowedVariants = ["default", "accordion", "inset", "popout"];
const makeVExpansionPanelsProps = propsFactory({
  flat: Boolean,
  ...makeGroupProps(),
  ...pick(makeVExpansionPanelProps(), ["bgColor", "collapseIcon", "color", "eager", "elevation", "expandIcon", "focusable", "hideActions", "readonly", "ripple", "rounded", "tile", "static"]),
  ...makeThemeProps(),
  ...makeComponentProps(),
  ...makeTagProps(),
  variant: {
    type: String,
    default: "default",
    validator: (v) => allowedVariants.includes(v)
  }
}, "VExpansionPanels");
const VExpansionPanels = genericComponent()({
  name: "VExpansionPanels",
  props: makeVExpansionPanelsProps(),
  emits: {
    "update:modelValue": (val) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      next,
      prev
    } = useGroup(props, VExpansionPanelSymbol);
    const {
      themeClasses
    } = provideTheme(props);
    const variantClass = computed(() => props.variant && `v-expansion-panels--variant-${props.variant}`);
    provideDefaults({
      VExpansionPanel: {
        bgColor: toRef(props, "bgColor"),
        collapseIcon: toRef(props, "collapseIcon"),
        color: toRef(props, "color"),
        eager: toRef(props, "eager"),
        elevation: toRef(props, "elevation"),
        expandIcon: toRef(props, "expandIcon"),
        focusable: toRef(props, "focusable"),
        hideActions: toRef(props, "hideActions"),
        readonly: toRef(props, "readonly"),
        ripple: toRef(props, "ripple"),
        rounded: toRef(props, "rounded"),
        static: toRef(props, "static")
      }
    });
    useRender(() => createVNode(props.tag, {
      "class": ["v-expansion-panels", {
        "v-expansion-panels--flat": props.flat,
        "v-expansion-panels--tile": props.tile
      }, themeClasses.value, variantClass.value, props.class],
      "style": props.style
    }, {
      default: () => {
        var _a;
        return [(_a = slots.default) == null ? void 0 : _a.call(slots, {
          prev,
          next
        })];
      }
    }));
    return {
      next,
      prev
    };
  }
});

const handleGesture = (wrapper) => {
  const {
    touchstartX,
    touchendX,
    touchstartY,
    touchendY
  } = wrapper;
  const dirRatio = 0.5;
  const minDistance = 16;
  wrapper.offsetX = touchendX - touchstartX;
  wrapper.offsetY = touchendY - touchstartY;
  if (Math.abs(wrapper.offsetY) < dirRatio * Math.abs(wrapper.offsetX)) {
    wrapper.left && touchendX < touchstartX - minDistance && wrapper.left(wrapper);
    wrapper.right && touchendX > touchstartX + minDistance && wrapper.right(wrapper);
  }
  if (Math.abs(wrapper.offsetX) < dirRatio * Math.abs(wrapper.offsetY)) {
    wrapper.up && touchendY < touchstartY - minDistance && wrapper.up(wrapper);
    wrapper.down && touchendY > touchstartY + minDistance && wrapper.down(wrapper);
  }
};
function touchstart(event, wrapper) {
  var _a;
  const touch = event.changedTouches[0];
  wrapper.touchstartX = touch.clientX;
  wrapper.touchstartY = touch.clientY;
  (_a = wrapper.start) == null ? void 0 : _a.call(wrapper, {
    originalEvent: event,
    ...wrapper
  });
}
function touchend(event, wrapper) {
  var _a;
  const touch = event.changedTouches[0];
  wrapper.touchendX = touch.clientX;
  wrapper.touchendY = touch.clientY;
  (_a = wrapper.end) == null ? void 0 : _a.call(wrapper, {
    originalEvent: event,
    ...wrapper
  });
  handleGesture(wrapper);
}
function touchmove(event, wrapper) {
  var _a;
  const touch = event.changedTouches[0];
  wrapper.touchmoveX = touch.clientX;
  wrapper.touchmoveY = touch.clientY;
  (_a = wrapper.move) == null ? void 0 : _a.call(wrapper, {
    originalEvent: event,
    ...wrapper
  });
}
function createHandlers() {
  let value = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  const wrapper = {
    touchstartX: 0,
    touchstartY: 0,
    touchendX: 0,
    touchendY: 0,
    touchmoveX: 0,
    touchmoveY: 0,
    offsetX: 0,
    offsetY: 0,
    left: value.left,
    right: value.right,
    up: value.up,
    down: value.down,
    start: value.start,
    move: value.move,
    end: value.end
  };
  return {
    touchstart: (e) => touchstart(e, wrapper),
    touchend: (e) => touchend(e, wrapper),
    touchmove: (e) => touchmove(e, wrapper)
  };
}
function mounted(el, binding) {
  var _a;
  const value = binding.value;
  const target = (value == null ? void 0 : value.parent) ? el.parentElement : el;
  const options = (value == null ? void 0 : value.options) ?? {
    passive: true
  };
  const uid = (_a = binding.instance) == null ? void 0 : _a.$.uid;
  if (!target || !uid) return;
  const handlers = createHandlers(binding.value);
  target._touchHandlers = target._touchHandlers ?? /* @__PURE__ */ Object.create(null);
  target._touchHandlers[uid] = handlers;
  keys(handlers).forEach((eventName) => {
    target.addEventListener(eventName, handlers[eventName], options);
  });
}
function unmounted(el, binding) {
  var _a, _b;
  const target = ((_a = binding.value) == null ? void 0 : _a.parent) ? el.parentElement : el;
  const uid = (_b = binding.instance) == null ? void 0 : _b.$.uid;
  if (!(target == null ? void 0 : target._touchHandlers) || !uid) return;
  const handlers = target._touchHandlers[uid];
  keys(handlers).forEach((eventName) => {
    target.removeEventListener(eventName, handlers[eventName]);
  });
  delete target._touchHandlers[uid];
}
const Touch = {
  mounted,
  unmounted
};

const VWindowSymbol = Symbol.for("vuetify:v-window");
const VWindowGroupSymbol = Symbol.for("vuetify:v-window-group");
const makeVWindowProps = propsFactory({
  continuous: Boolean,
  nextIcon: {
    type: [Boolean, String, Function, Object],
    default: "$next"
  },
  prevIcon: {
    type: [Boolean, String, Function, Object],
    default: "$prev"
  },
  reverse: Boolean,
  showArrows: {
    type: [Boolean, String],
    validator: (v) => typeof v === "boolean" || v === "hover"
  },
  touch: {
    type: [Object, Boolean],
    default: void 0
  },
  direction: {
    type: String,
    default: "horizontal"
  },
  modelValue: null,
  disabled: Boolean,
  selectedClass: {
    type: String,
    default: "v-window-item--active"
  },
  // TODO: mandatory should probably not be exposed but do this for now
  mandatory: {
    type: [Boolean, String],
    default: "force"
  },
  ...makeComponentProps(),
  ...makeTagProps(),
  ...makeThemeProps()
}, "VWindow");
const VWindow = genericComponent()({
  name: "VWindow",
  directives: {
    Touch
  },
  props: makeVWindowProps(),
  emits: {
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props);
    const {
      isRtl
    } = useRtl();
    const {
      t
    } = useLocale();
    const group = useGroup(props, VWindowGroupSymbol);
    const rootRef = ref();
    const isRtlReverse = computed(() => isRtl.value ? !props.reverse : props.reverse);
    const isReversed = shallowRef(false);
    const transition = computed(() => {
      const axis = props.direction === "vertical" ? "y" : "x";
      const reverse = isRtlReverse.value ? !isReversed.value : isReversed.value;
      const direction = reverse ? "-reverse" : "";
      return `v-window-${axis}${direction}-transition`;
    });
    const transitionCount = shallowRef(0);
    const transitionHeight = ref(void 0);
    const activeIndex = computed(() => {
      return group.items.value.findIndex((item) => group.selected.value.includes(item.id));
    });
    watch(activeIndex, (newVal, oldVal) => {
      const itemsLength = group.items.value.length;
      const lastIndex = itemsLength - 1;
      if (itemsLength <= 2) {
        isReversed.value = newVal < oldVal;
      } else if (newVal === lastIndex && oldVal === 0) {
        isReversed.value = true;
      } else if (newVal === 0 && oldVal === lastIndex) {
        isReversed.value = false;
      } else {
        isReversed.value = newVal < oldVal;
      }
    });
    provide(VWindowSymbol, {
      transition,
      isReversed,
      transitionCount,
      transitionHeight,
      rootRef
    });
    const canMoveBack = computed(() => props.continuous || activeIndex.value !== 0);
    const canMoveForward = computed(() => props.continuous || activeIndex.value !== group.items.value.length - 1);
    function prev() {
      canMoveBack.value && group.prev();
    }
    function next() {
      canMoveForward.value && group.next();
    }
    const arrows = computed(() => {
      const arrows2 = [];
      const prevProps = {
        icon: isRtl.value ? props.nextIcon : props.prevIcon,
        class: `v-window__${isRtlReverse.value ? "right" : "left"}`,
        onClick: group.prev,
        "aria-label": t("$vuetify.carousel.prev")
      };
      arrows2.push(canMoveBack.value ? slots.prev ? slots.prev({
        props: prevProps
      }) : createVNode(VBtn, prevProps, null) : createVNode("div", null, null));
      const nextProps = {
        icon: isRtl.value ? props.prevIcon : props.nextIcon,
        class: `v-window__${isRtlReverse.value ? "left" : "right"}`,
        onClick: group.next,
        "aria-label": t("$vuetify.carousel.next")
      };
      arrows2.push(canMoveForward.value ? slots.next ? slots.next({
        props: nextProps
      }) : createVNode(VBtn, nextProps, null) : createVNode("div", null, null));
      return arrows2;
    });
    const touchOptions = computed(() => {
      if (props.touch === false) return props.touch;
      const options = {
        left: () => {
          isRtlReverse.value ? prev() : next();
        },
        right: () => {
          isRtlReverse.value ? next() : prev();
        },
        start: (_ref2) => {
          let {
            originalEvent
          } = _ref2;
          originalEvent.stopPropagation();
        }
      };
      return {
        ...options,
        ...props.touch === true ? {} : props.touch
      };
    });
    useRender(() => withDirectives(createVNode(props.tag, {
      "ref": rootRef,
      "class": ["v-window", {
        "v-window--show-arrows-on-hover": props.showArrows === "hover"
      }, themeClasses.value, props.class],
      "style": props.style
    }, {
      default: () => {
        var _a, _b;
        return [createVNode("div", {
          "class": "v-window__container",
          "style": {
            height: transitionHeight.value
          }
        }, [(_a = slots.default) == null ? void 0 : _a.call(slots, {
          group
        }), props.showArrows !== false && createVNode("div", {
          "class": "v-window__controls"
        }, [arrows.value])]), (_b = slots.additional) == null ? void 0 : _b.call(slots, {
          group
        })];
      }
    }), [[resolveDirective("touch"), touchOptions.value]]));
    return {
      group
    };
  }
});

const makeVWindowItemProps = propsFactory({
  reverseTransition: {
    type: [Boolean, String],
    default: void 0
  },
  transition: {
    type: [Boolean, String],
    default: void 0
  },
  ...makeComponentProps(),
  ...makeGroupItemProps(),
  ...makeLazyProps()
}, "VWindowItem");
const VWindowItem = genericComponent()({
  name: "VWindowItem",
  directives: {
    Touch
  },
  props: makeVWindowItemProps(),
  emits: {
    "group:selected": (val) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const window = inject(VWindowSymbol);
    const groupItem = useGroupItem(props, VWindowGroupSymbol);
    const {
      isBooted
    } = useSsrBoot();
    if (!window || !groupItem) throw new Error("[Vuetify] VWindowItem must be used inside VWindow");
    const isTransitioning = shallowRef(false);
    const hasTransition = computed(() => isBooted.value && (window.isReversed.value ? props.reverseTransition !== false : props.transition !== false));
    function onAfterTransition() {
      if (!isTransitioning.value || !window) {
        return;
      }
      isTransitioning.value = false;
      if (window.transitionCount.value > 0) {
        window.transitionCount.value -= 1;
        if (window.transitionCount.value === 0) {
          window.transitionHeight.value = void 0;
        }
      }
    }
    function onBeforeTransition() {
      var _a;
      if (isTransitioning.value || !window) {
        return;
      }
      isTransitioning.value = true;
      if (window.transitionCount.value === 0) {
        window.transitionHeight.value = convertToUnit((_a = window.rootRef.value) == null ? void 0 : _a.clientHeight);
      }
      window.transitionCount.value += 1;
    }
    function onTransitionCancelled() {
      onAfterTransition();
    }
    function onEnterTransition(el) {
      if (!isTransitioning.value) {
        return;
      }
      nextTick(() => {
        if (!hasTransition.value || !isTransitioning.value || !window) {
          return;
        }
        window.transitionHeight.value = convertToUnit(el.clientHeight);
      });
    }
    const transition = computed(() => {
      const name = window.isReversed.value ? props.reverseTransition : props.transition;
      return !hasTransition.value ? false : {
        name: typeof name !== "string" ? window.transition.value : name,
        onBeforeEnter: onBeforeTransition,
        onAfterEnter: onAfterTransition,
        onEnterCancelled: onTransitionCancelled,
        onBeforeLeave: onBeforeTransition,
        onAfterLeave: onAfterTransition,
        onLeaveCancelled: onTransitionCancelled,
        onEnter: onEnterTransition
      };
    });
    const {
      hasContent
    } = useLazy(props, groupItem.isSelected);
    useRender(() => createVNode(MaybeTransition, {
      "transition": transition.value,
      "disabled": !isBooted.value
    }, {
      default: () => {
        var _a;
        return [withDirectives(createVNode("div", {
          "class": ["v-window-item", groupItem.selectedClass.value, props.class],
          "style": props.style
        }, [hasContent.value && ((_a = slots.default) == null ? void 0 : _a.call(slots))]), [[vShow, groupItem.isSelected.value]])];
      }
    }));
    return {
      groupItem
    };
  }
});

const VSelectionControlGroupSymbol = Symbol.for("vuetify:selection-control-group");
const makeSelectionControlGroupProps = propsFactory({
  color: String,
  disabled: {
    type: Boolean,
    default: null
  },
  defaultsTarget: String,
  error: Boolean,
  id: String,
  inline: Boolean,
  falseIcon: IconValue,
  trueIcon: IconValue,
  ripple: {
    type: [Boolean, Object],
    default: true
  },
  multiple: {
    type: Boolean,
    default: null
  },
  name: String,
  readonly: {
    type: Boolean,
    default: null
  },
  modelValue: null,
  type: String,
  valueComparator: {
    type: Function,
    default: deepEqual
  },
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeThemeProps()
}, "SelectionControlGroup");
const makeVSelectionControlGroupProps = propsFactory({
  ...makeSelectionControlGroupProps({
    defaultsTarget: "VSelectionControl"
  })
}, "VSelectionControlGroup");
genericComponent()({
  name: "VSelectionControlGroup",
  props: makeVSelectionControlGroupProps(),
  emits: {
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const modelValue = useProxiedModel(props, "modelValue");
    const uid = getUid();
    const id = computed(() => props.id || `v-selection-control-group-${uid}`);
    const name = computed(() => props.name || id.value);
    const updateHandlers = /* @__PURE__ */ new Set();
    provide(VSelectionControlGroupSymbol, {
      modelValue,
      forceUpdate: () => {
        updateHandlers.forEach((fn) => fn());
      },
      onForceUpdate: (cb) => {
        updateHandlers.add(cb);
        onScopeDispose(() => {
          updateHandlers.delete(cb);
        });
      }
    });
    provideDefaults({
      [props.defaultsTarget]: {
        color: toRef(props, "color"),
        disabled: toRef(props, "disabled"),
        density: toRef(props, "density"),
        error: toRef(props, "error"),
        inline: toRef(props, "inline"),
        modelValue,
        multiple: computed(() => !!props.multiple || props.multiple == null && Array.isArray(modelValue.value)),
        name,
        falseIcon: toRef(props, "falseIcon"),
        trueIcon: toRef(props, "trueIcon"),
        readonly: toRef(props, "readonly"),
        ripple: toRef(props, "ripple"),
        type: toRef(props, "type"),
        valueComparator: toRef(props, "valueComparator")
      }
    });
    useRender(() => {
      var _a;
      return createVNode("div", {
        "class": ["v-selection-control-group", {
          "v-selection-control-group--inline": props.inline
        }, props.class],
        "style": props.style,
        "role": props.type === "radio" ? "radiogroup" : void 0
      }, [(_a = slots.default) == null ? void 0 : _a.call(slots)]);
    });
    return {};
  }
});

const makeVSelectionControlProps = propsFactory({
  label: String,
  baseColor: String,
  trueValue: null,
  falseValue: null,
  value: null,
  ...makeComponentProps(),
  ...makeSelectionControlGroupProps()
}, "VSelectionControl");
function useSelectionControl(props) {
  const group = inject(VSelectionControlGroupSymbol, void 0);
  const {
    densityClasses
  } = useDensity(props);
  const modelValue = useProxiedModel(props, "modelValue");
  const trueValue = computed(() => props.trueValue !== void 0 ? props.trueValue : props.value !== void 0 ? props.value : true);
  const falseValue = computed(() => props.falseValue !== void 0 ? props.falseValue : false);
  const isMultiple = computed(() => !!props.multiple || props.multiple == null && Array.isArray(modelValue.value));
  const model = computed({
    get() {
      const val = group ? group.modelValue.value : modelValue.value;
      return isMultiple.value ? wrapInArray(val).some((v) => props.valueComparator(v, trueValue.value)) : props.valueComparator(val, trueValue.value);
    },
    set(val) {
      if (props.readonly) return;
      const currentValue = val ? trueValue.value : falseValue.value;
      let newVal = currentValue;
      if (isMultiple.value) {
        newVal = val ? [...wrapInArray(modelValue.value), currentValue] : wrapInArray(modelValue.value).filter((item) => !props.valueComparator(item, trueValue.value));
      }
      if (group) {
        group.modelValue.value = newVal;
      } else {
        modelValue.value = newVal;
      }
    }
  });
  const {
    textColorClasses,
    textColorStyles
  } = useTextColor(computed(() => {
    if (props.error || props.disabled) return void 0;
    return model.value ? props.color : props.baseColor;
  }));
  const {
    backgroundColorClasses,
    backgroundColorStyles
  } = useBackgroundColor(computed(() => {
    return model.value && !props.error && !props.disabled ? props.color : props.baseColor;
  }));
  const icon = computed(() => model.value ? props.trueIcon : props.falseIcon);
  return {
    group,
    densityClasses,
    trueValue,
    falseValue,
    model,
    textColorClasses,
    textColorStyles,
    backgroundColorClasses,
    backgroundColorStyles,
    icon
  };
}
const VSelectionControl = genericComponent()({
  name: "VSelectionControl",
  directives: {
    Ripple
  },
  inheritAttrs: false,
  props: makeVSelectionControlProps(),
  emits: {
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    const {
      group,
      densityClasses,
      icon,
      model,
      textColorClasses,
      textColorStyles,
      backgroundColorClasses,
      backgroundColorStyles,
      trueValue
    } = useSelectionControl(props);
    const uid = getUid();
    const isFocused = shallowRef(false);
    const isFocusVisible = shallowRef(false);
    const input = ref();
    const id = computed(() => props.id || `input-${uid}`);
    const isInteractive = computed(() => !props.disabled && !props.readonly);
    group == null ? void 0 : group.onForceUpdate(() => {
      if (input.value) {
        input.value.checked = model.value;
      }
    });
    function onFocus(e) {
      if (!isInteractive.value) return;
      isFocused.value = true;
      if (matchesSelector(e.target) !== false) {
        isFocusVisible.value = true;
      }
    }
    function onBlur() {
      isFocused.value = false;
      isFocusVisible.value = false;
    }
    function onClickLabel(e) {
      e.stopPropagation();
    }
    function onInput(e) {
      if (!isInteractive.value) {
        if (input.value) {
          input.value.checked = model.value;
        }
        return;
      }
      if (props.readonly && group) {
        nextTick(() => group.forceUpdate());
      }
      model.value = e.target.checked;
    }
    useRender(() => {
      var _a, _b;
      const label = slots.label ? slots.label({
        label: props.label,
        props: {
          for: id.value
        }
      }) : props.label;
      const [rootAttrs, inputAttrs] = filterInputAttrs(attrs);
      const inputNode = createVNode("input", mergeProps({
        "ref": input,
        "checked": model.value,
        "disabled": !!props.disabled,
        "id": id.value,
        "onBlur": onBlur,
        "onFocus": onFocus,
        "onInput": onInput,
        "aria-disabled": !!props.disabled,
        "aria-label": props.label,
        "type": props.type,
        "value": trueValue.value,
        "name": props.name,
        "aria-checked": props.type === "checkbox" ? model.value : void 0
      }, inputAttrs), null);
      return createVNode("div", mergeProps({
        "class": ["v-selection-control", {
          "v-selection-control--dirty": model.value,
          "v-selection-control--disabled": props.disabled,
          "v-selection-control--error": props.error,
          "v-selection-control--focused": isFocused.value,
          "v-selection-control--focus-visible": isFocusVisible.value,
          "v-selection-control--inline": props.inline
        }, densityClasses.value, props.class]
      }, rootAttrs, {
        "style": props.style
      }), [createVNode("div", {
        "class": ["v-selection-control__wrapper", textColorClasses.value],
        "style": textColorStyles.value
      }, [(_a = slots.default) == null ? void 0 : _a.call(slots, {
        backgroundColorClasses,
        backgroundColorStyles
      }), withDirectives(createVNode("div", {
        "class": ["v-selection-control__input"]
      }, [((_b = slots.input) == null ? void 0 : _b.call(slots, {
        model,
        textColorClasses,
        textColorStyles,
        backgroundColorClasses,
        backgroundColorStyles,
        inputNode,
        icon: icon.value,
        props: {
          onFocus,
          onBlur,
          id: id.value
        }
      })) ?? createVNode(Fragment, null, [icon.value && createVNode(VIcon, {
        "key": "icon",
        "icon": icon.value
      }, null), inputNode])]), [[resolveDirective("ripple"), props.ripple && [!props.disabled && !props.readonly, null, ["center", "circle"]]]])]), label && createVNode(VLabel, {
        "for": id.value,
        "onClick": onClickLabel
      }, {
        default: () => [label]
      })]);
    });
    return {
      isFocused,
      input
    };
  }
});

const makeVCheckboxBtnProps = propsFactory({
  indeterminate: Boolean,
  indeterminateIcon: {
    type: IconValue,
    default: "$checkboxIndeterminate"
  },
  ...makeVSelectionControlProps({
    falseIcon: "$checkboxOff",
    trueIcon: "$checkboxOn"
  })
}, "VCheckboxBtn");
const VCheckboxBtn = genericComponent()({
  name: "VCheckboxBtn",
  props: makeVCheckboxBtnProps(),
  emits: {
    "update:modelValue": (value) => true,
    "update:indeterminate": (value) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const indeterminate = useProxiedModel(props, "indeterminate");
    const model = useProxiedModel(props, "modelValue");
    function onChange(v) {
      if (indeterminate.value) {
        indeterminate.value = false;
      }
    }
    const falseIcon = computed(() => {
      return indeterminate.value ? props.indeterminateIcon : props.falseIcon;
    });
    const trueIcon = computed(() => {
      return indeterminate.value ? props.indeterminateIcon : props.trueIcon;
    });
    useRender(() => {
      const controlProps = omit(VSelectionControl.filterProps(props), ["modelValue"]);
      return createVNode(VSelectionControl, mergeProps(controlProps, {
        "modelValue": model.value,
        "onUpdate:modelValue": [($event) => model.value = $event, onChange],
        "class": ["v-checkbox-btn", props.class],
        "style": props.style,
        "type": "checkbox",
        "falseIcon": falseIcon.value,
        "trueIcon": trueIcon.value,
        "aria-checked": indeterminate.value ? "mixed" : void 0
      }), slots);
    });
    return {};
  }
});

const makeVCheckboxProps = propsFactory({
  ...makeVInputProps(),
  ...omit(makeVCheckboxBtnProps(), ["inline"])
}, "VCheckbox");
const VCheckbox = genericComponent()({
  name: "VCheckbox",
  inheritAttrs: false,
  props: makeVCheckboxProps(),
  emits: {
    "update:modelValue": (value) => true,
    "update:focused": (focused) => true
  },
  setup(props, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    const model = useProxiedModel(props, "modelValue");
    const {
      isFocused,
      focus,
      blur
    } = useFocus(props);
    const uid = getUid();
    const id = computed(() => props.id || `checkbox-${uid}`);
    useRender(() => {
      const [rootAttrs, controlAttrs] = filterInputAttrs(attrs);
      const inputProps = VInput.filterProps(props);
      const checkboxProps = VCheckboxBtn.filterProps(props);
      return createVNode(VInput, mergeProps({
        "class": ["v-checkbox", props.class]
      }, rootAttrs, inputProps, {
        "modelValue": model.value,
        "onUpdate:modelValue": ($event) => model.value = $event,
        "id": id.value,
        "focused": isFocused.value,
        "style": props.style
      }), {
        ...slots,
        default: (_ref2) => {
          let {
            id: id2,
            messagesId,
            isDisabled,
            isReadonly,
            isValid
          } = _ref2;
          return createVNode(VCheckboxBtn, mergeProps(checkboxProps, {
            "id": id2.value,
            "aria-describedby": messagesId.value,
            "disabled": isDisabled.value,
            "readonly": isReadonly.value
          }, controlAttrs, {
            "error": isValid.value === false,
            "modelValue": model.value,
            "onUpdate:modelValue": ($event) => model.value = $event,
            "onFocus": focus,
            "onBlur": blur
          }), slots);
        }
      });
    });
    return {};
  }
});

const VListGroupActivator = defineComponent({
  name: "VListGroupActivator",
  setup(_, _ref) {
    let {
      slots
    } = _ref;
    useNestedGroupActivator();
    return () => {
      var _a;
      return (_a = slots.default) == null ? void 0 : _a.call(slots);
    };
  }
});
const makeVListGroupProps = propsFactory({
  /* @deprecated */
  activeColor: String,
  baseColor: String,
  color: String,
  collapseIcon: {
    type: IconValue,
    default: "$collapse"
  },
  expandIcon: {
    type: IconValue,
    default: "$expand"
  },
  prependIcon: IconValue,
  appendIcon: IconValue,
  fluid: Boolean,
  subgroup: Boolean,
  title: String,
  value: null,
  ...makeComponentProps(),
  ...makeTagProps()
}, "VListGroup");
const VListGroup = genericComponent()({
  name: "VListGroup",
  props: makeVListGroupProps(),
  setup(props, _ref2) {
    let {
      slots
    } = _ref2;
    const {
      isOpen,
      open,
      id: _id
    } = useNestedItem(toRef(props, "value"), true);
    const id = computed(() => `v-list-group--id-${String(_id.value)}`);
    const list = useList();
    const {
      isBooted
    } = useSsrBoot();
    function onClick(e) {
      e.stopPropagation();
      open(!isOpen.value, e);
    }
    const activatorProps = computed(() => ({
      onClick,
      class: "v-list-group__header",
      id: id.value
    }));
    const toggleIcon = computed(() => isOpen.value ? props.collapseIcon : props.expandIcon);
    const activatorDefaults = computed(() => ({
      VListItem: {
        active: isOpen.value,
        activeColor: props.activeColor,
        baseColor: props.baseColor,
        color: props.color,
        prependIcon: props.prependIcon || props.subgroup && toggleIcon.value,
        appendIcon: props.appendIcon || !props.subgroup && toggleIcon.value,
        title: props.title,
        value: props.value
      }
    }));
    useRender(() => createVNode(props.tag, {
      "class": ["v-list-group", {
        "v-list-group--prepend": list == null ? void 0 : list.hasPrepend.value,
        "v-list-group--fluid": props.fluid,
        "v-list-group--subgroup": props.subgroup,
        "v-list-group--open": isOpen.value
      }, props.class],
      "style": props.style
    }, {
      default: () => [slots.activator && createVNode(VDefaultsProvider, {
        "defaults": activatorDefaults.value
      }, {
        default: () => [createVNode(VListGroupActivator, null, {
          default: () => [slots.activator({
            props: activatorProps.value,
            isOpen: isOpen.value
          })]
        })]
      }), createVNode(MaybeTransition, {
        "transition": {
          component: VExpandTransition
        },
        "disabled": !isBooted.value
      }, {
        default: () => {
          var _a;
          return [withDirectives(createVNode("div", {
            "class": "v-list-group__items",
            "role": "group",
            "aria-labelledby": id.value
          }, [(_a = slots.default) == null ? void 0 : _a.call(slots)]), [[vShow, isOpen.value]])];
        }
      })]
    }));
    return {
      isOpen
    };
  }
});

const makeVListSubheaderProps = propsFactory({
  color: String,
  inset: Boolean,
  sticky: Boolean,
  title: String,
  ...makeComponentProps(),
  ...makeTagProps()
}, "VListSubheader");
const VListSubheader = genericComponent()({
  name: "VListSubheader",
  props: makeVListSubheaderProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(toRef(props, "color"));
    useRender(() => {
      const hasText = !!(slots.default || props.title);
      return createVNode(props.tag, {
        "class": ["v-list-subheader", {
          "v-list-subheader--inset": props.inset,
          "v-list-subheader--sticky": props.sticky
        }, textColorClasses.value, props.class],
        "style": [{
          textColorStyles
        }, props.style]
      }, {
        default: () => {
          var _a;
          return [hasText && createVNode("div", {
            "class": "v-list-subheader__text"
          }, [((_a = slots.default) == null ? void 0 : _a.call(slots)) ?? props.title])];
        }
      });
    });
    return {};
  }
});

const makeVDividerProps = propsFactory({
  color: String,
  inset: Boolean,
  length: [Number, String],
  opacity: [Number, String],
  thickness: [Number, String],
  vertical: Boolean,
  ...makeComponentProps(),
  ...makeThemeProps()
}, "VDivider");
const VDivider = genericComponent()({
  name: "VDivider",
  props: makeVDividerProps(),
  setup(props, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props);
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(toRef(props, "color"));
    const dividerStyles = computed(() => {
      const styles = {};
      if (props.length) {
        styles[props.vertical ? "height" : "width"] = convertToUnit(props.length);
      }
      if (props.thickness) {
        styles[props.vertical ? "borderRightWidth" : "borderTopWidth"] = convertToUnit(props.thickness);
      }
      return styles;
    });
    useRender(() => {
      const divider = createVNode("hr", {
        "class": [{
          "v-divider": true,
          "v-divider--inset": props.inset,
          "v-divider--vertical": props.vertical
        }, themeClasses.value, textColorClasses.value, props.class],
        "style": [dividerStyles.value, textColorStyles.value, {
          "--v-border-opacity": props.opacity
        }, props.style],
        "aria-orientation": !attrs.role || attrs.role === "separator" ? props.vertical ? "vertical" : "horizontal" : void 0,
        "role": `${attrs.role || "separator"}`
      }, null);
      if (!slots.default) return divider;
      return createVNode("div", {
        "class": ["v-divider__wrapper", {
          "v-divider__wrapper--vertical": props.vertical,
          "v-divider__wrapper--inset": props.inset
        }]
      }, [divider, createVNode("div", {
        "class": "v-divider__content"
      }, [slots.default()]), divider]);
    });
    return {};
  }
});

const makeVListChildrenProps = propsFactory({
  items: Array,
  returnObject: Boolean
}, "VListChildren");
const VListChildren = genericComponent()({
  name: "VListChildren",
  props: makeVListChildrenProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    createList();
    return () => {
      var _a, _b;
      return ((_a = slots.default) == null ? void 0 : _a.call(slots)) ?? ((_b = props.items) == null ? void 0 : _b.map((_ref2) => {
        var _a2, _b2;
        let {
          children,
          props: itemProps,
          type,
          raw: item
        } = _ref2;
        if (type === "divider") {
          return ((_a2 = slots.divider) == null ? void 0 : _a2.call(slots, {
            props: itemProps
          })) ?? createVNode(VDivider, itemProps, null);
        }
        if (type === "subheader") {
          return ((_b2 = slots.subheader) == null ? void 0 : _b2.call(slots, {
            props: itemProps
          })) ?? createVNode(VListSubheader, itemProps, null);
        }
        const slotsWithItem = {
          subtitle: slots.subtitle ? (slotProps) => {
            var _a3;
            return (_a3 = slots.subtitle) == null ? void 0 : _a3.call(slots, {
              ...slotProps,
              item
            });
          } : void 0,
          prepend: slots.prepend ? (slotProps) => {
            var _a3;
            return (_a3 = slots.prepend) == null ? void 0 : _a3.call(slots, {
              ...slotProps,
              item
            });
          } : void 0,
          append: slots.append ? (slotProps) => {
            var _a3;
            return (_a3 = slots.append) == null ? void 0 : _a3.call(slots, {
              ...slotProps,
              item
            });
          } : void 0,
          title: slots.title ? (slotProps) => {
            var _a3;
            return (_a3 = slots.title) == null ? void 0 : _a3.call(slots, {
              ...slotProps,
              item
            });
          } : void 0
        };
        const listGroupProps = VListGroup.filterProps(itemProps);
        return children ? createVNode(VListGroup, mergeProps({
          "value": itemProps == null ? void 0 : itemProps.value
        }, listGroupProps), {
          activator: (_ref3) => {
            let {
              props: activatorProps
            } = _ref3;
            const listItemProps = {
              ...itemProps,
              ...activatorProps,
              value: props.returnObject ? item : itemProps.value
            };
            return slots.header ? slots.header({
              props: listItemProps
            }) : createVNode(VListItem, listItemProps, slotsWithItem);
          },
          default: () => createVNode(VListChildren, {
            "items": children,
            "returnObject": props.returnObject
          }, slots)
        }) : slots.item ? slots.item({
          props: itemProps
        }) : createVNode(VListItem, mergeProps(itemProps, {
          "value": props.returnObject ? item : itemProps.value
        }), slotsWithItem);
      }));
    };
  }
});

const makeItemsProps = propsFactory({
  items: {
    type: Array,
    default: () => []
  },
  itemTitle: {
    type: [String, Array, Function],
    default: "title"
  },
  itemValue: {
    type: [String, Array, Function],
    default: "value"
  },
  itemChildren: {
    type: [Boolean, String, Array, Function],
    default: "children"
  },
  itemProps: {
    type: [Boolean, String, Array, Function],
    default: "props"
  },
  returnObject: Boolean,
  valueComparator: Function
}, "list-items");

function transformItem(props, item) {
  const type = getPropertyFromItem(item, props.itemType, "item");
  const title = isPrimitive(item) ? item : getPropertyFromItem(item, props.itemTitle);
  const value = getPropertyFromItem(item, props.itemValue, void 0);
  const children = getPropertyFromItem(item, props.itemChildren);
  const itemProps = props.itemProps === true ? omit(item, ["children"]) : getPropertyFromItem(item, props.itemProps);
  const _props = {
    title,
    value,
    ...itemProps
  };
  return {
    type,
    title: _props.title,
    value: _props.value,
    props: _props,
    children: type === "item" && children ? transformItems(props, children) : void 0,
    raw: item
  };
}
function transformItems(props, items) {
  const array = [];
  for (const item of items) {
    array.push(transformItem(props, item));
  }
  return array;
}
function useListItems(props) {
  const items = computed(() => transformItems(props, props.items));
  return {
    items
  };
}
const makeVListProps = propsFactory({
  baseColor: String,
  /* @deprecated */
  activeColor: String,
  activeClass: String,
  bgColor: String,
  disabled: Boolean,
  expandIcon: IconValue,
  collapseIcon: IconValue,
  lines: {
    type: [Boolean, String],
    default: "one"
  },
  slim: Boolean,
  nav: Boolean,
  "onClick:open": EventProp(),
  "onClick:select": EventProp(),
  "onUpdate:opened": EventProp(),
  ...makeNestedProps({
    selectStrategy: "single-leaf",
    openStrategy: "list"
  }),
  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeDimensionProps(),
  ...makeElevationProps(),
  itemType: {
    type: String,
    default: "type"
  },
  ...makeItemsProps(),
  ...makeRoundedProps(),
  ...makeTagProps(),
  ...makeThemeProps(),
  ...makeVariantProps({
    variant: "text"
  })
}, "VList");
const VList = genericComponent()({
  name: "VList",
  props: makeVListProps(),
  emits: {
    "update:selected": (value) => true,
    "update:activated": (value) => true,
    "update:opened": (value) => true,
    "click:open": (value) => true,
    "click:activate": (value) => true,
    "click:select": (value) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      items
    } = useListItems(props);
    const {
      themeClasses
    } = provideTheme(props);
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(toRef(props, "bgColor"));
    const {
      borderClasses
    } = useBorder(props);
    const {
      densityClasses
    } = useDensity(props);
    const {
      dimensionStyles
    } = useDimension(props);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      roundedClasses
    } = useRounded(props);
    const {
      children,
      open,
      parents,
      select,
      getPath
    } = useNested(props);
    const lineClasses = computed(() => props.lines ? `v-list--${props.lines}-line` : void 0);
    const activeColor = toRef(props, "activeColor");
    const baseColor = toRef(props, "baseColor");
    const color = toRef(props, "color");
    createList();
    provideDefaults({
      VListGroup: {
        activeColor,
        baseColor,
        color,
        expandIcon: toRef(props, "expandIcon"),
        collapseIcon: toRef(props, "collapseIcon")
      },
      VListItem: {
        activeClass: toRef(props, "activeClass"),
        activeColor,
        baseColor,
        color,
        density: toRef(props, "density"),
        disabled: toRef(props, "disabled"),
        lines: toRef(props, "lines"),
        nav: toRef(props, "nav"),
        slim: toRef(props, "slim"),
        variant: toRef(props, "variant")
      }
    });
    const isFocused = shallowRef(false);
    const contentRef = ref();
    function onFocusin(e) {
      isFocused.value = true;
    }
    function onFocusout(e) {
      isFocused.value = false;
    }
    function onFocus(e) {
      var _a;
      if (!isFocused.value && !(e.relatedTarget && ((_a = contentRef.value) == null ? void 0 : _a.contains(e.relatedTarget)))) focus();
    }
    function onKeydown(e) {
      const target = e.target;
      if (!contentRef.value || ["INPUT", "TEXTAREA"].includes(target.tagName)) return;
      if (e.key === "ArrowDown") {
        focus("next");
      } else if (e.key === "ArrowUp") {
        focus("prev");
      } else if (e.key === "Home") {
        focus("first");
      } else if (e.key === "End") {
        focus("last");
      } else {
        return;
      }
      e.preventDefault();
    }
    function onMousedown(e) {
      isFocused.value = true;
    }
    function focus(location) {
      if (contentRef.value) {
        return focusChild(contentRef.value, location);
      }
    }
    useRender(() => {
      return createVNode(props.tag, {
        "ref": contentRef,
        "class": ["v-list", {
          "v-list--disabled": props.disabled,
          "v-list--nav": props.nav,
          "v-list--slim": props.slim
        }, themeClasses.value, backgroundColorClasses.value, borderClasses.value, densityClasses.value, elevationClasses.value, lineClasses.value, roundedClasses.value, props.class],
        "style": [backgroundColorStyles.value, dimensionStyles.value, props.style],
        "tabindex": props.disabled ? -1 : 0,
        "role": "listbox",
        "aria-activedescendant": void 0,
        "onFocusin": onFocusin,
        "onFocusout": onFocusout,
        "onFocus": onFocus,
        "onKeydown": onKeydown,
        "onMousedown": onMousedown
      }, {
        default: () => [createVNode(VListChildren, {
          "items": items.value,
          "returnObject": props.returnObject
        }, slots)]
      });
    });
    return {
      open,
      select,
      focus,
      children,
      parents,
      getPath
    };
  }
});

const makeVListItemActionProps = propsFactory({
  start: Boolean,
  end: Boolean,
  ...makeComponentProps(),
  ...makeTagProps()
}, "VListItemAction");
const VListItemAction = genericComponent()({
  name: "VListItemAction",
  props: makeVListItemActionProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    useRender(() => createVNode(props.tag, {
      "class": ["v-list-item-action", {
        "v-list-item-action--start": props.start,
        "v-list-item-action--end": props.end
      }, props.class],
      "style": props.style
    }, slots));
    return {};
  }
});

const _sfc_main = /* @__PURE__ */ defineComponent$1({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const router = useRouter();
    const tab = ref(0);
    const currentRoomCode = ref("");
    const isCreatingRoom = ref(false);
    const isPrivate = ref(false);
    const showPanel = ref(1);
    ref(null);
    const { currentRoom, createRoom, listRooms } = useRoom();
    const publicRooms = ref([]);
    const listPublicRooms = async () => {
      const data = await listRooms();
      if (!data || !data.rooms) {
        return;
      }
      publicRooms.value = data.rooms;
    };
    const createRoomCallback = async () => {
      return;
    };
    watch(() => tab.value, (newValue) => {
      if (newValue === 2) {
        listPublicRooms();
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page-root flex !flex-col gap-5 items-center justify-center pb-10" }, _attrs))} data-v-81cdea52><h4 class="mb-4 scale-125" data-v-81cdea52>东方夜雀五札戏</h4>`);
      _push(ssrRenderComponent(VExpansionPanels, {
        modelValue: unref(showPanel),
        "onUpdate:modelValue": ($event) => isRef(showPanel) ? showPanel.value = $event : null
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VExpansionPanel, { elevation: "0" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VExpansionPanelText, { class: "expansion-panel-text" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VWindow, {
                          modelValue: unref(tab),
                          "onUpdate:modelValue": ($event) => isRef(tab) ? tab.value = $event : null,
                          class: "xl:w-[38%] lg:w-[48%] w-[90%]"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VWindowItem, {
                                class: "w-full",
                                value: "0"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<div class="flex flex-col flex-wrap items-stretch w-full gap-2 p-4 pt-0" data-v-81cdea52${_scopeId5}>`);
                                    _push6(ssrRenderComponent(VBtn, {
                                      color: "primary",
                                      density: "default",
                                      size: "x-large",
                                      title: "快速加入随机房间",
                                      variant: "flat"
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`快速加入 `);
                                        } else {
                                          return [
                                            createTextVNode("快速加入 ")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(`<div class="flex flex-col lg:flex-row flex-wrap items-stretch w-full gap-2" data-v-81cdea52${_scopeId5}>`);
                                    _push6(ssrRenderComponent(VBtn, {
                                      class: "grow",
                                      color: "primary",
                                      density: "compact",
                                      size: "x-large",
                                      title: "查看公开房间",
                                      variant: "flat",
                                      onClick: ($event) => tab.value = 2
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`房间列表 `);
                                        } else {
                                          return [
                                            createTextVNode("房间列表 ")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(VBtn, {
                                      class: "grow",
                                      color: "primary",
                                      density: "compact",
                                      size: "x-large",
                                      title: "创建一个房间",
                                      variant: "flat",
                                      onClick: ($event) => tab.value = 1
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`创建房间 `);
                                        } else {
                                          return [
                                            createTextVNode("创建房间 ")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(`</div>`);
                                    _push6(ssrRenderComponent(VBtn, {
                                      color: "primary",
                                      density: "compact",
                                      size: "x-large",
                                      title: "前往游戏设置",
                                      to: "/settings",
                                      variant: "flat"
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(` 设置 `);
                                        } else {
                                          return [
                                            createTextVNode(" 设置 ")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(`</div>`);
                                  } else {
                                    return [
                                      createVNode("div", { class: "flex flex-col flex-wrap items-stretch w-full gap-2 p-4 pt-0" }, [
                                        createVNode(VBtn, {
                                          color: "primary",
                                          density: "default",
                                          size: "x-large",
                                          title: "快速加入随机房间",
                                          variant: "flat"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode("快速加入 ")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode("div", { class: "flex flex-col lg:flex-row flex-wrap items-stretch w-full gap-2" }, [
                                          createVNode(VBtn, {
                                            class: "grow",
                                            color: "primary",
                                            density: "compact",
                                            size: "x-large",
                                            title: "查看公开房间",
                                            variant: "flat",
                                            onClick: ($event) => tab.value = 2
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode("房间列表 ")
                                            ]),
                                            _: 1
                                          }, 8, ["onClick"]),
                                          createVNode(VBtn, {
                                            class: "grow",
                                            color: "primary",
                                            density: "compact",
                                            size: "x-large",
                                            title: "创建一个房间",
                                            variant: "flat",
                                            onClick: ($event) => tab.value = 1
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode("创建房间 ")
                                            ]),
                                            _: 1
                                          }, 8, ["onClick"])
                                        ]),
                                        createVNode(VBtn, {
                                          color: "primary",
                                          density: "compact",
                                          size: "x-large",
                                          title: "前往游戏设置",
                                          to: "/settings",
                                          variant: "flat"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(" 设置 ")
                                          ]),
                                          _: 1
                                        })
                                      ])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VWindowItem, { value: "1" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<div class="p-4 pt-0" data-v-81cdea52${_scopeId5}>`);
                                    _push6(ssrRenderComponent(VCheckbox, {
                                      label: "私密房间",
                                      modelValue: unref(isPrivate),
                                      "onUpdate:modelValue": ($event) => isRef(isPrivate) ? isPrivate.value = $event : null,
                                      "hide-details": ""
                                    }, null, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(VBtn, {
                                      disabled: unref(isCreatingRoom) || unref(currentRoomCode) !== "",
                                      loading: unref(isCreatingRoom),
                                      class: "w-full mb-3",
                                      color: "primary",
                                      size: "x-large",
                                      variant: "flat",
                                      onClick: createRoomCallback
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`${ssrInterpolate(unref(currentRoomCode) ? `房间代码: ${unref(currentRoomCode)}` : "创建房间")}`);
                                        } else {
                                          return [
                                            createTextVNode(toDisplayString(unref(currentRoomCode) ? `房间代码: ${unref(currentRoomCode)}` : "创建房间"), 1)
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(VBtn, {
                                      class: "w-full",
                                      variant: "text",
                                      onClick: ($event) => tab.value = 0
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VIcon, null, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`mdi-arrow-left`);
                                              } else {
                                                return [
                                                  createTextVNode("mdi-arrow-left")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(` 返回 `);
                                        } else {
                                          return [
                                            createVNode(VIcon, null, {
                                              default: withCtx(() => [
                                                createTextVNode("mdi-arrow-left")
                                              ]),
                                              _: 1
                                            }),
                                            createTextVNode(" 返回 ")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(`</div>`);
                                  } else {
                                    return [
                                      createVNode("div", { class: "p-4 pt-0" }, [
                                        createVNode(VCheckbox, {
                                          label: "私密房间",
                                          modelValue: unref(isPrivate),
                                          "onUpdate:modelValue": ($event) => isRef(isPrivate) ? isPrivate.value = $event : null,
                                          "hide-details": ""
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                        createVNode(VBtn, {
                                          disabled: unref(isCreatingRoom) || unref(currentRoomCode) !== "",
                                          loading: unref(isCreatingRoom),
                                          class: "w-full mb-3",
                                          color: "primary",
                                          size: "x-large",
                                          variant: "flat",
                                          onClick: createRoomCallback
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(unref(currentRoomCode) ? `房间代码: ${unref(currentRoomCode)}` : "创建房间"), 1)
                                          ]),
                                          _: 1
                                        }, 8, ["disabled", "loading"]),
                                        createVNode(VBtn, {
                                          class: "w-full",
                                          variant: "text",
                                          onClick: ($event) => tab.value = 0
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(VIcon, null, {
                                              default: withCtx(() => [
                                                createTextVNode("mdi-arrow-left")
                                              ]),
                                              _: 1
                                            }),
                                            createTextVNode(" 返回 ")
                                          ]),
                                          _: 1
                                        }, 8, ["onClick"])
                                      ])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VWindowItem, { value: "2" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<div class="p-4 pt-0" data-v-81cdea52${_scopeId5}><p class="w-full text-left text-2xl font-bold" data-v-81cdea52${_scopeId5}>公开房间列表</p>`);
                                    if (unref(publicRooms).length === 0) {
                                      _push6(`<p class="w-full text-left text-sm text-gray-500 mt-2" data-v-81cdea52${_scopeId5}>暂无房间...</p>`);
                                    } else {
                                      _push6(`<!---->`);
                                    }
                                    _push6(ssrRenderComponent(VList, null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`<!--[-->`);
                                          ssrRenderList(unref(publicRooms), (room) => {
                                            _push7(ssrRenderComponent(VListItem, {
                                              key: room.code,
                                              value: room.code,
                                              class: "py-3",
                                              onClick: ($event) => {
                                                unref(router).push(`/room/${room.code}`);
                                              }
                                            }, {
                                              append: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(ssrRenderComponent(VListItemAction, { class: "flex-column align-end" }, {
                                                    default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                      if (_push9) {
                                                        _push9(`<small class="mb-4 text-high-emphasis opacity-60" data-v-81cdea52${_scopeId8}>点击加入</small>`);
                                                        _push9(ssrRenderComponent(VSpacer, null, null, _parent9, _scopeId8));
                                                        _push9(ssrRenderComponent(_component_Icon, {
                                                          class: "w-6 h-6",
                                                          name: "material-symbols:arrow-right-alt-rounded"
                                                        }, null, _parent9, _scopeId8));
                                                      } else {
                                                        return [
                                                          createVNode("small", { class: "mb-4 text-high-emphasis opacity-60" }, "点击加入"),
                                                          createVNode(VSpacer),
                                                          createVNode(_component_Icon, {
                                                            class: "w-6 h-6",
                                                            name: "material-symbols:arrow-right-alt-rounded"
                                                          })
                                                        ];
                                                      }
                                                    }),
                                                    _: 2
                                                  }, _parent8, _scopeId7));
                                                } else {
                                                  return [
                                                    createVNode(VListItemAction, { class: "flex-column align-end" }, {
                                                      default: withCtx(() => [
                                                        createVNode("small", { class: "mb-4 text-high-emphasis opacity-60" }, "点击加入"),
                                                        createVNode(VSpacer),
                                                        createVNode(_component_Icon, {
                                                          class: "w-6 h-6",
                                                          name: "material-symbols:arrow-right-alt-rounded"
                                                        })
                                                      ]),
                                                      _: 1
                                                    })
                                                  ];
                                                }
                                              }),
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(ssrRenderComponent(VListItemTitle, null, {
                                                    default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                      if (_push9) {
                                                        _push9(`${ssrInterpolate(room.code)}`);
                                                      } else {
                                                        return [
                                                          createTextVNode(toDisplayString(room.code), 1)
                                                        ];
                                                      }
                                                    }),
                                                    _: 2
                                                  }, _parent8, _scopeId7));
                                                  _push8(ssrRenderComponent(VListItemSubtitle, { class: "mb-1 text-high-emphasis opacity-100" }, {
                                                    default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                      if (_push9) {
                                                        _push9(`房主：${ssrInterpolate(room.owner)}`);
                                                      } else {
                                                        return [
                                                          createTextVNode("房主：" + toDisplayString(room.owner), 1)
                                                        ];
                                                      }
                                                    }),
                                                    _: 2
                                                  }, _parent8, _scopeId7));
                                                  _push8(ssrRenderComponent(VListItemSubtitle, { class: "text-high-emphasis" }, {
                                                    default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                      if (_push9) {
                                                        _push9(`人数：${ssrInterpolate(room.memberCount)}`);
                                                      } else {
                                                        return [
                                                          createTextVNode("人数：" + toDisplayString(room.memberCount), 1)
                                                        ];
                                                      }
                                                    }),
                                                    _: 2
                                                  }, _parent8, _scopeId7));
                                                } else {
                                                  return [
                                                    createVNode(VListItemTitle, null, {
                                                      default: withCtx(() => [
                                                        createTextVNode(toDisplayString(room.code), 1)
                                                      ]),
                                                      _: 2
                                                    }, 1024),
                                                    createVNode(VListItemSubtitle, { class: "mb-1 text-high-emphasis opacity-100" }, {
                                                      default: withCtx(() => [
                                                        createTextVNode("房主：" + toDisplayString(room.owner), 1)
                                                      ]),
                                                      _: 2
                                                    }, 1024),
                                                    createVNode(VListItemSubtitle, { class: "text-high-emphasis" }, {
                                                      default: withCtx(() => [
                                                        createTextVNode("人数：" + toDisplayString(room.memberCount), 1)
                                                      ]),
                                                      _: 2
                                                    }, 1024)
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                          });
                                          _push7(`<!--]-->`);
                                        } else {
                                          return [
                                            (openBlock(true), createBlock(Fragment, null, renderList(unref(publicRooms), (room) => {
                                              return openBlock(), createBlock(VListItem, {
                                                key: room.code,
                                                value: room.code,
                                                class: "py-3",
                                                onClick: ($event) => {
                                                  unref(router).push(`/room/${room.code}`);
                                                }
                                              }, {
                                                append: withCtx(() => [
                                                  createVNode(VListItemAction, { class: "flex-column align-end" }, {
                                                    default: withCtx(() => [
                                                      createVNode("small", { class: "mb-4 text-high-emphasis opacity-60" }, "点击加入"),
                                                      createVNode(VSpacer),
                                                      createVNode(_component_Icon, {
                                                        class: "w-6 h-6",
                                                        name: "material-symbols:arrow-right-alt-rounded"
                                                      })
                                                    ]),
                                                    _: 1
                                                  })
                                                ]),
                                                default: withCtx(() => [
                                                  createVNode(VListItemTitle, null, {
                                                    default: withCtx(() => [
                                                      createTextVNode(toDisplayString(room.code), 1)
                                                    ]),
                                                    _: 2
                                                  }, 1024),
                                                  createVNode(VListItemSubtitle, { class: "mb-1 text-high-emphasis opacity-100" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode("房主：" + toDisplayString(room.owner), 1)
                                                    ]),
                                                    _: 2
                                                  }, 1024),
                                                  createVNode(VListItemSubtitle, { class: "text-high-emphasis" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode("人数：" + toDisplayString(room.memberCount), 1)
                                                    ]),
                                                    _: 2
                                                  }, 1024)
                                                ]),
                                                _: 2
                                              }, 1032, ["value", "onClick"]);
                                            }), 128))
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(VBtn, {
                                      class: "w-full",
                                      variant: "text",
                                      onClick: listPublicRooms
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(` 刷新 `);
                                          _push7(ssrRenderComponent(VIcon, null, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`mdi-refresh`);
                                              } else {
                                                return [
                                                  createTextVNode("mdi-refresh")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createTextVNode(" 刷新 "),
                                            createVNode(VIcon, null, {
                                              default: withCtx(() => [
                                                createTextVNode("mdi-refresh")
                                              ]),
                                              _: 1
                                            })
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(VBtn, {
                                      class: "w-full",
                                      variant: "text",
                                      onClick: ($event) => tab.value = 0
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(` 返回 `);
                                          _push7(ssrRenderComponent(VIcon, null, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`mdi-arrow-right`);
                                              } else {
                                                return [
                                                  createTextVNode("mdi-arrow-right")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createTextVNode(" 返回 "),
                                            createVNode(VIcon, null, {
                                              default: withCtx(() => [
                                                createTextVNode("mdi-arrow-right")
                                              ]),
                                              _: 1
                                            })
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(`</div>`);
                                  } else {
                                    return [
                                      createVNode("div", { class: "p-4 pt-0" }, [
                                        createVNode("p", { class: "w-full text-left text-2xl font-bold" }, "公开房间列表"),
                                        unref(publicRooms).length === 0 ? (openBlock(), createBlock("p", {
                                          key: 0,
                                          class: "w-full text-left text-sm text-gray-500 mt-2"
                                        }, "暂无房间...")) : createCommentVNode("", true),
                                        createVNode(VList, null, {
                                          default: withCtx(() => [
                                            (openBlock(true), createBlock(Fragment, null, renderList(unref(publicRooms), (room) => {
                                              return openBlock(), createBlock(VListItem, {
                                                key: room.code,
                                                value: room.code,
                                                class: "py-3",
                                                onClick: ($event) => {
                                                  unref(router).push(`/room/${room.code}`);
                                                }
                                              }, {
                                                append: withCtx(() => [
                                                  createVNode(VListItemAction, { class: "flex-column align-end" }, {
                                                    default: withCtx(() => [
                                                      createVNode("small", { class: "mb-4 text-high-emphasis opacity-60" }, "点击加入"),
                                                      createVNode(VSpacer),
                                                      createVNode(_component_Icon, {
                                                        class: "w-6 h-6",
                                                        name: "material-symbols:arrow-right-alt-rounded"
                                                      })
                                                    ]),
                                                    _: 1
                                                  })
                                                ]),
                                                default: withCtx(() => [
                                                  createVNode(VListItemTitle, null, {
                                                    default: withCtx(() => [
                                                      createTextVNode(toDisplayString(room.code), 1)
                                                    ]),
                                                    _: 2
                                                  }, 1024),
                                                  createVNode(VListItemSubtitle, { class: "mb-1 text-high-emphasis opacity-100" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode("房主：" + toDisplayString(room.owner), 1)
                                                    ]),
                                                    _: 2
                                                  }, 1024),
                                                  createVNode(VListItemSubtitle, { class: "text-high-emphasis" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode("人数：" + toDisplayString(room.memberCount), 1)
                                                    ]),
                                                    _: 2
                                                  }, 1024)
                                                ]),
                                                _: 2
                                              }, 1032, ["value", "onClick"]);
                                            }), 128))
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(VBtn, {
                                          class: "w-full",
                                          variant: "text",
                                          onClick: listPublicRooms
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(" 刷新 "),
                                            createVNode(VIcon, null, {
                                              default: withCtx(() => [
                                                createTextVNode("mdi-refresh")
                                              ]),
                                              _: 1
                                            })
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(VBtn, {
                                          class: "w-full",
                                          variant: "text",
                                          onClick: ($event) => tab.value = 0
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(" 返回 "),
                                            createVNode(VIcon, null, {
                                              default: withCtx(() => [
                                                createTextVNode("mdi-arrow-right")
                                              ]),
                                              _: 1
                                            })
                                          ]),
                                          _: 1
                                        }, 8, ["onClick"])
                                      ])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VWindowItem, {
                                  class: "w-full",
                                  value: "0"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "flex flex-col flex-wrap items-stretch w-full gap-2 p-4 pt-0" }, [
                                      createVNode(VBtn, {
                                        color: "primary",
                                        density: "default",
                                        size: "x-large",
                                        title: "快速加入随机房间",
                                        variant: "flat"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("快速加入 ")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode("div", { class: "flex flex-col lg:flex-row flex-wrap items-stretch w-full gap-2" }, [
                                        createVNode(VBtn, {
                                          class: "grow",
                                          color: "primary",
                                          density: "compact",
                                          size: "x-large",
                                          title: "查看公开房间",
                                          variant: "flat",
                                          onClick: ($event) => tab.value = 2
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode("房间列表 ")
                                          ]),
                                          _: 1
                                        }, 8, ["onClick"]),
                                        createVNode(VBtn, {
                                          class: "grow",
                                          color: "primary",
                                          density: "compact",
                                          size: "x-large",
                                          title: "创建一个房间",
                                          variant: "flat",
                                          onClick: ($event) => tab.value = 1
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode("创建房间 ")
                                          ]),
                                          _: 1
                                        }, 8, ["onClick"])
                                      ]),
                                      createVNode(VBtn, {
                                        color: "primary",
                                        density: "compact",
                                        size: "x-large",
                                        title: "前往游戏设置",
                                        to: "/settings",
                                        variant: "flat"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(" 设置 ")
                                        ]),
                                        _: 1
                                      })
                                    ])
                                  ]),
                                  _: 1
                                }),
                                createVNode(VWindowItem, { value: "1" }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "p-4 pt-0" }, [
                                      createVNode(VCheckbox, {
                                        label: "私密房间",
                                        modelValue: unref(isPrivate),
                                        "onUpdate:modelValue": ($event) => isRef(isPrivate) ? isPrivate.value = $event : null,
                                        "hide-details": ""
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                      createVNode(VBtn, {
                                        disabled: unref(isCreatingRoom) || unref(currentRoomCode) !== "",
                                        loading: unref(isCreatingRoom),
                                        class: "w-full mb-3",
                                        color: "primary",
                                        size: "x-large",
                                        variant: "flat",
                                        onClick: createRoomCallback
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(unref(currentRoomCode) ? `房间代码: ${unref(currentRoomCode)}` : "创建房间"), 1)
                                        ]),
                                        _: 1
                                      }, 8, ["disabled", "loading"]),
                                      createVNode(VBtn, {
                                        class: "w-full",
                                        variant: "text",
                                        onClick: ($event) => tab.value = 0
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VIcon, null, {
                                            default: withCtx(() => [
                                              createTextVNode("mdi-arrow-left")
                                            ]),
                                            _: 1
                                          }),
                                          createTextVNode(" 返回 ")
                                        ]),
                                        _: 1
                                      }, 8, ["onClick"])
                                    ])
                                  ]),
                                  _: 1
                                }),
                                createVNode(VWindowItem, { value: "2" }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "p-4 pt-0" }, [
                                      createVNode("p", { class: "w-full text-left text-2xl font-bold" }, "公开房间列表"),
                                      unref(publicRooms).length === 0 ? (openBlock(), createBlock("p", {
                                        key: 0,
                                        class: "w-full text-left text-sm text-gray-500 mt-2"
                                      }, "暂无房间...")) : createCommentVNode("", true),
                                      createVNode(VList, null, {
                                        default: withCtx(() => [
                                          (openBlock(true), createBlock(Fragment, null, renderList(unref(publicRooms), (room) => {
                                            return openBlock(), createBlock(VListItem, {
                                              key: room.code,
                                              value: room.code,
                                              class: "py-3",
                                              onClick: ($event) => {
                                                unref(router).push(`/room/${room.code}`);
                                              }
                                            }, {
                                              append: withCtx(() => [
                                                createVNode(VListItemAction, { class: "flex-column align-end" }, {
                                                  default: withCtx(() => [
                                                    createVNode("small", { class: "mb-4 text-high-emphasis opacity-60" }, "点击加入"),
                                                    createVNode(VSpacer),
                                                    createVNode(_component_Icon, {
                                                      class: "w-6 h-6",
                                                      name: "material-symbols:arrow-right-alt-rounded"
                                                    })
                                                  ]),
                                                  _: 1
                                                })
                                              ]),
                                              default: withCtx(() => [
                                                createVNode(VListItemTitle, null, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(room.code), 1)
                                                  ]),
                                                  _: 2
                                                }, 1024),
                                                createVNode(VListItemSubtitle, { class: "mb-1 text-high-emphasis opacity-100" }, {
                                                  default: withCtx(() => [
                                                    createTextVNode("房主：" + toDisplayString(room.owner), 1)
                                                  ]),
                                                  _: 2
                                                }, 1024),
                                                createVNode(VListItemSubtitle, { class: "text-high-emphasis" }, {
                                                  default: withCtx(() => [
                                                    createTextVNode("人数：" + toDisplayString(room.memberCount), 1)
                                                  ]),
                                                  _: 2
                                                }, 1024)
                                              ]),
                                              _: 2
                                            }, 1032, ["value", "onClick"]);
                                          }), 128))
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VBtn, {
                                        class: "w-full",
                                        variant: "text",
                                        onClick: listPublicRooms
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(" 刷新 "),
                                          createVNode(VIcon, null, {
                                            default: withCtx(() => [
                                              createTextVNode("mdi-refresh")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VBtn, {
                                        class: "w-full",
                                        variant: "text",
                                        onClick: ($event) => tab.value = 0
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(" 返回 "),
                                          createVNode(VIcon, null, {
                                            default: withCtx(() => [
                                              createTextVNode("mdi-arrow-right")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      }, 8, ["onClick"])
                                    ])
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VWindow, {
                            modelValue: unref(tab),
                            "onUpdate:modelValue": ($event) => isRef(tab) ? tab.value = $event : null,
                            class: "xl:w-[38%] lg:w-[48%] w-[90%]"
                          }, {
                            default: withCtx(() => [
                              createVNode(VWindowItem, {
                                class: "w-full",
                                value: "0"
                              }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "flex flex-col flex-wrap items-stretch w-full gap-2 p-4 pt-0" }, [
                                    createVNode(VBtn, {
                                      color: "primary",
                                      density: "default",
                                      size: "x-large",
                                      title: "快速加入随机房间",
                                      variant: "flat"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("快速加入 ")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode("div", { class: "flex flex-col lg:flex-row flex-wrap items-stretch w-full gap-2" }, [
                                      createVNode(VBtn, {
                                        class: "grow",
                                        color: "primary",
                                        density: "compact",
                                        size: "x-large",
                                        title: "查看公开房间",
                                        variant: "flat",
                                        onClick: ($event) => tab.value = 2
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("房间列表 ")
                                        ]),
                                        _: 1
                                      }, 8, ["onClick"]),
                                      createVNode(VBtn, {
                                        class: "grow",
                                        color: "primary",
                                        density: "compact",
                                        size: "x-large",
                                        title: "创建一个房间",
                                        variant: "flat",
                                        onClick: ($event) => tab.value = 1
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("创建房间 ")
                                        ]),
                                        _: 1
                                      }, 8, ["onClick"])
                                    ]),
                                    createVNode(VBtn, {
                                      color: "primary",
                                      density: "compact",
                                      size: "x-large",
                                      title: "前往游戏设置",
                                      to: "/settings",
                                      variant: "flat"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" 设置 ")
                                      ]),
                                      _: 1
                                    })
                                  ])
                                ]),
                                _: 1
                              }),
                              createVNode(VWindowItem, { value: "1" }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "p-4 pt-0" }, [
                                    createVNode(VCheckbox, {
                                      label: "私密房间",
                                      modelValue: unref(isPrivate),
                                      "onUpdate:modelValue": ($event) => isRef(isPrivate) ? isPrivate.value = $event : null,
                                      "hide-details": ""
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                    createVNode(VBtn, {
                                      disabled: unref(isCreatingRoom) || unref(currentRoomCode) !== "",
                                      loading: unref(isCreatingRoom),
                                      class: "w-full mb-3",
                                      color: "primary",
                                      size: "x-large",
                                      variant: "flat",
                                      onClick: createRoomCallback
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(unref(currentRoomCode) ? `房间代码: ${unref(currentRoomCode)}` : "创建房间"), 1)
                                      ]),
                                      _: 1
                                    }, 8, ["disabled", "loading"]),
                                    createVNode(VBtn, {
                                      class: "w-full",
                                      variant: "text",
                                      onClick: ($event) => tab.value = 0
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VIcon, null, {
                                          default: withCtx(() => [
                                            createTextVNode("mdi-arrow-left")
                                          ]),
                                          _: 1
                                        }),
                                        createTextVNode(" 返回 ")
                                      ]),
                                      _: 1
                                    }, 8, ["onClick"])
                                  ])
                                ]),
                                _: 1
                              }),
                              createVNode(VWindowItem, { value: "2" }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "p-4 pt-0" }, [
                                    createVNode("p", { class: "w-full text-left text-2xl font-bold" }, "公开房间列表"),
                                    unref(publicRooms).length === 0 ? (openBlock(), createBlock("p", {
                                      key: 0,
                                      class: "w-full text-left text-sm text-gray-500 mt-2"
                                    }, "暂无房间...")) : createCommentVNode("", true),
                                    createVNode(VList, null, {
                                      default: withCtx(() => [
                                        (openBlock(true), createBlock(Fragment, null, renderList(unref(publicRooms), (room) => {
                                          return openBlock(), createBlock(VListItem, {
                                            key: room.code,
                                            value: room.code,
                                            class: "py-3",
                                            onClick: ($event) => {
                                              unref(router).push(`/room/${room.code}`);
                                            }
                                          }, {
                                            append: withCtx(() => [
                                              createVNode(VListItemAction, { class: "flex-column align-end" }, {
                                                default: withCtx(() => [
                                                  createVNode("small", { class: "mb-4 text-high-emphasis opacity-60" }, "点击加入"),
                                                  createVNode(VSpacer),
                                                  createVNode(_component_Icon, {
                                                    class: "w-6 h-6",
                                                    name: "material-symbols:arrow-right-alt-rounded"
                                                  })
                                                ]),
                                                _: 1
                                              })
                                            ]),
                                            default: withCtx(() => [
                                              createVNode(VListItemTitle, null, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(room.code), 1)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(VListItemSubtitle, { class: "mb-1 text-high-emphasis opacity-100" }, {
                                                default: withCtx(() => [
                                                  createTextVNode("房主：" + toDisplayString(room.owner), 1)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(VListItemSubtitle, { class: "text-high-emphasis" }, {
                                                default: withCtx(() => [
                                                  createTextVNode("人数：" + toDisplayString(room.memberCount), 1)
                                                ]),
                                                _: 2
                                              }, 1024)
                                            ]),
                                            _: 2
                                          }, 1032, ["value", "onClick"]);
                                        }), 128))
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VBtn, {
                                      class: "w-full",
                                      variant: "text",
                                      onClick: listPublicRooms
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" 刷新 "),
                                        createVNode(VIcon, null, {
                                          default: withCtx(() => [
                                            createTextVNode("mdi-refresh")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VBtn, {
                                      class: "w-full",
                                      variant: "text",
                                      onClick: ($event) => tab.value = 0
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" 返回 "),
                                        createVNode(VIcon, null, {
                                          default: withCtx(() => [
                                            createTextVNode("mdi-arrow-right")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    }, 8, ["onClick"])
                                  ])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VExpansionPanelText, { class: "expansion-panel-text" }, {
                      default: withCtx(() => [
                        createVNode(VWindow, {
                          modelValue: unref(tab),
                          "onUpdate:modelValue": ($event) => isRef(tab) ? tab.value = $event : null,
                          class: "xl:w-[38%] lg:w-[48%] w-[90%]"
                        }, {
                          default: withCtx(() => [
                            createVNode(VWindowItem, {
                              class: "w-full",
                              value: "0"
                            }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "flex flex-col flex-wrap items-stretch w-full gap-2 p-4 pt-0" }, [
                                  createVNode(VBtn, {
                                    color: "primary",
                                    density: "default",
                                    size: "x-large",
                                    title: "快速加入随机房间",
                                    variant: "flat"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("快速加入 ")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode("div", { class: "flex flex-col lg:flex-row flex-wrap items-stretch w-full gap-2" }, [
                                    createVNode(VBtn, {
                                      class: "grow",
                                      color: "primary",
                                      density: "compact",
                                      size: "x-large",
                                      title: "查看公开房间",
                                      variant: "flat",
                                      onClick: ($event) => tab.value = 2
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("房间列表 ")
                                      ]),
                                      _: 1
                                    }, 8, ["onClick"]),
                                    createVNode(VBtn, {
                                      class: "grow",
                                      color: "primary",
                                      density: "compact",
                                      size: "x-large",
                                      title: "创建一个房间",
                                      variant: "flat",
                                      onClick: ($event) => tab.value = 1
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("创建房间 ")
                                      ]),
                                      _: 1
                                    }, 8, ["onClick"])
                                  ]),
                                  createVNode(VBtn, {
                                    color: "primary",
                                    density: "compact",
                                    size: "x-large",
                                    title: "前往游戏设置",
                                    to: "/settings",
                                    variant: "flat"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" 设置 ")
                                    ]),
                                    _: 1
                                  })
                                ])
                              ]),
                              _: 1
                            }),
                            createVNode(VWindowItem, { value: "1" }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "p-4 pt-0" }, [
                                  createVNode(VCheckbox, {
                                    label: "私密房间",
                                    modelValue: unref(isPrivate),
                                    "onUpdate:modelValue": ($event) => isRef(isPrivate) ? isPrivate.value = $event : null,
                                    "hide-details": ""
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                  createVNode(VBtn, {
                                    disabled: unref(isCreatingRoom) || unref(currentRoomCode) !== "",
                                    loading: unref(isCreatingRoom),
                                    class: "w-full mb-3",
                                    color: "primary",
                                    size: "x-large",
                                    variant: "flat",
                                    onClick: createRoomCallback
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(unref(currentRoomCode) ? `房间代码: ${unref(currentRoomCode)}` : "创建房间"), 1)
                                    ]),
                                    _: 1
                                  }, 8, ["disabled", "loading"]),
                                  createVNode(VBtn, {
                                    class: "w-full",
                                    variant: "text",
                                    onClick: ($event) => tab.value = 0
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VIcon, null, {
                                        default: withCtx(() => [
                                          createTextVNode("mdi-arrow-left")
                                        ]),
                                        _: 1
                                      }),
                                      createTextVNode(" 返回 ")
                                    ]),
                                    _: 1
                                  }, 8, ["onClick"])
                                ])
                              ]),
                              _: 1
                            }),
                            createVNode(VWindowItem, { value: "2" }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "p-4 pt-0" }, [
                                  createVNode("p", { class: "w-full text-left text-2xl font-bold" }, "公开房间列表"),
                                  unref(publicRooms).length === 0 ? (openBlock(), createBlock("p", {
                                    key: 0,
                                    class: "w-full text-left text-sm text-gray-500 mt-2"
                                  }, "暂无房间...")) : createCommentVNode("", true),
                                  createVNode(VList, null, {
                                    default: withCtx(() => [
                                      (openBlock(true), createBlock(Fragment, null, renderList(unref(publicRooms), (room) => {
                                        return openBlock(), createBlock(VListItem, {
                                          key: room.code,
                                          value: room.code,
                                          class: "py-3",
                                          onClick: ($event) => {
                                            unref(router).push(`/room/${room.code}`);
                                          }
                                        }, {
                                          append: withCtx(() => [
                                            createVNode(VListItemAction, { class: "flex-column align-end" }, {
                                              default: withCtx(() => [
                                                createVNode("small", { class: "mb-4 text-high-emphasis opacity-60" }, "点击加入"),
                                                createVNode(VSpacer),
                                                createVNode(_component_Icon, {
                                                  class: "w-6 h-6",
                                                  name: "material-symbols:arrow-right-alt-rounded"
                                                })
                                              ]),
                                              _: 1
                                            })
                                          ]),
                                          default: withCtx(() => [
                                            createVNode(VListItemTitle, null, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(room.code), 1)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(VListItemSubtitle, { class: "mb-1 text-high-emphasis opacity-100" }, {
                                              default: withCtx(() => [
                                                createTextVNode("房主：" + toDisplayString(room.owner), 1)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(VListItemSubtitle, { class: "text-high-emphasis" }, {
                                              default: withCtx(() => [
                                                createTextVNode("人数：" + toDisplayString(room.memberCount), 1)
                                              ]),
                                              _: 2
                                            }, 1024)
                                          ]),
                                          _: 2
                                        }, 1032, ["value", "onClick"]);
                                      }), 128))
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VBtn, {
                                    class: "w-full",
                                    variant: "text",
                                    onClick: listPublicRooms
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" 刷新 "),
                                      createVNode(VIcon, null, {
                                        default: withCtx(() => [
                                          createTextVNode("mdi-refresh")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VBtn, {
                                    class: "w-full",
                                    variant: "text",
                                    onClick: ($event) => tab.value = 0
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" 返回 "),
                                      createVNode(VIcon, null, {
                                        default: withCtx(() => [
                                          createTextVNode("mdi-arrow-right")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }, 8, ["onClick"])
                                ])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VExpansionPanel, { elevation: "0" }, {
                default: withCtx(() => [
                  createVNode(VExpansionPanelText, { class: "expansion-panel-text" }, {
                    default: withCtx(() => [
                      createVNode(VWindow, {
                        modelValue: unref(tab),
                        "onUpdate:modelValue": ($event) => isRef(tab) ? tab.value = $event : null,
                        class: "xl:w-[38%] lg:w-[48%] w-[90%]"
                      }, {
                        default: withCtx(() => [
                          createVNode(VWindowItem, {
                            class: "w-full",
                            value: "0"
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "flex flex-col flex-wrap items-stretch w-full gap-2 p-4 pt-0" }, [
                                createVNode(VBtn, {
                                  color: "primary",
                                  density: "default",
                                  size: "x-large",
                                  title: "快速加入随机房间",
                                  variant: "flat"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("快速加入 ")
                                  ]),
                                  _: 1
                                }),
                                createVNode("div", { class: "flex flex-col lg:flex-row flex-wrap items-stretch w-full gap-2" }, [
                                  createVNode(VBtn, {
                                    class: "grow",
                                    color: "primary",
                                    density: "compact",
                                    size: "x-large",
                                    title: "查看公开房间",
                                    variant: "flat",
                                    onClick: ($event) => tab.value = 2
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("房间列表 ")
                                    ]),
                                    _: 1
                                  }, 8, ["onClick"]),
                                  createVNode(VBtn, {
                                    class: "grow",
                                    color: "primary",
                                    density: "compact",
                                    size: "x-large",
                                    title: "创建一个房间",
                                    variant: "flat",
                                    onClick: ($event) => tab.value = 1
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("创建房间 ")
                                    ]),
                                    _: 1
                                  }, 8, ["onClick"])
                                ]),
                                createVNode(VBtn, {
                                  color: "primary",
                                  density: "compact",
                                  size: "x-large",
                                  title: "前往游戏设置",
                                  to: "/settings",
                                  variant: "flat"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" 设置 ")
                                  ]),
                                  _: 1
                                })
                              ])
                            ]),
                            _: 1
                          }),
                          createVNode(VWindowItem, { value: "1" }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "p-4 pt-0" }, [
                                createVNode(VCheckbox, {
                                  label: "私密房间",
                                  modelValue: unref(isPrivate),
                                  "onUpdate:modelValue": ($event) => isRef(isPrivate) ? isPrivate.value = $event : null,
                                  "hide-details": ""
                                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                createVNode(VBtn, {
                                  disabled: unref(isCreatingRoom) || unref(currentRoomCode) !== "",
                                  loading: unref(isCreatingRoom),
                                  class: "w-full mb-3",
                                  color: "primary",
                                  size: "x-large",
                                  variant: "flat",
                                  onClick: createRoomCallback
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(unref(currentRoomCode) ? `房间代码: ${unref(currentRoomCode)}` : "创建房间"), 1)
                                  ]),
                                  _: 1
                                }, 8, ["disabled", "loading"]),
                                createVNode(VBtn, {
                                  class: "w-full",
                                  variant: "text",
                                  onClick: ($event) => tab.value = 0
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VIcon, null, {
                                      default: withCtx(() => [
                                        createTextVNode("mdi-arrow-left")
                                      ]),
                                      _: 1
                                    }),
                                    createTextVNode(" 返回 ")
                                  ]),
                                  _: 1
                                }, 8, ["onClick"])
                              ])
                            ]),
                            _: 1
                          }),
                          createVNode(VWindowItem, { value: "2" }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "p-4 pt-0" }, [
                                createVNode("p", { class: "w-full text-left text-2xl font-bold" }, "公开房间列表"),
                                unref(publicRooms).length === 0 ? (openBlock(), createBlock("p", {
                                  key: 0,
                                  class: "w-full text-left text-sm text-gray-500 mt-2"
                                }, "暂无房间...")) : createCommentVNode("", true),
                                createVNode(VList, null, {
                                  default: withCtx(() => [
                                    (openBlock(true), createBlock(Fragment, null, renderList(unref(publicRooms), (room) => {
                                      return openBlock(), createBlock(VListItem, {
                                        key: room.code,
                                        value: room.code,
                                        class: "py-3",
                                        onClick: ($event) => {
                                          unref(router).push(`/room/${room.code}`);
                                        }
                                      }, {
                                        append: withCtx(() => [
                                          createVNode(VListItemAction, { class: "flex-column align-end" }, {
                                            default: withCtx(() => [
                                              createVNode("small", { class: "mb-4 text-high-emphasis opacity-60" }, "点击加入"),
                                              createVNode(VSpacer),
                                              createVNode(_component_Icon, {
                                                class: "w-6 h-6",
                                                name: "material-symbols:arrow-right-alt-rounded"
                                              })
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        default: withCtx(() => [
                                          createVNode(VListItemTitle, null, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(room.code), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(VListItemSubtitle, { class: "mb-1 text-high-emphasis opacity-100" }, {
                                            default: withCtx(() => [
                                              createTextVNode("房主：" + toDisplayString(room.owner), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(VListItemSubtitle, { class: "text-high-emphasis" }, {
                                            default: withCtx(() => [
                                              createTextVNode("人数：" + toDisplayString(room.memberCount), 1)
                                            ]),
                                            _: 2
                                          }, 1024)
                                        ]),
                                        _: 2
                                      }, 1032, ["value", "onClick"]);
                                    }), 128))
                                  ]),
                                  _: 1
                                }),
                                createVNode(VBtn, {
                                  class: "w-full",
                                  variant: "text",
                                  onClick: listPublicRooms
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" 刷新 "),
                                    createVNode(VIcon, null, {
                                      default: withCtx(() => [
                                        createTextVNode("mdi-refresh")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(VBtn, {
                                  class: "w-full",
                                  variant: "text",
                                  onClick: ($event) => tab.value = 0
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" 返回 "),
                                    createVNode(VIcon, null, {
                                      default: withCtx(() => [
                                        createTextVNode("mdi-arrow-right")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }, 8, ["onClick"])
                              ])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-81cdea52"]]);

export { index as default };
//# sourceMappingURL=index.vue.mjs.map
