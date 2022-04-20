import MushroomCardImg from './cards/mushroom.png';
import FlowerCardImg from './cards/flower.png';
import Coin10CardImg from './cards/coin10.png';
import Coin20CardImg from './cards/coin20.png';
import StarCardImg from './cards/star.png';
import ChestCardImg from './cards/chest.png';
import BackfaceCardImg from './cards/backface.png';
import { shuffle } from './helpers';

export enum CardType {
	MUSHROOM = 'ncard/MUSHROOM',
	FLOWER = 'ncard/FLOWER',
	COIN10 = 'ncard/COIN10',
	COIN20 = 'ncard/COIN20',
	STAR = 'ncard/STAR',
	CHEST = 'ncard/CHEST'
}

interface CardData {
	img: string;
	type: CardType;
	name: string;
}

export const getCarData = (type: CardType): CardData => {
	const name = `${type}`.replace('ncard/', '');
	switch (type) {
		case CardType.MUSHROOM:
			return { img: MushroomCardImg, type, name };
		case CardType.FLOWER:
			return { img: FlowerCardImg, type, name };
		case CardType.CHEST:
			return { img: ChestCardImg, type, name };
		case CardType.COIN10:
			return { img: Coin10CardImg, type, name };
		case CardType.COIN20:
			return { img: Coin20CardImg, type, name };
		case CardType.STAR:
			return { img: StarCardImg, type, name };
		default:
			throw 'Unknown card type';
	}
};

export const getBackfaceImg = () => BackfaceCardImg;

// export const getCardsData = (): CardData[] => {
// 	const cardDataMap = [];
//
// 	for (const type of Object.values(CardType)) {
// 		cardDataMap.push({ img: getCardImgUrl(type), type });
// 	}
//
// 	return cardDataMap;
// };

const selectTypes = (): { big: CardType[]; small: CardType[] } => {
	const types = shuffle([...Object.values(CardType)]);
	const half = Math.ceil(types.length / 2);
	return { big: types.slice(0, half), small: types.slice(-half) };
};

export const getUnsortedCardPairs = (): CardData[] => {
	const types = selectTypes();
	const bigList: CardData[] = [].concat(
		...types.big.map((cardType) => [
			getCarData(cardType),
			getCarData(cardType),
			getCarData(cardType),
			getCarData(cardType)
		])
	);
	const smallList: CardData[] = [].concat(
		...types.small.map((cardType) => [getCarData(cardType), getCarData(cardType)])
	);

	return shuffle([...bigList, ...smallList]);
};
