<script lang="ts">
	import type {State} from 'src/view/viewstate';
	import {createEventDispatcher} from 'svelte';
	import FileUpload from 'src/lib/FileUpload.svelte';

	export let state: State;

	const dispatch = createEventDispatcher();

	async function handleSelection({detail}: CustomEvent<File>) {
		const nextState: State = {
			...state,
			documentOriginal: await detail.arrayBuffer(),
		};

		dispatch('next', nextState);
	}
</script>

<FileUpload accept=".pdf" on:file={handleSelection} />
