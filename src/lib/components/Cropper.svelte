<script lang="ts">
	import type {Dimensions, Size} from 'src/lib/types';
	import {onMount, tick} from 'svelte';
	import {DragContainer, DragBox} from 'src/lib/components';

	export let image: ImageBitmap;
	export let dimensions: Dimensions;

	let canvas: HTMLCanvasElement;

	let containerSize: Size = {w: 0, h: 0};
	let croppedDimensions: Dimensions = {x: 0, y: 0, w: 0, h: 0};

	$: {
		dimensions = {
			x: croppedDimensions.x / containerSize.w * image.width,
			y: croppedDimensions.y / containerSize.h * image.height,
			w: croppedDimensions.w / containerSize.w * image.width,
			h: croppedDimensions.h / containerSize.h * image.height,
		};
	}

	onMount(async () => {
		const ctx = canvas.getContext('2d');
		ctx.drawImage(image, 0, 0);

		croppedDimensions.w = containerSize.w;
		croppedDimensions.h = containerSize.h;
	});
</script>

<div class="mx-auto inline-block">
	<DragContainer bind:size={containerSize}>
		<canvas
			class="max-w-full"
			bind:this={canvas}
			width={image.width}
			height={image.height}
		></canvas>

		<DragBox keepRatio={false} bind:dimensions={croppedDimensions} />
	</DragContainer>
</div>
