<script lang="ts">
	import type {State, Dimensions} from 'src/view/viewstate';
	import {onMount, createEventDispatcher} from 'svelte';
	import Button from 'src/lib/Button.svelte';

	export let state: State;

	const dispatch = createEventDispatcher();

	let canvasOriginal: HTMLCanvasElement;
	let canvasCleaned: HTMLCanvasElement;

	let image = state.signatureBitmapCropped;
	let threshold = 125;

	function keepPixel(r: number, g: number, b: number, threshold: number): boolean {
		const sum = r + g + b;
		const average = sum / 3;

		return average < threshold;
	}

	function filterPixels(pixels: Uint8ClampedArray, threshold: number): Uint8ClampedArray {
		const f = new Uint8ClampedArray(pixels.length);

		for (let i = 0; i < pixels.length; i += 4) {
			const r = pixels[i + 0];
			const g = pixels[i + 1];
			const b = pixels[i + 2];
			const a = pixels[i + 3];

			if (keepPixel(r, g, b, threshold)) {
				f[i + 0] = r;
				f[i + 1] = g;
				f[i + 2] = b;
				f[i + 3] = a;
			} else {
				f[i + 3] = 0;
			}
		}

		return f;
	}

	function filterImageData(image: ImageData, threshold: number): ImageData {
		const pixels = filterPixels(image.data, threshold);
		return new ImageData(pixels, image.width, image.height);
	}


	$: if (canvasOriginal && canvasCleaned) {
		const ctxOriginal = canvasOriginal.getContext('2d');
		const ctxCleaned = canvasCleaned.getContext('2d');

		const width = ctxOriginal.canvas.width;
		const height = ctxOriginal.canvas.height;

		const dataOriginal = ctxOriginal.getImageData(0, 0, width, height);
		const dataCleaned = filterImageData(dataOriginal, threshold);

		ctxCleaned.putImageData(dataCleaned, 0, 0);
	}

	function next() {
		const cleanedImage = canvasCleaned.toDataURL('image/png');

		const nextState: State = {
			...state,
			signatureBitmapCleaned: cleanedImage,
		};

		dispatch('next', nextState);
	}

	onMount(() => {
		const ctx = canvasOriginal.getContext('2d');
		ctx.drawImage(image, 0, 0);
	});
</script>

<div class="flex">
	<div>
		<canvas
			class="max-w-full mx-auto"
			bind:this={canvasOriginal}
			width={image.width}
			height={image.height}
		></canvas>
	</div>

	<div>
		<canvas
			class="max-w-full mx-auto"
			bind:this={canvasCleaned}
			width={image.width}
			height={image.height}
		></canvas>
	</div>
</div>

<input class="w-full my-5" type="range" min="0" max="255" step="1" bind:value={threshold} />
<Button on:click={next}>Next</Button>
