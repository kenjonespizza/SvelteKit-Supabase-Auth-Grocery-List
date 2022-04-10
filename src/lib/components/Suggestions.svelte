<script>
	import { getNotificationsContext } from 'svelte-notifications';
	const { addNotification } = getNotificationsContext();
	import { fly } from 'svelte/transition';
	import emojis from '$lib/emojis';
	import { addItem, showSuggestions } from '$lib/stores';
	import { UCFirst } from '$lib/utils';
</script>

{#if $showSuggestions}
	<div
		transition:fly={{ y: -80, opacity: 0, duration: 300 }}
		class={`absolute w-full p-4 bg-gray-900 flex gap-4 overflow-x-scroll`}
	>
		{#each emojis as emoji, i}
			<button
				on:click={() => {
					addNotification({
						text: `${UCFirst(emoji.description)} Added`,
						position: 'bottom-right',
						type: 'success',
						removeAfter: 3000
					});
					addItem(emoji.description);
				}}
				value={emoji.description}
				class="aspect-square rounded-xl text-2xl"
				>{@html emoji.code}<span class="sr-only">{emoji.description}</span></button
			>
		{/each}
	</div>
{/if}
