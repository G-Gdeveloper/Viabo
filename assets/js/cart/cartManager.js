const STORAGE_KEY = 'viabo-cart';

export class CartManager {
	constructor() {
		this.cart = this.loadFromStorage();
		this.listeners = [];
	}

	loadFromStorage() {
		try {
			const stored = localStorage.getItem(STORAGE_KEY);
			return stored ? JSON.parse(stored) : [];
		} catch (error) {
			console.error('Error cargando carrito:', error);
			return [];
		}
	}

	saveToStorage() {
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(this.cart));
			this.notifyListeners();
		} catch (error) {
			console.error('Error guardando carrito:', error);
		}
	}

	addItem(service, date, people) {
		const cartItem = {
			id: `${service.slug}-${date.year}-${date.month}-${date.day}`,
			service: {
				slug: service.slug,
				title: service.title,
				priceCop: service.priceCop,
				category: service.category,
				image: service.image
			},
			date: date,
			people: people,
			total: service.priceCop * people,
			addedAt: new Date().toISOString()
		};

		const existingIndex = this.cart.findIndex(item => item.id === cartItem.id);
		if (existingIndex >= 0) {
			this.cart[existingIndex].people = people;
			this.cart[existingIndex].total = service.priceCop * people;
		} else {
			this.cart.push(cartItem);
		}

		this.saveToStorage();
		return cartItem;
	}

	removeItem(id) {
		const index = this.cart.findIndex(item => item.id === id);
		if (index >= 0) {
			this.cart.splice(index, 1);
			this.saveToStorage();
			return true;
		}
		return false;
	}

	updateItemPeople(id, people) {
		const item = this.cart.find(i => i.id === id);
		if (item) {
			item.people = Math.max(1, Math.min(12, people));
			item.total = item.service.priceCop * item.people;
			this.saveToStorage();
			return item;
		}
		return null;
	}

	getCart() {
		return [...this.cart];
	}

	getTotal() {
		return this.cart.reduce((sum, item) => sum + item.total, 0);
	}

	getItemCount() {
		return this.cart.reduce((sum, item) => sum + item.people, 0);
	}

	getItemsCount() {
		return this.cart.length;
	}

	clearCart() {
		this.cart = [];
		this.saveToStorage();
	}

	isEmpty() {
		return this.cart.length === 0;
	}

	subscribe(listener) {
		this.listeners.push(listener);
		return () => {
			this.listeners = this.listeners.filter(l => l !== listener);
		};
	}

	notifyListeners() {
		this.listeners.forEach(listener => listener(this.getCart()));
	}
}

export const cartManager = new CartManager();
