<script lang="ts">
	import type {State, Dimensions} from 'src/lib/types';
	import {onMount, createEventDispatcher} from 'svelte';
	import {cleanImage} from 'src/lib/image';
	import {Button} from 'src/lib/components';

	export let state: State;

	const dispatch = createEventDispatcher();
	const image = state.signatureCropped;

	let canvasOriginal: HTMLCanvasElement;
	let canvasCleaned: HTMLCanvasElement;

	let threshold = 125;

	$: if (canvasOriginal && canvasCleaned) {
		const ctxOriginal = canvasOriginal.getContext('2d');
		const ctxCleaned = canvasCleaned.getContext('2d');

		const width = ctxOriginal.canvas.width;
		const height = ctxOriginal.canvas.height;

		const dataOriginal = ctxOriginal.getImageData(0, 0, width, height);
		const dataCleaned = cleanImage(dataOriginal, threshold);

		ctxCleaned.putImageData(dataCleaned, 0, 0);
	}

	function next() {
		const cleanedImage = canvasCleaned.toDataURL('image/png');

		const nextState: State = {
			...state,
			signatureCleaned: cleanedImage,
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
