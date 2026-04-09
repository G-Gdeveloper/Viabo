const heroImage = 'https://www.figma.com/api/mcp/asset/757ba1c8-0a49-41af-bce3-766780661335';

const catalogItems = [
	{
		category: 'Vida nocturna',
		title: 'Una noche loca',
		price: '$180.000',
		priceCop: 180000,
		description: 'Explora los bares y clubes mas exclusivos de la Zona T y Chapinero.',
		image: 'https://www.figma.com/api/mcp/asset/5c66e9ac-fe7b-4851-84ea-e21693f4f6da'
	},
	{
		category: 'Vida nocturna',
		title: 'Noche de flores y estrellas',
		price: '$120.000',
		priceCop: 120000,
		description: 'Un recorrido bohemio por los miradores de la ciudad bajo la luz nocturna.',
		image: 'https://www.figma.com/api/mcp/asset/45193f4c-09f2-4a06-ac4c-3d051c3b9341'
	},
	{
		category: 'Linea cultural',
		title: 'La ruta de letras',
		price: '$160.000',
		priceCop: 160000,
		description: 'Visita librerias iconicas y cafes frecuentados por escritores bogotanos.',
		image: 'https://www.figma.com/api/mcp/asset/76b66a22-e790-4bc3-9057-54c8944d9166'
	},
	{
		category: 'Linea cultural',
		title: 'Danzarte',
		price: '$210.000',
		priceCop: 210000,
		description: 'Un taller inmersivo de ritmos tradicionales seguido de una puesta en escena.',
		image: 'https://www.figma.com/api/mcp/asset/8f5cc7cc-b225-403d-ac17-a6c62aa4a46e'
	},
	{
		category: 'Linea cultural',
		title: 'Historia y arquitectura',
		price: '$95.000',
		priceCop: 95000,
		description: 'Recorre La Candelaria y descubre secretos que guardan sus calles coloniales.',
		image: 'https://www.figma.com/api/mcp/asset/912eb63f-7620-4596-9913-9c1bb70b4392'
	},
	{
		category: 'Linea cultural',
		title: 'Museos, caminata y cafe',
		price: '$110.000',
		priceCop: 110000,
		description: 'Trilogia perfecta: visita museos, caminata historica y cafe de especialidad.',
		image: 'https://www.figma.com/api/mcp/asset/e44901b5-2e00-4132-b5f9-1c57b2fba4b9'
	},
	{
		category: 'Linea cultural',
		title: 'Conocer y hacer arte',
		price: '$145.000',
		priceCop: 145000,
		description: 'Interactua con artistas locales en sus talleres y crea tu propia pieza.',
		image: 'https://www.figma.com/api/mcp/asset/5cad9109-f459-4547-a795-7bbedb9d3f01'
	},
	{
		category: 'Deportiva/religiosa',
		title: 'Monserrate',
		price: '$100.000',
		priceCop: 100000,
		description: 'El ascenso sagrado. Opcion de caminata deportiva o teleferico panoramico.',
		image: 'https://www.figma.com/api/mcp/asset/6cab6b98-c970-45d4-802b-7e4390a184b0'
	},
	{
		category: 'Linea aventura',
		title: 'Parques de diversion',
		price: '$195.000',
		priceCop: 195000,
		description: 'Adrenalina pura en los mejores parques tematicos de la ciudad.',
		image: 'https://www.figma.com/api/mcp/asset/dadd04d3-ea29-4625-bbcb-8edc7885033a'
	},
	{
		category: 'Linea deportiva',
		title: 'Cascadas Tour',
		price: '$175.000',
		priceCop: 175000,
		description: 'Caminata ecologica por los cerros orientales hasta encontrar cascadas.',
		image: 'https://www.figma.com/api/mcp/asset/a4b14240-52e6-437a-94b0-e22d010dfff2'
	},
	{
		category: 'Linea gastronomica',
		title: 'Gastronomia',
		price: '$220.000',
		priceCop: 220000,
		description: 'Un festin para los sentidos con mercados tradicionales y alta cocina.',
		image: 'https://www.figma.com/api/mcp/asset/5f20bdd2-1a80-4ea1-9488-cef2d906a59a'
	},
	{
		category: 'Linea compras',
		title: 'Todo al 50%',
		price: '$80.000',
		priceCop: 80000,
		description: 'Guia experta por outlets y zonas de descuentos para encontrar tesoros.',
		image: 'https://www.figma.com/api/mcp/asset/4ffe208b-3535-4619-ae61-2a31943f788a'
	}
];

