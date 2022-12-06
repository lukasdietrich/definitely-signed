<script lang="ts">
	import type {State} from 'src/lib/types';
	import SignatureUpload from 'src/view/SignatureUpload.svelte';
	import SignatureCrop from 'src/view/SignatureCrop.svelte';
	import SignatureClean from 'src/view/SignatureClean.svelte';
	import DocumentUpload from 'src/view/DocumentUpload.svelte';
	import DocumentEdit from 'src/view/DocumentEdit.svelte';

	const views = [
		{
			title: 'Upload Signature',
			component: SignatureUpload,
		},
		{
			title: 'Crop Signature',
			component: SignatureCrop,
		},
		{
			title: 'Clean Signature',
			component: SignatureClean,
		},
		{
			title: 'Upload Document',
			component: DocumentUpload,
		},
		{
			title: 'Edit Document',
			component: DocumentEdit,
		},
	];

	let currentIndex = 0;
	let state: State = {};

	function handleNext({detail}: CustomEvent<State>) {
		state = detail;
		currentIndex++;
	}
</script>

<svelte:head>
	<title>({currentIndex+1}/{views.length}) {views[currentIndex].title}</title>
</svelte:head>

<main>
	<header class="bg-indigo-200 text-slate-600 text-2xl">
		<h1 class="p-5 font-semibold">Definitely Signed</h1>
	</header>

	<nav class="bg-indigo-50 text-slate-500">
		<ol class="flex space-x-5 px-5 py-2">
			{#each views as view, index}
				<li>
					<button
						class="opacity-30 enabled:opacity-100"
						class:font-semibold={index === currentIndex}
						on:click={() => currentIndex = index}
						disabled={index > currentIndex}
					>
						{index + 1}. {view.title}
					</button>
				</li>
			{/each}
		</ol>
	</nav>

	<div class="max-w-screen-md m-x-auto my-5">
		<svelte:component this={views[currentIndex].component} {state} on:next={handleNext} />
	</div>
</main>
