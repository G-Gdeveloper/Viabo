const CART_KEY = 'viabo_cart';
const listeners = new Set();

function read() {
	try {
		return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
	} catch {
		return [];
	}
}

function write(items) {
	localStorage.setItem(CART_KEY, JSON.stringify(items));
	listeners.forEach(fn => fn(items));
}

export function getCartItems() {
	return read();
}

export function addCartItem({ slug, title, category, image, priceCop, date, people }) {
	const items = read();
	const id = `${slug}-${Date.now()}`;
	const subtotal = priceCop * people;
	items.push({ id, slug, title, category, image, priceCop, date, people, subtotal });
	write(items);
	return id;
}

export function removeCartItem(id) {
	write(read().filter(item => item.id !== id));
}

export function clearCart() {
	write([]);
}

export function getCartCount() {
	return read().length;
}

export function getCartTotal() {
	return read().reduce((sum, item) => sum + item.subtotal, 0);
}

export function onCartChange(listener) {
	listeners.add(listener);
	return () => listeners.delete(listener);
}
