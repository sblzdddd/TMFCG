import { p as propsFactory, C as getCurrentInstance, j as convertToUnit, N as templateRef } from './server.mjs';
import { computed, ref, readonly } from 'vue';

const makeComponentProps = propsFactory({
  class: [String, Array, Object],
  style: {
    type: [String, Array, Object],
    default: null
  }
}, "component");

function useRender(render) {
  const vm = getCurrentInstance("useRender");
  vm.render = render;
}

const makeDimensionProps = propsFactory({
  height: [Number, String],
  maxHeight: [Number, String],
  maxWidth: [Number, String],
  minHeight: [Number, String],
  minWidth: [Number, String],
  width: [Number, String]
}, "dimension");
function useDimension(props) {
  const dimensionStyles = computed(() => {
    const styles = {};
    const height = convertToUnit(props.height);
    const maxHeight = convertToUnit(props.maxHeight);
    const maxWidth = convertToUnit(props.maxWidth);
    const minHeight = convertToUnit(props.minHeight);
    const minWidth = convertToUnit(props.minWidth);
    const width = convertToUnit(props.width);
    if (height != null) styles.height = height;
    if (maxHeight != null) styles.maxHeight = maxHeight;
    if (maxWidth != null) styles.maxWidth = maxWidth;
    if (minHeight != null) styles.minHeight = minHeight;
    if (minWidth != null) styles.minWidth = minWidth;
    if (width != null) styles.width = width;
    return styles;
  });
  return {
    dimensionStyles
  };
}

const makeTagProps = propsFactory({
  tag: {
    type: String,
    default: "div"
  }
}, "tag");

function useResizeObserver(callback) {
  const resizeRef = templateRef();
  const contentRect = ref();
  return {
    resizeRef,
    contentRect: readonly(contentRect)
  };
}

export { makeDimensionProps as a, useDimension as b, makeTagProps as c, useResizeObserver as d, makeComponentProps as m, useRender as u };
//# sourceMappingURL=resizeObserver.mjs.map
