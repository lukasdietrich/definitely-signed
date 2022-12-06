import type {Position, Size, Dimensions} from 'src/lib/types';

export function zeroPosition(): Position {
	return {
		x: 0,
		y: 0,
	};
}

export function zeroSize(): Size {
	return {
		w: 0,
		h: 0,
	};
}

export function zeroDimensions(): Dimensions {
	return {
		...zeroPosition(),
		...zeroSize(),
	};
}
