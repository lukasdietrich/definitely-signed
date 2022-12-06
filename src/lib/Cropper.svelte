<script lang="ts">
	import {onMount, tick} from 'svelte';
	import {DragContainer, DragBox} from './dragging';

	export let image: ImageBitmap;

	export let x: number;
	export let y: number;
	export let w: number;
	export let h: number;

	let canvas: HTMLCanvasElement;

	let containerWidth: number;
	let containerHeight: number;

	let croppedX: number;
	let croppedY: number;
	let croppedWidth: number;
	let croppedHeight: number;

	$: {
		x = croppedX / containerWidth * image.width;
		y = croppedY / containerHeight * image.height;
		w = croppedWidth / containerWidth * image.width;
		h = croppedHeight / containerHeight * image.height;
	}

	onMount(async () => {
		const ctx = canvas.getContext('2d');
		ctx.drawImage(image, 0, 0);
	});
</script>

<div class="mx-auto inline-block">
	<DragContainer
		bind:width={containerWidth}
		bind:height={containerHeight}
	>
		<canvas
			class="max-w-full"
			bind:this={canvas}
			width={image.width}
			height={image.height}
		></canvas>

		<DragBox
			keepRatio={false}
			bind:width={croppedWidth}
			bind:height={croppedHeight}
			bind:left={croppedX}
			bind:top={croppedY}
		/>
	</DragContainer>
</div>
