import { writable, get } from 'svelte/store';
import { scrollToBottom } from '$lib/utils';
import supabase from '$lib/supabase';

export const groceries = writable([]);
export const showSuggestions = writable(true);
export const user = writable([]);

export const loadItems = async () => {
	const { data: items, error } = await supabase.from('items').select('*');

	if (error) {
		console.error(error);
	}

	groceries.set(items);
};
loadItems();

export const loadUser = async () => {
	const _user = await supabase.auth.user();
	user.set(_user);
};
loadUser();

export const addItem = async (text) => {
	await loadUser(); // I beleive this is overkill... but the deployed site randomly hits a phantom 500 error... this is just a potential patch
	const _user = get(user);
	const { data: item, error } = await supabase
		.from('items')
		.insert([{ text: text.toLowerCase(), user_id: _user.id }]);

	if (error) {
		console.error(error);
	}

	groceries.update((groceries) => [...groceries, item[0]]);
	scrollToBottom();
};

export const removeItem = async (id) => {
	const { error } = await supabase.from('items').delete().eq('id', id);

	if (error) {
		console.error(error);
	}

	groceries.update((groceries) => groceries.filter((item) => item.id !== id));
};

export const toggleItemCompleted = async (id, currState) => {
	const { error } = await supabase.from('items').update({ completed: !currState }).eq('id', id);

	if (error) {
		console.error(error);
	}

	groceries.update((groceries) => {
		const i = groceries.findIndex((x) => x.id === id);
		if (i !== -1) {
			groceries[i].completed = !groceries[i].completed;
		}
		return groceries;
	});
};

export const updateItemQuantity = async (id, newQuantity) => {
	if (newQuantity < 1) {
		const { error } = await supabase.from('items').delete().eq('id', id);

		if (error) {
			console.error(error);
		}

		groceries.update((groceries) => groceries.filter((item) => item.id !== id));
	} else {
		const { error } = await supabase.from('items').update({ quantity: newQuantity }).eq('id', id);

		if (error) {
			console.error(error);
		}

		groceries.update((groceries) => {
			const i = groceries.findIndex((x) => x.id === id);
			if (i !== -1) {
				groceries[i].quantity = newQuantity;
			}
			return groceries;
		});
	}
};
