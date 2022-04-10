<script>
	import Notifications from 'svelte-notifications';
	import '../app.css';
	import { loadItems, user } from '$lib/stores';
	import Authentication from '$lib/components/Authentication.svelte';
	import supabase from '$lib/supabase';

	user.set(supabase.auth.user());

	supabase.auth.onAuthStateChange((_, session) => {
		user.set(session?.user);
		if (session?.user) {
			loadItems();
		}
	});

	async function signOut() {
		const { error } = await supabase.auth.signOut();
		if (error) {
			alert(error.message);
		}
	}
</script>

<Notifications>
	{#if !$user}
		<Authentication />
	{:else}
		<button
			class="bg-transparent absolute right-[15px] top-[15px] inline-flex items-center px-5 py-3 border border-cyan-900 text-md font-medium rounded-full shadow-sm text-gray-300 hover:border-cyan-600 focus:outline-none focus:border-cyan-600"
			on:click={signOut}>Sign Out</button
		>
	{/if}
	<div class="mt-32 max-w-5xl mx-auto sm:px-6 lg:px-8">
		<slot />
	</div>
</Notifications>
