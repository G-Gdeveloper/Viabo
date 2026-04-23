import { getCartItems, removeCartItem, clearCart, getCartTotal, onCartChange } from '../utils/cart.js';

function formatCop(value) {
	return new Intl.NumberFormat('es-CO', {
		style: 'currency',
		currency: 'COP',
		maximumFractionDigits: 0
	}).format(value) + ' COP';
}

function formatDate(date) {
	if (!date) return '—';
	const d = new Date(date.year, date.month - 1, date.day);
	return new Intl.DateTimeFormat('es-CO', {
		day: 'numeric',
		month: 'long',
		year: 'numeric'
	}).format(d);
}

function buildItemHTML(item) {
	return `
		<article class="cart-item" data-id="${item.id}">
			<div class="cart-item-media">
				<img src="${item.image}" alt="${item.title}">
			</div>
			<div class="cart-item-info">
				<span class="cart-item-category">${item.category}</span>
				<h3 class="cart-item-title">${item.title}</h3>
				<div class="cart-item-meta">
					<span>${formatDate(item.date)}</span>
					<span>${item.people} persona${item.people !== 1 ? 's' : ''}</span>
					<span>${formatCop(item.priceCop)} por persona</span>
				</div>
			</div>
			<div class="cart-item-aside">
				<strong class="cart-item-subtotal">${formatCop(item.subtotal)}</strong>
				<button type="button" class="cart-item-remove" data-id="${item.id}" aria-label="Eliminar ${item.title}">
					<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
						<path d="M6 6l12 12M6 18L18 6"/>
					</svg>
				</button>
			</div>
		</article>
	`;
}

function buildEmptyState() {
	return `
		<div class="cart-empty">
			<div class="cart-empty-icon">
				<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
					<path d="M3 4h2l2.2 9.3a1 1 0 0 0 1 .7h8.8a1 1 0 0 0 1-.8L20 7H7"/>
					<circle cx="10" cy="19" r="1.6" fill="currentColor" stroke="none"/>
					<circle cx="17" cy="19" r="1.6" fill="currentColor" stroke="none"/>
				</svg>
			</div>
			<h2>Tu carrito está vacío</h2>
			<p>Explora nuestro catálogo y agrega las experiencias que quieres vivir en Bogotá.</p>
			<a href="/Catalogo.html#catalog" class="cart-cta-primary">Ver catálogo</a>
		</div>
	`;
}

export function renderCartSection() {
	const mountNode = document.querySelector('#app-home');
	if (!mountNode) return;

	let unsubscribe = null;

	function render() {
		const items = getCartItems();
		const total = getCartTotal();
		const count = items.length;

		if (count === 0) {
			mountNode.innerHTML = `
				<section class="cart-section" aria-label="Carrito de compras">
					<div class="cart-inner">
						<div class="cart-header">
							<h1 class="cart-title">Mi carrito</h1>
						</div>
						${buildEmptyState()}
					</div>
				</section>
			`;
			return;
		}

		mountNode.innerHTML = `
			<section class="cart-section" aria-label="Carrito de compras">
				<div class="cart-inner">
					<div class="cart-header">
						<h1 class="cart-title">
							Mi carrito
							<span class="cart-count-label">${count} servicio${count !== 1 ? 's' : ''}</span>
						</h1>
						<button type="button" class="cart-clear" id="cart-clear-btn">Vaciar carrito</button>
					</div>
					<div class="cart-layout">
						<div class="cart-items-list" id="cart-items-list">
							${items.map(buildItemHTML).join('')}
						</div>
						<aside class="cart-summary" aria-label="Resumen del pedido">
							<h2>Resumen del pedido</h2>
							<div class="cart-summary-rows">
								${items.map(item => `
									<div class="cart-summary-row">
										<span>${item.title}</span>
										<strong>${formatCop(item.subtotal)}</strong>
									</div>
								`).join('')}
							</div>
							<div class="cart-summary-total">
								<span>Total</span>
								<strong>${formatCop(total)}</strong>
							</div>
							<a href="/contact.html" class="cart-cta-primary">Continuar al pago</a>
							<a href="/Catalogo.html#catalog" class="cart-cta-secondary">Agregar más experiencias →</a>
						</aside>
					</div>
				</div>
			</section>
		`;

		mountNode.querySelector('#cart-clear-btn')?.addEventListener('click', () => {
			clearCart();
		});

		mountNode.querySelectorAll('.cart-item-remove').forEach(btn => {
			btn.addEventListener('click', () => {
				removeCartItem(btn.getAttribute('data-id'));
			});
		});
	}

	render();
	unsubscribe = onCartChange(() => render());

	return () => {
		if (unsubscribe) unsubscribe();
	};
}
