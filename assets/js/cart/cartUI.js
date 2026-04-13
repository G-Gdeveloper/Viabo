import { cartManager } from './cartManager.js';

function toCopCurrency(value) {
	return new Intl.NumberFormat('es-CO', {
		style: 'currency',
		currency: 'COP',
		maximumFractionDigits: 0
	}).format(value);
}

function toIsoDate(dateObj) {
	if (!dateObj.year || !dateObj.month || !dateObj.day) {
		return '';
	}
	const month = String(dateObj.month).padStart(2, '0');
	const day = String(dateObj.day).padStart(2, '0');
	return `${dateObj.year}-${month}-${day}`;
}

function toLongDate(dateObj) {
	if (!dateObj.year || !dateObj.month || !dateObj.day) {
		return '';
	}

	const date = new Date(dateObj.year, dateObj.month - 1, dateObj.day);
	return new Intl.DateTimeFormat('es-ES', {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	}).format(date);
}

export function renderCartModal() {
	const cart = cartManager.getCart();
	const total = cartManager.getTotal();

	const backgroundColor = '#1D2F4F';
	const borderColor = '#9B7C4C';

	const cartHTML = `
		<div class="cart-modal-overlay" id="cart-modal-overlay">
			<div class="cart-modal" role="dialog" aria-labelledby="cart-modal-title">
				<div class="cart-modal-header">
					<h2 id="cart-modal-title">Tu Carrito</h2>
					<button type="button" class="cart-modal-close" aria-label="Cerrar carrito">✕</button>
				</div>

				<div class="cart-modal-content">
					${cart.length === 0 ? `
						<div class="cart-empty">
							<p>Tu carrito está vacío</p>
							<p class="cart-empty-subtext">Agrega experiencias para comenzar</p>
						</div>
					` : `
						<div class="cart-items" role="list">
							${cart.map(item => `
								<div class="cart-item" role="listitem" data-item-id="${item.id}">
									<img src="${item.service.image}" alt="${item.service.title}" class="cart-item-image">
									<div class="cart-item-info">
										<h3>${item.service.title}</h3>
										<p class="cart-item-date">${toLongDate(item.date)}</p>
										<p class="cart-item-people">${item.people} persona${item.people !== 1 ? 's' : ''}</p>
										<p class="cart-item-price">${toCopCurrency(item.total)}</p>
									</div>
									<button type="button" class="cart-item-remove" data-item-id="${item.id}" aria-label="Eliminar ${item.service.title}">
										<svg viewBox="0 0 24 24" width="20" height="20">
											<path d="M6 18L18 6M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
										</svg>
									</button>
								</div>
							`).join('')}
						</div>
					`}
				</div>

				${cart.length > 0 ? `
					<div class="cart-modal-footer">
						<div class="cart-summary">
							<div class="cart-summary-row">
								<span>Subtotal</span>
								<span>${toCopCurrency(total)}</span>
							</div>
							<div class="cart-summary-row">
								<span>Servicios</span>
								<span>${cart.length}</span>
							</div>
							<div class="cart-summary-total">
								<span>Total</span>
								<strong>${toCopCurrency(total)}</strong>
							</div>
						</div>
						<button type="button" class="cart-checkout-btn">Continuar Compra</button>
					</div>
				` : ''}
			</div>
		</div>
	`;

	return cartHTML;
}

export function setupCartModal() {
	const modalHTML = renderCartModal();
	const container = document.createElement('div');
	container.innerHTML = modalHTML;
	const modal = container.firstElementChild;

	document.body.appendChild(modal);

	// Eventos
	const closeBtn = modal.querySelector('.cart-modal-close');
	const overlay = modal.querySelector('.cart-modal-overlay');
	const removeButtons = modal.querySelectorAll('.cart-item-remove');
	const checkoutBtn = modal.querySelector('.cart-checkout-btn');

	const closeModal = () => {
		modal.remove();
	};

	closeBtn?.addEventListener('click', closeModal);
	overlay?.addEventListener('click', (e) => {
		if (e.target === overlay) {
			closeModal();
		}
	});

	removeButtons.forEach(btn => {
		btn.addEventListener('click', (e) => {
			const itemId = btn.getAttribute('data-item-id');
			cartManager.removeItem(itemId);
			modal.remove();
			setupCartModal();
		});
	});

	checkoutBtn?.addEventListener('click', () => {
		window.alert('Próximamente: Pantalla de checkout disponible');
	});

	// Cerrar con Escape
	const handleEscape = (e) => {
		if (e.key === 'Escape') {
			modal.remove();
			document.removeEventListener('keydown', handleEscape);
		}
	};
	document.addEventListener('keydown', handleEscape);
}

export function updateCartBadge() {
	const badge = document.querySelector('.cart-badge');
	const count = cartManager.getItemsCount();

	if (badge) {
		if (count > 0) {
			badge.textContent = count;
			badge.hidden = false;
		} else {
			badge.hidden = true;
		}
	}
}
