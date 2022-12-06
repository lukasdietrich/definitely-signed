<script lang="ts">
	import type {State, Size, Dimensions} from 'src/lib/types';
	import type {PDFDocumentProxy, PDFPageProxy} from 'pdfjs-dist';
	import {onMount} from 'svelte';
	import {getDocument} from 'pdfjs-dist';
	import {zeroSize, zeroDimensions} from 'src/lib/zero';
	import {saveWithSignature} from 'src/lib/export';
	import {Button, DocumentPageRenderer, DragContainer, DragBox} from 'src/lib/components';

	export let state: State;

	let doc: PDFDocumentProxy;
	let page: PDFPageProxy;
	let pageNumber = 1;

	let containerSize: Size = zeroSize();
	let signatureDimensions: Dimensions = {
		...zeroDimensions(),
		w: 100,
		h: 100 / state.signatureCropped.width * state.signatureCropped.height,
	};

	$: if(doc) {
		loadPage(pageNumber);
	}

	async function loadPage(n: number) {
		page = await doc.getPage(n);
	}

	async function save() {
		const docOriginal = state.documentOriginal;
		const signatureUrl = state.signatureCleaned;
		const viewport = page.getViewport({scale: 1});

		const w = signatureDimensions.w / containerSize.w * viewport.width;
		const h = signatureDimensions.h / containerSize.h * viewport.height;
		const x = signatureDimensions.x / containerSize.w * viewport.width;
		const y = viewport.height - (signatureDimensions.y / containerSize.h * viewport.height) - h;

		const exportUrl = await saveWithSignature(docOriginal, signatureUrl, x, y, w, h);
		window.open(exportUrl, '_blank');
	}

	onMount(async () => {
		doc = await getDocument(state.documentOriginal).promise;
	});
</script>

{#if doc}
	<div class="mb-5 flex space-x-3">
		<span>Page</span>
		<input
			class="w-18 px-2 border rounded"
			type="number"
			min="1"
			max={doc.numPages}
			bind:value={pageNumber}
		/>
	</div>
{/if}

<div class="border">
	<DragContainer bind:size={containerSize}>
		{#if doc && page}
			<DocumentPageRenderer {page} />
		{/if}

		<DragBox keepRatio={true} bind:dimensions={signatureDimensions}>
			<img class="w-full" alt="Signature" src={state.signatureCleaned} />
		</DragBox>
	</DragContainer>
</div>

<Button on:click={save}>Save</Button>
