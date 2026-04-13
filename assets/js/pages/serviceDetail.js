import { catalogItems, categoryThemeClass, toPricePerPerson } from './catalog.js';
import { setupDetailCalendar, toIsoDate, toLongDate } from '../utils/detailCalendar.js';
import { cartManager } from '../cart/cartManager.js';
import { setupCartModal, updateCartBadge } from '../cart/cartUI.js';

export function renderServiceDetailSection(slug) {
	const mountNode = document.querySelector('#app-home');

	if (!mountNode) {
		return;
	}

	// Find the service by slug
	const service = catalogItems.find(item => item.slug === slug);

	if (!service) {
		// Service not found, render 404
		mountNode.innerHTML = `
			<section class="detail-view" aria-label="Servicio no encontrado">
				<button type="button" class="detail-back" id="detail-back-button" aria-label="Volver al catalogo">< Volver al catalogo</button>
				<div style="padding: 3rem; text-align: center;">
					<h1>Servicio no encontrado</h1>
					<p>Lo sentimos, el servicio que buscas no existe.</p>
				</div>
			</section>
		`;

		const backButton = mountNode.querySelector('#detail-back-button');
		if (backButton) {
			backButton.addEventListener('click', () => {
				window.location.hash = '#catalog';
			});
		}
		return;
	}

	const themeClass = categoryThemeClass[service.category] || 'is-blue';

	const detailHTML = `
		<section class="detail-view" aria-label="Detalle de experiencia ${service.title}">
			<button type="button" class="detail-back" id="detail-back-button" aria-label="Volver al catalogo">< Volver al catalogo</button>
			<div class="detail-hero">
				<img src="${service.image}" alt="${service.title}" class="detail-hero-image">
				<div class="detail-hero-overlay"></div>
				<div class="detail-hero-content">
					<span class="detail-chip ${themeClass}">${service.category}</span>
					<h1>${service.title}</h1>
					<div class="detail-price-box">
						<small>Precio por persona</small>
						<strong>${service.priceCop > 0 ? toPricePerPerson(service.priceCop) : 'Contáctanos'}</strong>
					</div>
				</div>
			</div>

			<div class="detail-grid">
				<div class="detail-content-left">
					<div class="detail-description">
						<p class="detail-eyebrow">About the Journey</p>
						<p class="detail-copy">${service.fullDescription}</p>
					</div>

					<div class="detail-highlights" role="list" aria-label="Resumen del recorrido">
						${service.highlights.map(h => `<div class="detail-highlight-item" role="listitem"><span class="detail-highlight-icon" aria-hidden="true">${h.code}</span><p>${h.label}</p></div>`).join('')}
					</div>
				</div>

				<aside class="detail-booking" aria-label="Agenda tu viaje">
					<h2>Agenda tu viaje</h2>
					<div class="detail-booking-group">
						<p>Selecciona la fecha</p>
						<div class="detail-calendar" id="detail-calendar"></div>
					</div>

					<div class="detail-booking-group">
						<p>Personas</p>
						<div class="detail-counter" data-price="${service.priceCop}">
							<button type="button" class="detail-counter-button" data-action="decrease" aria-label="Disminuir personas">-</button>
							<strong class="detail-counter-value" id="detail-counter-value">2</strong>
							<button type="button" class="detail-counter-button" data-action="increase" aria-label="Aumentar personas">+</button>
						</div>
					</div>

					<div class="detail-total-row">
						<span>Total</span>
						<strong id="detail-total-value">${service.priceCop > 0 ? toPricePerPerson(service.priceCop * 2) : 'Contáctanos'}</strong>
					</div>
					<button type="button" class="detail-reserve detail-add-to-cart">Agregar al Carrito</button>
					<button type="button" class="detail-reserve-secondary detail-view-cart" style="display: none;">Ver Carrito</button>
				</aside>
			</div>
		</section>
	`;

	mountNode.innerHTML = detailHTML;

	// Attach event listeners
	const backButton = mountNode.querySelector('#detail-back-button');
	const calendarMount = mountNode.querySelector('#detail-calendar');
	const counter = mountNode.querySelector('.detail-counter');
	const counterValue = mountNode.querySelector('#detail-counter-value');
	const totalValue = mountNode.querySelector('#detail-total-value');
	const reserveButton = mountNode.querySelector('.detail-reserve');
	const bookingState = {
		date: null,
		people: 2
	};

	if (backButton) {
		backButton.addEventListener('click', () => {
			window.location.hash = '#catalog';
			window.scrollTo({ top: 0, behavior: 'smooth' });
		});
	}

	if (calendarMount) {
		setupDetailCalendar(calendarMount, {
			disablePastDates: true,
			onDateChange: (date) => {
				bookingState.date = date;
			}
		});
	}

	if (counter && counterValue && totalValue) {
		const price = Number(counter.getAttribute('data-price')) || 0;
		let people = Number(counterValue.textContent) || 2;

		counter.addEventListener('click', (event) => {
			const target = event.target;
			if (!(target instanceof HTMLButtonElement)) {
				return;
			}

			const action = target.getAttribute('data-action');
			if (action === 'decrease') {
				people = Math.max(1, people - 1);
			}

			if (action === 'increase') {
				people = Math.min(12, people + 1);
			}

			counterValue.textContent = String(people);
			bookingState.people = people;
			if (price > 0) {
				totalValue.textContent = toPricePerPerson(price * people);
			}
		});
	}

	if (reserveButton) {
		reserveButton.addEventListener('click', () => {
			if (!bookingState.date) {
				window.alert('Selecciona una fecha disponible para continuar.');
				return;
			}

			const scheduleDate = {
				day: bookingState.date.day,
				month: bookingState.date.month,
				year: bookingState.date.year
			};

			cartManager.addItem(service, scheduleDate, bookingState.people);
			updateCartBadge();

			// Mostrar feedback visual
			const addBtn = mountNode.querySelector('.detail-add-to-cart');
			const viewCartBtn = mountNode.querySelector('.detail-view-cart');

			if (addBtn && viewCartBtn) {
				addBtn.style.display = 'none';
				viewCartBtn.style.display = 'block';
			}

			const originalText = reserveButton.textContent;
			reserveButton.textContent = '✓ Agregado al carrito';
			reserveButton.disabled = true;

			setTimeout(() => {
				if (addBtn && viewCartBtn) {
					addBtn.style.display = 'block';
					viewCartBtn.style.display = 'none';
				}
				reserveButton.textContent = originalText;
				reserveButton.disabled = false;
			}, 2000);
		});
	}

	const viewCartBtn = mountNode.querySelector('.detail-view-cart');
	if (viewCartBtn) {
		viewCartBtn.addEventListener('click', () => {
			setupCartModal();
		});
	}

	window.scrollTo({ top: 0, behavior: 'smooth' });
}
