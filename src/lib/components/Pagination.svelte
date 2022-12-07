<script lang="ts">
	export let min: number = 1;
	export let max: number = 1;
	export let value: number = 1;
</script>

<style>
	button, span {
		@apply 'px-3 py-1 rounded';
	}

	button {
		@apply 'bg-gray-100 enabled:bg-blue-100 enabled:hover:bg-blue-200';
	}
</style>

<div class="flex space-x-5 justify-center">
	<button disabled={value <= min} on:click={() => value--}>&#8592;</button>
	<span>{value} / {max}</span>
	<button disabled={value >= max} on:click={() => value++}>&#8594;</button>
</div>
