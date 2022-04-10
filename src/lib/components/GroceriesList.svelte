<script>
	import Item from '$lib/components/Item.svelte';
	import { groceries } from '$lib/stores';
	import { slide } from 'svelte/transition';
</script>

<div class="mt-14">
	<ul class="divide-y divide-gray-800">
		{#each $groceries as item, i}
			<li transition:slide>
				<Item {item} {i} />
			</li>
		{/each}
	</ul>
</div>
