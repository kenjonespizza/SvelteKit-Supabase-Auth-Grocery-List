<script>
	import { getNotificationsContext } from 'svelte-notifications';
	const { addNotification } = getNotificationsContext();
	import { updateItemQuantity } from '$lib/stores';
	import { UCFirst } from '$lib/utils';

	export let item;

	const manuallyUpdate = (e) => {
		let num = e.target.value;
		num = Number(num);
		if (!isNaN(num)) {
			updateItemQuantity(item.id, Number(e.target.value));
		} else {
			e.target.value = item.quantity;
		}
	};
</script>

<div class="flex space-x-2">
	<button
		on:click={() => {
			updateItemQuantity(item.id, item.quantity - 1);
			if (item.quantity <= 1) {
				addNotification({
					text: `${UCFirst(item.text)} Removed`,
					position: 'bottom-right',
					type: 'danger',
					removeAfter: 3000
				});
			}
		}}
		class="text-gray-600"
	>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
			><path fill="none" d="M0 0h24v24H0z" /><path fill="currentColor" d="M5 11h14v2H5z" /></svg
		>
	</button>
	<input
		value={item.quantity}
		type="text"
		class="w-20 text-center shadow-xl shadow-cyan-500/10 focus:ring-cyan-500 focus:border-cyan-500 text-white block sm:text-xl bg-gray-900 border-cyan-900 border-2 rounded-md py-3 px-4 capitalize focus:shadow-2xl focus:shadow-cyan-500/10 transition-all"
		on:change={manuallyUpdate}
	/>
	<button on:click={updateItemQuantity(item.id, item.quantity + 1)} class="text-gray-600">
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
			><path fill="none" d="M0 0h24v24H0z" /><path
				fill="currentColor"
				d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z"
			/></svg
		>
	</button>
</div>
