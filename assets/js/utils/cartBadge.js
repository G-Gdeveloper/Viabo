import { getCartCount, onCartChange } from './cart.js';

function formatCount(count) {
	if (count <= 0) return '';
	return count > 9 ? '+9' : String(count);
}

function sync() {
	const count = getCartCount();
	document.querySelectorAll('.cartBadge').forEach(badge => {
		if (count === 0) {
			badge.classList.add('is-hidden');
			badge.textContent = '';
		} else {
			badge.classList.remove('is-hidden');
			badge.textContent = formatCount(count);
		}
	});
}

sync();
onCartChange(sync);
