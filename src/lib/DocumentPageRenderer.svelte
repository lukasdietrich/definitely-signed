<script lang="ts">
	import type {PDFPageProxy} from 'pdfjs-dist';

	export let w: number = 0;
	export let h: number = 0;
	export let page: PDFPageProxy;

	let canvas: HTMLCanvasElement;

	$: if (canvas && page) {
		const viewport = page.getViewport({scale: 2});
		canvas.width = viewport.width;
		canvas.height = viewport.height;

		const ctx = canvas.getContext('2d');
		page.render({canvasContext: ctx, viewport});
	}
</script>

<canvas class="max-w-full mx-auto" bind:this={canvas}></canvas>
