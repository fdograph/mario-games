import { shuffle } from './helpers';

const prod = process.env.NODE_ENV === 'production';
const base = prod ? '/mario-games/' : '';
const MushroomCardImg = `${base}cards/mushroom.png`;
const FlowerCardImg = `${base}cards/flower.png`;
const Coin10CardImg = `${base}cards/coin10.png`;
const Coin20CardImg = `${base}cards/coin20.png`;
const StarCardImg = `${base}cards/star.png`;
const ChestCardImg = `${base}cards/chest.png`;
const BackfaceCardImg = `${base}cards/backface.png`;
const HighlightImg = `${base}cards/highlight.png`;

const CorrectMatchSound = `${base}sounds/correct-match.wav`;
const WrongMatchSound = `${base}sounds/wrong-match.wav`;

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
export const getHighlightImg = () => HighlightImg;

export const soundEffects = {
	correctMatch: () => new Audio(CorrectMatchSound),
	wrongMatch: () => new Audio(WrongMatchSound)
};

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
