<script>
	import supabase from '$lib/supabase';

	let email;

	async function handleLogin() {
		try {
			const { error } = await supabase.auth.signIn({ email });
			if (error) {
				throw error;
			}
			alert('A Login link has been sent to you');
		} catch (error) {
			console.log('error:', error);
			alert(error.message);
		} finally {
			console.log('Logged in!');
		}
	}
</script>

<div
	class="fixed z-20 inset-0 overflow-y-auto"
	aria-labelledby="modal-title"
	role="dialog"
	aria-modal="true"
>
	<div
		class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
	>
		<div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" />

		<span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true"
			>&#8203;</span
		>

		<div
			class="relative inline-block align-bottom bg-gray-800 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full sm:p-12"
		>
			<div class="sm:mx-auto sm:w-full sm:max-w-md">
				<div class="mx-auto h-12 w-10 text-6xl">&#x1F6D2</div>
				<h2 class="mt-6 text-center text-3xl font-extrabold text-white">Sign in to your Cart</h2>
			</div>

			<form class="space-y-6 mt-6" action="/" on:submit|preventDefault={handleLogin} method="POST">
				<div>
					<label for="email" class="block text-center text-sm font-medium text-gray-300">
						Email address
					</label>
					<div class="mt-2">
						<input
							bind:value={email}
							id="email"
							name="email"
							type="email"
							autocomplete="email"
							required
							class="appearance-none text-center bg-gray-800 block w-full px-3 py-2 rounded-md shadow-sm border-2 placeholder-gray-400 focus:outline-cyanbg-cyan-700 focus:ring-cyan-500 focus:border-cyan-600 sm:text-sm"
						/>
					</div>
				</div>

				<div>
					<button
						type="submit"
						class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
						>Sign in</button
					>
				</div>
			</form>
		</div>
	</div>
</div>
