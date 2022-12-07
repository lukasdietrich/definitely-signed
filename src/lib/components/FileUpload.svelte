<script lang="ts">
	import {createEventDispatcher} from 'svelte';

	export let accept: string = 'image/*';
	export let capture: 'environment' | 'user' | null = null;


	const dispatch = createEventDispatcher();
	const id = Math.random().toString(16);

	let files: FileList;

	$: if (files?.length > 0) {
		dispatch('file', files[0]);
	}
</script>

<div class="bg-gray-50 text-gray-400 text-lg font-semibold rounded shadow-inner">
	<label
		for={id}
		class="block w-full p-5 text-center cursor-pointer"
	>
		<slot />
	</label>
	<input {id} class="hidden" type="file" {accept} {capture} bind:files />
</div>
