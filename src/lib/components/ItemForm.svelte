<script>
	import { getNotificationsContext } from 'svelte-notifications';
	const { addNotification } = getNotificationsContext();

	import { addItem, showSuggestions } from '$lib/stores';
	import Suggestions from '$lib/components/Suggestions.svelte';

	let itemText = '';

	const toggle = () => showSuggestions.set(!$showSuggestions);

	const handleSubmit = () => {
		if (itemText.trim()) {
			addItem(itemText);
			addNotification({
				text: `${itemText} Added`,
				position: 'bottom-right',
				type: 'success',
				removeAfter: 3000
			});
			itemText = '';
		} else {
			itemText = '';
		}
	};
</script>

<h1 class="text-6xl font-bold text-white">Grocery List</h1>

<div class="mt-12 sticky top-4 z-10">
	<form action="" class="" on:submit|preventDefault={handleSubmit}>
		<div>
			<div class="mt-4 relative">
				<input
					bind:value={itemText}
					type="text"
					name="item"
					id="item"
					class="z-10 relative shadow-xl shadow-cyan-500/10 focus:ring-cyan-500 focus:border-cyan-500 text-white block w-full sm:text-xl bg-gray-900 border-cyan-900 border-2 rounded-md py-6 px-8 capitalize focus:shadow-2xl focus:shadow-cyan-500/10 transition-all"
					placeholder="What do you need..."
					aria-describedby="item-description"
				/>

				<button
					on:click={toggle}
					type="button"
					class={`${
						$showSuggestions ? 'bg-cyan-900' : 'bg-transparent'
					} z-20 absolute right-[15px] top-[15px] inline-flex items-center px-5 py-3 border border-cyan-900 text-md font-medium rounded-full shadow-sm text-gray-300 hover:border-cyan-600 focus:outline-none focus:border-cyan-600`}
					>{$showSuggestions ? 'Hide' : 'Show'} quick suggestions</button
				>
			</div>
		</div>
	</form>
	<Suggestions />
</div>
