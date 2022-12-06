<script lang="ts">
	import {createEventDispatcher} from 'svelte';

	export let accept: string = 'image/*';
	export let capture: 'environment' | 'user' | null = null;

	const dispatch = createEventDispatcher();
	let files: FileList;

	$: if (files?.length > 0) {
		dispatch('file', files[0]);
	}
</script>

<input type="file" {accept} {capture} bind:files />
