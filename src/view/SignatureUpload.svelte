<script lang="ts">
	import type {State} from 'src/view/viewstate';
	import {createEventDispatcher} from 'svelte';
	import FileUpload from 'src/lib/FileUpload.svelte';

	const dispatch = createEventDispatcher();

	async function handleSelection({detail}: CustomEvent<File>) {
		const state: State = {
			signatureBitmapOriginal: await createImageBitmap(detail),
		};

		dispatch('next', state);
	}
</script>

<FileUpload accept="image/*" capture="environment" on:file={handleSelection} />