const categoryThemeClass = {
	'Vida nocturna': 'is-orange',
	'Linea cultural': 'is-blue',
	'Deportiva/religiosa': 'is-amber',
	'Linea aventura': 'is-cyan',
	'Linea deportiva': 'is-blue',
	'Linea gastronomica': 'is-amber',
	'Linea compras': 'is-muted'
};

let selectedCatalogItem = null;

const detailDays = [14, 15, 16, 17, 18, 19, 20];

function toCopCurrency(value) {
	return new Intl.NumberFormat('es-CO', {
		style: 'currency',
		currency: 'COP',
		maximumFractionDigits: 0
	}).format(value);
}

function toPricePerPerson(value) {
	return `${toCopCurrency(value)} COP`;
}

function buildDetailSection(item) {
	const themeClass = categoryThemeClass[item.category] || 'is-blue';

	return `
		<section class="detail-view" aria-label="Detalle de experiencia ${item.title}">
			<button type="button" class="detail-back" id="detail-back-button" aria-label="Volver al catalogo">< Volver al catalogo</button>
			<div class="detail-hero">
				<img src="${item.image}" alt="${item.title}" class="detail-hero-image">
				<div class="detail-hero-overlay"></div>
				<div class="detail-hero-content">
					<span class="detail-chip ${themeClass}">${item.category}</span>
					<h1>${item.title}</h1>
					<div class="detail-price-box">
						<small>Precio por persona</small>
						<strong>${toPricePerPerson(item.priceCop)}</strong>
					</div>
				</div>
			</div>

			<div class="detail-grid">
				<div class="detail-content-left">
					<div class="detail-description">
						<p class="detail-eyebrow">About the Journey</p>
						<p class="detail-copy">${item.description} Un recorrido por el corazon cultural de Bogota disenado para los sentidos.</p>
					</div>

					<div class="detail-highlights" role="list" aria-label="Resumen del recorrido">
						<div class="detail-highlight-item" role="listitem">
							<span class="detail-highlight-icon" aria-hidden="true">MU</span>
							<p>Museo</p>
						</div>
						<div class="detail-highlight-item" role="listitem">
							<span class="detail-highlight-icon" aria-hidden="true">CA</span>
							<p>Caminata por la ciudad</p>
						</div>
						<div class="detail-highlight-item" role="listitem">
							<span class="detail-highlight-icon" aria-hidden="true">CF</span>
							<p>Degustacion de cafe</p>
						</div>
					</div>

					<div class="detail-includes">
						<h2>Que esta incluido</h2>
						<ul>
							<li>Professional bilingual guide</li>
							<li>All museum entry fees</li>
							<li>Specialty coffee tasting session</li>
							<li>Filtered water and local snacks</li>
						</ul>
					</div>
				</div>

				<aside class="detail-booking" aria-label="Agenda tu viaje">
					<h2>Agenda tu viaje</h2>
					<div class="detail-booking-group">
						<p>Selecciona la fecha</p>
						<div class="detail-calendar-head" aria-hidden="true">
							<span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
						</div>
						<div class="detail-calendar-grid">
							${detailDays
								.map((day) => `<button type="button" class="detail-day${day === 16 ? ' is-selected' : ''}" data-day="${day}">${day}</button>`)
								.join('')}
						</div>
					</div>

					<div class="detail-booking-group">
						<p>Personas</p>
						<div class="detail-counter" data-price="${item.priceCop}">
							<button type="button" class="detail-counter-button" data-action="decrease" aria-label="Disminuir personas">-</button>
							<strong class="detail-counter-value" id="detail-counter-value">2</strong>
							<button type="button" class="detail-counter-button" data-action="increase" aria-label="Aumentar personas">+</button>
						</div>
					</div>

					<div class="detail-total-row">
						<span>Total</span>
						<strong id="detail-total-value">${toPricePerPerson(item.priceCop * 2)}</strong>
					</div>
					<button type="button" class="detail-reserve">Reservar Ahora</button>
				</aside>
			</div>
		</section>
	`;
}

