import {createSpring, createTimeline} from 'animejs';
import { CARD_CONST } from '~/constants/card';

const {windowWidth: width, windowHeight: height} = useViewport();

const {debug} = useLogger('animation:card');

const calculateOpponentCardPositions = (opponentIndex: number, numOfCards: number) => {
	const {windowWidth, windowHeight} = {windowWidth: width.value, windowHeight: height.value};
	const cardHeight = windowHeight * CARD_CONST.opponentCard.height;
	const cardWidth = cardHeight * CARD_CONST.cardRatio;
	const gap = Math.min(
		cardWidth * CARD_CONST.maxGap,
		(opponentIndex > 0) ? windowWidth * 0.08 / numOfCards * 2 : windowWidth * 0.08 / numOfCards * 11,
		(windowWidth - cardWidth) / Math.max(numOfCards - 1, 1)
	);

	const totalCardsWidth = cardWidth + (numOfCards - 1) * gap;
	
	let startX = 0;
	let targetY = 0;
	let rotation = 0;

	switch(opponentIndex) {
		case 0: // Top opponent
			startX = (windowWidth - totalCardsWidth) / 2;
			targetY = CARD_CONST.opponentCard.top;
			rotation = 180;
			break;
		case 1: // Left opponent
			startX = CARD_CONST.opponentCard.side;
			targetY = (windowHeight - totalCardsWidth) / 2 - windowHeight * 0.1;
			rotation = 90;
			break;
		case 2: // Right opponent
			startX = windowWidth - cardWidth - CARD_CONST.opponentCard.side;
			targetY = (windowHeight - totalCardsWidth) / 2 - windowHeight * 0.1;
			rotation = -90;
			break;
	}

	debug(`Opponent ${opponentIndex} cards width=${cardWidth} gap=${gap} startX=${startX} targetY=${targetY}`);

	return {startX, targetY, cardWidth, cardHeight, gap, rotation};
}

export const animateOpponentCardDraw = (
	opponentIndex: number,
	cardsInDeck: HTMLElement[],
	cardElements: HTMLElement[],
	numOfNewCards: number,
	onComplete: () => void,
	isResizing: boolean = false,
) => {

	if(cardElements.length === 0) {
		onComplete();
		return;
	}

	let lastCard = cardElements[cardElements.length - 1];

	if (cardsInDeck.length !== 0) {
		lastCard = cardsInDeck[cardsInDeck.length - 1];
	}

	const lastCardRect = lastCard.getBoundingClientRect();

	if (cardElements.length === 0) {
		onComplete();
		return;
	}

	const {
		startX,
		targetY,
		cardWidth,
		cardHeight,
		gap,
		rotation
	} = calculateOpponentCardPositions(opponentIndex, cardElements.length);

	cardElements.forEach((element, index) => {
		element.style.position = 'absolute';
		element.style.zIndex = `${52 + index}`;
		if (index >= cardElements.length - numOfNewCards) {
			element.style.top = `${lastCardRect.top}px`;
			element.style.left = `${lastCardRect.left}px`;
			element.style.width = `${lastCardRect.width}px`;
			element.style.height = `${lastCardRect.width / CARD_CONST.cardRatio}px`;
		} else {
			if (opponentIndex === 0) {
				element.style.top = `${targetY}px`;	
			} else {
				element.style.left = `${startX}px`;
			}
			element.style.transform = `rotate(${rotation}deg)`;
			element.style.width = `${cardWidth}px`;
			element.style.height = `${cardHeight}px`;
		}
	});

	let _timeline = createTimeline({
		onComplete: () => {
			cardElements.forEach((element, index) => {
				element.style.position = 'absolute';
				element.style.zIndex = `${52 + index}`;
				if (opponentIndex === 0) {
					element.style.top = `${targetY}px`;
					element.style.left = `${startX + index * gap}px`;
				} else if (opponentIndex === 1) {
					element.style.top = `${targetY + index * gap}px`;
					element.style.left = `${startX}px`;
				} else {
					element.style.top = `${targetY + index * gap}px`;
					element.style.left = `${startX}px`;
				}
				element.style.width = `${cardWidth}px`;
				element.style.height = `${cardHeight}px`;
				element.style.transform = `rotate(${rotation}deg)`;
			});
			onComplete();
		},
	});

	const spring = createSpring({velocity: 0, stiffness: 70, damping: 18});
	if (isResizing) {
		spring.stiffness = 120;
		spring.damping = 20;
	}

	const oldCardTime = Math.min(300, 500 / (Math.abs(cardElements.length - numOfNewCards + 1)));
	console.log('oldCardTime', oldCardTime);
	for (let i = 0; i < cardElements.length - numOfNewCards; i++) {
		const position = {
			ease: spring,
			width: `${cardWidth}px`,
			height: `${cardHeight}px`,
			x: 0,
			y: 0,
			// this config is for cards at top (opponent 0)
			top: `${targetY}px`,
			left: `${startX + i * gap}px`,
			zIndex: `${52 + i}`,
			rotate: rotation,
		};

		if (opponentIndex !== 0) {
			position.top = `${targetY + i * gap}px`;
			position.left = `${startX}px`;
		}

		_timeline = _timeline.add(cardElements[i], position, (i * oldCardTime) * (isResizing ? 0.1 : 1));
	}

	const newCardTime = Math.min(600, 1000 / numOfNewCards);
	const newCardElements = cardElements.slice(cardElements.length - numOfNewCards);
	newCardElements.reverse().forEach((element, index) => {
		const position = {
			width: `${cardWidth}px`,
			height: `${cardHeight}px`,
			x: 0,
			y: 0,
			// this config is for cards at top (opponent 0)
			top: `${targetY}px`,
			left: `${startX + (cardElements.length - index - 1) * gap}px`,
			zIndex: `${52 + cardElements.length - index - 1}`,
			ease: spring,
			rotate: rotation,
		};

		if (opponentIndex !== 0) {
			position.top = `${targetY + (cardElements.length - index - 1) * gap}px`;
			position.left = `${startX}px`;
		}

		_timeline = _timeline.add(element, position, (index * newCardTime));
	});
}; 