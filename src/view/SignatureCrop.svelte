<script lang="ts">
	import type {State, Dimensions} from 'src/view/viewstate';
	import {createEventDispatcher} from 'svelte';
	import Cropper from 'src/lib/Cropper.svelte';
	import Button from 'src/lib/Button.svelte';

	export let state: State;

	const dispatch = createEventDispatcher();

	let x: number = 0;
	let y: number = 0;
	let w: number = state.signatureBitmapOriginal.width;
	let h: number = state.signatureBitmapOriginal.height;

	async function next() {
		const dimensions: Dimensions = {x, y, w, h};
		const cropped: ImageBitmap = await createImageBitmap(state.signatureBitmapOriginal, x, y, w, h);

		const nextState: State = {
			...state,
			signatureDimensionsCropped: dimensions,
			signatureBitmapCropped: cropped,
		};

		dispatch('next', nextState);
	}
</script>

<Cropper image={state.signatureBitmapOriginal} bind:x bind:y bind:w bind:h />
<Button on:click={next}>Next</Button>
