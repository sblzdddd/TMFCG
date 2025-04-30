import {createSpring, createTimeline} from 'animejs';

// const {windowWidth, windowHeight} = useViewport();
const getWindowSize = () => {
	const devicePixelRatio = 1;
	const windowWidth = window.innerWidth * devicePixelRatio;
	const windowHeight = window.innerHeight * devicePixelRatio;
	return {windowWidth, windowHeight};
};

const calculateCardPositions = (numOfCards: number) => {
	const {windowWidth, windowHeight} = getWindowSize();
	const cardHeight = windowHeight * ANIM_CONST.playerCard.height;
	const cardWidth = cardHeight * ANIM_CONST.cardRatio;
	const gap = Math.min(
								cardWidth * ANIM_CONST.maxGap,
								windowWidth * 0.08 / numOfCards * 11,
								(windowWidth - cardWidth) / Math.max(numOfCards - 1, 1) // cards fill the screen
							);

	const totalCardsWidth = cardWidth + (numOfCards - 1) * gap;
	const startX = (windowWidth - totalCardsWidth) / 2;

	const targetY = windowHeight - cardHeight - ANIM_CONST.playerCard.bottom;

	return {startX, targetY, cardWidth, cardHeight, gap};
}

export const animateCardDraw = (
	cardsInDeck: HTMLElement[],
	cardElements: HTMLElement[],
	targetIndexes: number[],
	onComplete: () => void,
	isResizing: boolean = false,
) => {

	let lastCard = cardElements[cardElements.length - 1];

	if (cardsInDeck.length !== 0) {
		lastCard = cardsInDeck[cardsInDeck.length - 1];
	}

	const lastCardRect = lastCard.getBoundingClientRect();

	const drawCardElements = cardElements.filter((element, index) => targetIndexes.includes(index));

	const cardFronts: HTMLDivElement[] = cardElements.map((element) => element.querySelector('div.card-front') as HTMLDivElement);
	const cardBacks: HTMLDivElement[] = cardElements.map((element) => element.querySelector('div.card-back') as HTMLDivElement);

	if (cardFronts.length === 0 || cardBacks.length === 0) {
		cardElements.forEach((element, index) => {
			element.style.position = 'absolute';
			element.style.zIndex = `${52 + index}`;
			element.style.top = `${targetY}px`;
			element.style.left = `${startX + index * gap}px`;
			element.style.width = `${cardWidth}px`;
			element.style.height = `${cardHeight}px`;
		});
		onComplete();
		return;
	}

	const {startX, targetY, cardWidth, cardHeight, gap} = calculateCardPositions(cardElements.length);

	cardElements.forEach((element, index) => {
		element.style.position = 'absolute';
		element.style.zIndex = `${52 + index}`;
		element.style.transform = `none`;
		if (targetIndexes.includes(index)) {
			element.style.top = `${lastCardRect.top}px`;
			element.style.left = `${lastCardRect.left}px`;
			element.style.width = `${lastCardRect.width}px`;
			element.style.height = `${lastCardRect.width / ANIM_CONST.cardRatio}px`;
			cardFronts[index].style.transform = `rotateY(-180deg)`;
			cardBacks[index].style.transform = `rotateY(0deg)`;
		} else {
			if (targetIndexes.length > 0) {
				element.style.top = `${targetY}px`;
				element.style.width = `${cardWidth}px`;
				element.style.height = `${cardHeight}px`;
			}
		}
	});

	// Create timeline animation
	let timeline = createTimeline({
		onComplete: () => {
			cardElements.forEach((element, index) => {
				element.style.position = 'absolute';
				element.style.zIndex = `${52 + index}`;
				element.style.top = `${targetY}px`;
				element.style.left = `${startX + index * gap}px`;
				element.style.width = `${cardWidth}px`;
				element.style.height = `${cardHeight}px`;
			});
			onComplete();
		},
	});

	const spring = createSpring({velocity: 0, stiffness: 70, damping: 18});
	if (isResizing) {
		spring.stiffness = 120;
		spring.damping = 20;
	}

	for (let i = 0; i < cardElements.length; i++) {
		if (targetIndexes.includes(i)) continue;
		let closestTargetIndex = 0;

		if (targetIndexes.length > 0) {
			// find the closest target index
			closestTargetIndex = targetIndexes.reduce((prev, curr) => {
				return (Math.abs(curr - i) < Math.abs(prev - i) ? curr : prev);
			}, targetIndexes[0]);
		}

		const time = Math.min(300, 500 / (Math.abs(cardElements.length - targetIndexes.length + 1)));
		console.log(time, cardElements.length, targetIndexes.length);
		timeline = timeline.add(cardElements[i], {
			ease: spring,
			position: 'absolute',
			top: `${targetY}px`,
			left: `${startX + i * gap}px`,
			width: `${cardWidth}px`,
			height: `${cardHeight}px`,
			x: 0,
			y: 0,
			zIndex: `${52 + i}`,
		}, Math.abs(closestTargetIndex - i) * time * (isResizing ? 0.1 : 1))
	}

	drawCardElements.reverse().forEach((element, index) => {
		const time = Math.min(600, 1000 / drawCardElements.length);
		console.log(time);
		// Add animations to timeline
		timeline = timeline.add(element, {
			top: `${targetY}px`,
			left: `${startX + targetIndexes[drawCardElements.length - index - 1] * gap}px`,
			width: `${cardWidth}px`,
			height: `${cardHeight}px`,
			x: 0,
			y: 0,
			zIndex: `${52 + targetIndexes[drawCardElements.length - index - 1]}`,
			ease: spring,
		}, (index * time))
			.add(cardFronts[targetIndexes[drawCardElements.length - index - 1]], {
				rotateY: 0,
				rotateX: 0,
				ease: spring,
			}, (index * time))
			.add(cardBacks[targetIndexes[drawCardElements.length - index - 1]], {
				rotateY: 180,
				rotateX: 0,
				ease: spring,
			}, (index * time))
	});
}; 