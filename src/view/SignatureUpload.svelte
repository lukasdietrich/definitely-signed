<script lang="ts">
	import type {State} from 'src/lib/types';
	import {createEventDispatcher} from 'svelte';
	import {FileUpload} from 'src/lib/components';

	const dispatch = createEventDispatcher();

	async function handleSelection({detail}: CustomEvent<File>) {
		const state: State = {
			signatureOriginal: await createImageBitmap(detail),
		};

		dispatch('next', state);
	}
</script>

<FileUpload accept="image/*" capture="environment" on:file={handleSelection} />
