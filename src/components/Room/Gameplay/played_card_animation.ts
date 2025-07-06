// import {createSpring, createTimeline} from 'animejs';
import { CARD_CONST } from '~/constants/card';

const {windowWidth: width, windowHeight: height} = useViewport();

const {debug, info} = useLogger('animation:card');

const calculatePlayedCardPositions = (playerIndex: number, numOfCards: number) => {
  const {windowWidth, windowHeight} = {windowWidth: width.value, windowHeight: height.value};
  const cardHeight = windowHeight * CARD_CONST.playedCard.height;
  const cardWidth = cardHeight * CARD_CONST.cardRatio;

  const opponentCardHeight = windowHeight * CARD_CONST.opponentCard.height;
  const playerCardHeight = windowHeight * CARD_CONST.playerCard.height + CARD_CONST.playerCard.bottom;
	const gap = Math.min(
								cardWidth * CARD_CONST.playedCard.maxGap,
								windowWidth * 0.08 / numOfCards * 11,
								(windowWidth - cardWidth) / Math.max(numOfCards - 1, 1)
							);
  const totalCardsWidth = cardWidth + (numOfCards - 1) * gap;

  let targetX = 0;
  let targetY = 0;

  switch(playerIndex) {
    // Player
    case 0: {
      targetX = (windowWidth - totalCardsWidth) / 2;
      targetY = windowHeight - playerCardHeight - cardHeight - 10;
      break;
    }
    // Opponent 1
    case 1:
      targetX = (windowWidth - totalCardsWidth) / 2;
      targetY = opponentCardHeight + 10;
      break;
    // Opponent 2
    case 2:
      targetX = opponentCardHeight + 10;
      targetY = windowHeight / 2;
      break;
    // Opponent 3
    case 3:
      targetX = windowWidth - opponentCardHeight - 10;
      targetY = windowHeight / 2;
      break;
    default:
      targetX = windowWidth / 2;
      targetY = windowHeight / 2;
      break;
  }

  // Position played cards in the center of the table
  debug(`Played cards width=${cardWidth} targetX=${targetX} targetY=${targetY}`);

  return {targetX, targetY, cardWidth, cardHeight, gap};
};

export const animatePlayedCards = (
  playerIndex: number,
  onComplete: () => void = () => {},
) => {
  info(`start animatePlayedCards`);

  const playedCardElements = Array.from(document.querySelectorAll(`[id^="played-card-${playerIndex}"]`)) as HTMLElement[];
  if (playedCardElements.length === 0) {
    onComplete();
    return;
  }

  const {targetX, targetY, cardWidth, cardHeight, gap} = calculatePlayedCardPositions(playerIndex, playedCardElements.length);

  // // Get the source position based on whether it's current player or opponent
  // let sourceElement: HTMLElement | null = null;
  // if (isCurrentPlayer) {
  //   // For current player, get the last player card as reference
  //   sourceElement = document.querySelector('.player-card') as HTMLElement;
  // } else if (opponentIndex !== -1) {
  //   // For opponent, get their last card back as reference
  //   sourceElement = document.querySelector(`.opponent-${opponentIndex}-card`) as HTMLElement;
  // }

  // directly set final position
  playedCardElements.forEach((element, index) => {
    element.style.position = 'absolute';
    element.style.zIndex = `${100 + index}`;
    element.style.top = `${targetY}px`;
    element.style.left = `${targetX + index * gap}px`; // Slight offset for multiple cards
    element.style.width = `${cardWidth}px`;
    element.style.height = `${cardHeight}px`;
  });

  // const sourceRect = sourceElement?.getBoundingClientRect() || {
  //   top: targetY,
  //   left: targetX,
  //   width: cardWidth,
  //   height: cardHeight
  // };

  // // Set initial positions
  // playedCardElements.forEach((element, index) => {
  //   element.style.position = 'absolute';
  //   element.style.zIndex = `${100 + index}`;
  //   element.style.top = `${sourceRect.top}px`;
  //   element.style.left = `${sourceRect.left}px`;
  //   element.style.width = `${sourceRect.width}px`;
  //   element.style.height = `${sourceRect.height}px`;
  // });

  // const spring = createSpring({velocity: 0, stiffness: 70, damping: 18});

  // let _timeline = createTimeline({
  //   onComplete: () => {
  //     playedCardElements.forEach((element, index) => {
  //       element.style.position = 'absolute';
  //       element.style.zIndex = `${100 + index}`;
  //       element.style.top = `${targetY}px`;
  //       element.style.left = `${targetX + index * gap}px`; // Slight offset for multiple cards
  //       element.style.width = `${cardWidth}px`;
  //       element.style.height = `${cardHeight}px`;
  //     });
  //     info(`animatePlayedCards complete`);
  //     onComplete();
  //   },
  // });

  // // Animate each card with a slight delay
  // playedCardElements.forEach((element, index) => {
  //   _timeline = _timeline.add(element, {
  //     top: `${targetY}px`,
  //     left: `${targetX + index * gap}px`, // Slight offset for multiple cards
  //     width: `${cardWidth}px`,
  //     height: `${cardHeight}px`,
  //     ease: spring,
  //   }, index * 100); // 100ms delay between each card
  // });
};