function buildCatalogCard(item) {
	const article = document.createElement('article');
	article.className = 'bogota-card';

	const themeClass = categoryThemeClass[item.category] || 'is-blue';

	article.innerHTML = `
		<div class="bogota-card-media">
			<img src="${item.image}" alt="${item.title}">
			<span class="bogota-chip ${themeClass}">${item.category}</span>
		</div>
		<div class="bogota-card-content">
			<div class="bogota-card-head">
				<h3>${item.title}</h3>
				<strong>${item.price}</strong>
			</div>
			<p>${item.description}</p>
			<button type="button" class="bogota-link" aria-label="Ver detalles de ${item.title}">Ver Detalles <span aria-hidden="true">→</span></button>
		</div>
	`;

	const detailsButton = article.querySelector('.bogota-link');
	if (detailsButton) {
		detailsButton.addEventListener('click', () => {
			selectedCatalogItem = item;
			renderCatalogSection();
			window.scrollTo({ top: 0, behavior: 'smooth' });
		});
	}

	return article;
}

export function renderCatalogSection() {
	const mountNode = document.querySelector('#app-home');

	if (!mountNode) {
		return;
	}

	if (selectedCatalogItem) {
		mountNode.innerHTML = buildDetailSection(selectedCatalogItem);

		const backButton = mountNode.querySelector('#detail-back-button');
		const dayButtons = mountNode.querySelectorAll('.detail-day');
		const counter = mountNode.querySelector('.detail-counter');
		const counterValue = mountNode.querySelector('#detail-counter-value');
		const totalValue = mountNode.querySelector('#detail-total-value');
		const reserveButton = mountNode.querySelector('.detail-reserve');

		if (backButton) {
			backButton.addEventListener('click', () => {
				selectedCatalogItem = null;
				renderCatalogSection();
			});
		}

		dayButtons.forEach((button) => {
			button.addEventListener('click', () => {
				dayButtons.forEach((candidate) => candidate.classList.remove('is-selected'));
				button.classList.add('is-selected');
			});
		});

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
				totalValue.textContent = toPricePerPerson(price * people);
			});
		}

		if (reserveButton) {
			reserveButton.addEventListener('click', () => {
				window.alert(`Reserva iniciada para ${selectedCatalogItem.title}.`);
			});
		}

		return;
	}

	mountNode.innerHTML = `
		<section class="bogota-section" aria-label="Catalogo de servicios en Bogota">
			<div class="bogota-hero" role="banner">
				<img src="${heroImage}" alt="Panoramica de Bogota" class="bogota-hero-image">
				<div class="bogota-hero-overlay"></div>
				<div class="bogota-hero-content">
					<h1>Descubre Bogota<br>a tu medida</h1>
					<p>Experiencias curadas que capturan el alma de la capital colombiana, desde sus cerros ancestrales hasta su vibrante energia urbana.</p>
				</div>
			</div>
			<div class="bogota-grid" id="catalog-grid"></div>
		</section>
	`;

	const grid = mountNode.querySelector('#catalog-grid');
	if (!grid) {
		return;
	}

	catalogItems.forEach((item) => {
		grid.appendChild(buildCatalogCard(item));
	});
}
