<script lang="ts">
	import type {State} from 'src/view/viewstate';
	import type {PDFDocumentProxy, PDFPageProxy} from 'pdfjs-dist';
	import {onMount} from 'svelte';
	import {getDocument} from 'pdfjs-dist';
	import {saveWithSignature} from 'src/lib/export';
	import {DragContainer, DragBox} from 'src/lib/dragging';
	import Button from 'src/lib/Button.svelte';
	import DocumentPageRenderer from 'src/lib/DocumentPageRenderer.svelte';

	export let state: State;

	let doc: PDFDocumentProxy;
	let page: PDFPageProxy;
	let pageNumber = 1;

	let containerWidth: number;
	let containerHeight: number;

	let signatureX: number;
	let signatureY: number;
	let signatureW = 100; 
	let signatureH = signatureW / state.signatureDimensionsCropped.w * state.signatureDimensionsCropped.h;

	$: if(doc) {
		loadPage(pageNumber);
	}

	async function loadPage(n: number) {
		page = await doc.getPage(n);
	}

	async function save() {
		const docOriginal = state.documentOriginal;
		const signatureUrl = state.signatureBitmapCleaned;
		const viewport = page.getViewport({scale: 1});

		const w = signatureW / containerWidth * viewport.width;
		const h = signatureH / containerHeight * viewport.height;
		const x = signatureX / containerWidth * viewport.width;
		const y = viewport.height - (signatureY / containerHeight * viewport.height) - h;

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
	<DragContainer bind:width={containerWidth} bind:height={containerHeight}>
		{#if doc && page}
			<DocumentPageRenderer {page} />
		{/if}

		<DragBox
			keepRatio={true}
			bind:left={signatureX}
			bind:top={signatureY}
			bind:width={signatureW}
			bind:height={signatureH}
		>
			<img class="w-full" alt="Signature" src={state.signatureBitmapCleaned} />
		</DragBox>
	</DragContainer>
</div>

<Button on:click={save}>Save</Button>
