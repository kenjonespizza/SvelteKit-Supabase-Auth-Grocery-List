import { browser } from '$app/env';

export function scrollToBottom() {
	if (browser) {
		setTimeout(() => {
			// Add the delay so that it has time to add the new item...
			window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
		}, 100);
	}
}

export const UCFirst = (string) => string.charAt(0).toUpperCase() + string.slice(1);
