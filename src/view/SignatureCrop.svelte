<script lang="ts">
	import type {State, Dimensions} from 'src/lib/types';
	import {createEventDispatcher} from 'svelte';
	import {zeroDimensions} from 'src/lib/zero';
	import {Cropper, Button} from 'src/lib/components';

	export let state: State;

	const dispatch = createEventDispatcher();
	const signature = state.signatureOriginal;

	let dimensions: Dimensions = {
		...zeroDimensions(),
		w: signature.width,
		h: signature.height,
	};

	async function next() {
		const {x, y, w, h} = dimensions;
		const cropped: ImageBitmap = await createImageBitmap(signature, x, y, w, h);

		const nextState: State = {
			...state,
			signatureCropped: cropped,
		};

		dispatch('next', nextState);
	}
</script>

<Cropper
	image={signature}
	bind:dimensions
/>
<Button on:click={next}>Next</Button>
