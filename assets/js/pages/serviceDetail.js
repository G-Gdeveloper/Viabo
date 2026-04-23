import { catalogItems, categoryThemeClass, toPricePerPerson } from './catalog.js';
import { setupDetailCalendar } from '../utils/detailCalendar.js';
import { addCartItem } from '../utils/cart.js';

function showToast(message, linkLabel, linkHref) {
	const existing = document.querySelector('.viabo-toast');
	if (existing) existing.remove();

	const toast = document.createElement('div');
	toast.className = 'viabo-toast';
	toast.innerHTML = `<span>${message}</span>${linkLabel ? `<a href="${linkHref}">${linkLabel}</a>` : ''}`;
	document.body.appendChild(toast);

	requestAnimationFrame(() => {
		requestAnimationFrame(() => toast.classList.add('is-visible'));
	});

	setTimeout(() => {
		toast.classList.remove('is-visible');
		toast.addEventListener('transitionend', () => toast.remove(), { once: true });
	}, 3500);
}

export function renderServiceDetailSection(slug) {
	const mountNode = document.querySelector('#app-home');
	if (!mountNode) return;

	const service = catalogItems.find(item => item.slug === slug);

	if (!service) {
		mountNode.innerHTML = `
			<section class="detail-view" aria-label="Servicio no encontrado">
				<button type="button" class="detail-back" id="detail-back-button" aria-label="Volver al catalogo">< Volver al catalogo</button>
				<div style="padding: 3rem; text-align: center;">
					<h1>Servicio no encontrado</h1>
					<p>Lo sentimos, el servicio que buscas no existe.</p>
				</div>
			</section>
		`;
		mountNode.querySelector('#detail-back-button')?.addEventListener('click', () => {
			window.location.hash = '#catalog';
		});
		return;
	}

	const themeClass = categoryThemeClass[service.category] || 'is-blue';

	mountNode.innerHTML = `
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
					<button type="button" class="detail-reserve" id="detail-add-cart-btn">
						<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<path d="M3 4h2l2.2 9.3a1 1 0 0 0 1 .7h8.8a1 1 0 0 0 1-.8L20 7H7"/>
							<circle cx="10" cy="19" r="1.6" fill="currentColor" stroke="none"/>
							<circle cx="17" cy="19" r="1.6" fill="currentColor" stroke="none"/>
						</svg>
						Agregar al carrito
					</button>
				</aside>
			</div>
		</section>
	`;

	const bookingState = { date: null, people: 2 };

	mountNode.querySelector('#detail-back-button')?.addEventListener('click', () => {
		window.location.hash = '#catalog';
		window.scrollTo({ top: 0, behavior: 'smooth' });
	});

	const calendarMount = mountNode.querySelector('#detail-calendar');
	if (calendarMount) {
		setupDetailCalendar(calendarMount, {
			disablePastDates: true,
			onDateChange: (date) => { bookingState.date = date; }
		});
	}

	const counter = mountNode.querySelector('.detail-counter');
	const counterValue = mountNode.querySelector('#detail-counter-value');
	const totalValue = mountNode.querySelector('#detail-total-value');

	if (counter && counterValue && totalValue) {
		const price = Number(counter.getAttribute('data-price')) || 0;
		let people = 2;

		counter.addEventListener('click', (event) => {
			const target = event.target;
			if (!(target instanceof HTMLButtonElement)) return;
			const action = target.getAttribute('data-action');
			if (action === 'decrease') people = Math.max(1, people - 1);
			if (action === 'increase') people = Math.min(12, people + 1);
			counterValue.textContent = String(people);
			bookingState.people = people;
			if (price > 0) totalValue.textContent = toPricePerPerson(price * people);
		});
	}

	const addCartBtn = mountNode.querySelector('#detail-add-cart-btn');
	if (addCartBtn) {
		addCartBtn.addEventListener('click', () => {
			if (!bookingState.date) {
				showToast('Selecciona una fecha para continuar.');
				return;
			}
			if (service.priceCop === 0) {
				window.location.href = '/contact.html';
				return;
			}

			addCartItem({
				slug: service.slug,
				title: service.title,
				category: service.category,
				image: service.image,
				priceCop: service.priceCop,
				date: { ...bookingState.date },
				people: bookingState.people
			});

			addCartBtn.classList.add('is-added');
			addCartBtn.innerHTML = `
				<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
					<path d="M4 12l6 6L20 6"/>
				</svg>
				¡Añadido!
			`;

			setTimeout(() => {
				addCartBtn.classList.remove('is-added');
				addCartBtn.innerHTML = `
					<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d="M3 4h2l2.2 9.3a1 1 0 0 0 1 .7h8.8a1 1 0 0 0 1-.8L20 7H7"/>
						<circle cx="10" cy="19" r="1.6" fill="currentColor" stroke="none"/>
						<circle cx="17" cy="19" r="1.6" fill="currentColor" stroke="none"/>
					</svg>
					Agregar al carrito
				`;
			}, 1800);

			showToast(`${service.title} añadido al carrito`, 'Ver carrito →', '/#cart');
		});
	}

	window.scrollTo({ top: 0, behavior: 'smooth' });
}
