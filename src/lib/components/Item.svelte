<script>
	import { getNotificationsContext } from 'svelte-notifications';
	const { addNotification } = getNotificationsContext();
	import { toggleItemCompleted, removeItem } from '$lib/stores';
	import emojis from '$lib/emojis';
	import QuantityToggle from '$lib/components/QuantityToggle.svelte';
	import { UCFirst } from '$lib/utils';

	function useEmojiIfApplicable(text) {
		const item = emojis.find((emoji) => emoji.description.includes(text));
		if (item) {
			return `${item.code} &nbsp;`;
		} else {
			return '';
		}
	}

	useEmojiIfApplicable('asdf');

	export let item;
	export let i;
</script>

<div class="py-4 text-white">
	<div class="relative flex justify-between w-full space-x-8">
		<div class="flex space-x-8 items-center">
			<div class="flex items-center h-5">
				<input
					checked={item.completed}
					id={`item-${i}`}
					aria-describedby={`item-${i}-description`}
					name={`item-${i}`}
					type="checkbox"
					class="focus:ring-cyan-500 h-6 w-6 text-cyan-600 border-text-gray-600 bg-transparent rounded cursor-pointer"
					on:change={() => {
						addNotification({
							text: `${UCFirst(item.text)} is ${item.completed ? 'not' : ''} in the cart`,
							position: 'bottom-right',
							type: item.completed ? 'warning' : 'success',
							removeAfter: 3000
						});
						toggleItemCompleted(item.id, item.completed);
					}}
				/>
			</div>
			<QuantityToggle {item} />
			<div class="ml-3 text-sm">
				<label
					for={`item-${i}`}
					class={`${
						item.completed ? 'line-through' : ''
					} font-medium text-gray-400 text-2xl cursor-pointer`}
					>{@html useEmojiIfApplicable(item.text)}<span class="capitalize">{item.text}</span></label
				>
			</div>
		</div>

		<button
			class="text-gray-600 hover:text-red-500 transition hover:animate-pulse"
			on:click={() => {
				addNotification({
					text: `${UCFirst(item.text)} Removed`,
					position: 'bottom-right',
					type: 'danger',
					removeAfter: 3000
				});
				removeItem(item.id);
			}}
		>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
				><path fill="none" d="M0 0h24v24H0z" /><path
					fill="currentColor"
					d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm-8 5v6h2v-6H9zm4 0v6h2v-6h-2zM9 4v2h6V4H9z"
				/></svg
			>
		</button>
	</div>
</div>
