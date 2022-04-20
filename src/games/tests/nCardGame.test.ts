import { expect, test } from '@playwright/test';
import { getUnsortedCardPairs } from '../nCardGame';

test('Should create an unsorted array of card pairs', () => {
	const pairs = getUnsortedCardPairs();
	expect(pairs.length).toBe(18);
});
