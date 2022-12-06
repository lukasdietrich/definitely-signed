<script lang="ts">
	import type {Size} from 'src/types';
    import {setContext} from 'svelte';
    import {writable} from 'svelte/store';
	import {containerSizeKey} from 'src/lib/components/context';

    const contextStore = writable<Size>();

	export let size: Size = {
		w: 0,
		h: 0,
	};

    setContext(containerSizeKey, contextStore);
    $: contextStore.set(size);
</script>

<div class="w-full h-full" bind:clientWidth={size.w} bind:clientHeight={size.h}>
    <slot />
</div>
