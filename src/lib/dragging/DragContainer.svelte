<script lang="ts">
    import type {Container} from './context';
    import {setContext} from 'svelte';
    import {key} from './context';
    import {writable} from 'svelte/store';

    const contextStore = writable<Container>();

    export let width: number = 0;
    export let height: number = 0;

    setContext(key, contextStore);

    $: contextStore.set({width, height});
</script>

<div class="w-full h-full" bind:clientWidth={width} bind:clientHeight={height}>
    <slot />
</div>
