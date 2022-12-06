import type {Dimensions} from 'src/lib/types';

export function cropImage(image: ImageBitmapSource, {x, y, w, h}: Dimensions) {
	return createImageBitmap(image, x, y, w, h);
}

export function cleanImage(image: ImageData, threshold: number): ImageData {
	return mapPixels(image, pixel => {
		if (keepPixel(pixel, threshold)) {
			return pixel;
		}

		return {...pixel, a: 0};
	});
}

interface RGBA {
	r: number;
	g: number;
	b: number;
	a: number;
}

function keepPixel(pixel: RGBA, threshold: number): boolean {
	const {r, g, b} = pixel;
	const sum = r + g + b;
	const average = sum / 3;

	return average < threshold;
}

function mapPixels(image: ImageData, fn: (p: RGBA) => RGBA): ImageData {
	const d1 = image.data;
	const d2 = new Uint8ClampedArray(d1.length);

	for (let i = 0; i < d1.length; i += 4) {
		const p1 = {
			r: d1[i + 0],
			g: d1[i + 1],
			b: d1[i + 2],
			a: d1[i + 3],
		};

		const p2 = fn(p1);
		const {r, g, b, a} = p2;

		d2[i + 0] = r;
		d2[i + 1] = g;
		d2[i + 2] = b;
		d2[i + 3] = a;
	}

	return new ImageData(d2, image.width, image.height);
}
