
const { windowWidth, windowHeight } = useViewport();

export const getRandomBorderPosition = (element: HTMLElement, padding: number = 5) => {
  const border = Math.floor(Math.random() * 4);

  const elementRect = element.getBoundingClientRect();

  const yOffset = elementRect.top + elementRect.height + padding;
  const xOffset = elementRect.left + elementRect.width + padding;

  const heightRandom = Math.random() * windowHeight.value - yOffset;
  const widthRandom = Math.random() * windowWidth.value - xOffset;

  switch (border) {
    case 0: // Top
      return {
        x: widthRandom,
        y: 0 - yOffset,
      };
    case 1: // Right
      return {
        x: windowWidth.value + padding,
        y: heightRandom,
      };
    case 2: // Bottom
      return {
        x: widthRandom,
        y: windowHeight.value + padding,
      };
    case 3: // Left
      return {
        x: 0 - xOffset,
        y: heightRandom,
      };
    default: // Fallback to top
      return {
        x: widthRandom,
        y: 0 - yOffset,
      };
  }
};