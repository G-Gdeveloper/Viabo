const heroImage = 'https://www.figma.com/api/mcp/asset/757ba1c8-0a49-41af-bce3-766780661335';
import { setupDetailCalendar, toIsoDate, toLongDate } from '../utils/detailCalendar.js';

const catalogItems = [
	{
		slug: 'una-noche-loca',
		category: 'Vida nocturna',
		title: 'Una noche loca',
		price: '$180.000',
		priceCop: 180000,
		description: 'Explora los bares y clubes mas exclusivos de la Zona T y Chapinero.',
		fullDescription: 'Vive la experiencia nocturna en Bogotá, llena de emociones y lugares vibrantes que la ciudad tiene para ti. Nuestro tour incluye transporte climatizado desde tu hotel hasta el Rooftop Mirador Central, uno de los miradores rumba más reconocidos, donde podrás tomar fotos, ver la ciudad entera, bailar y disfrutar de cocteles de bienvenida.',
		highlights: [{code: 'VD', label: 'Vida Nocturna'}, {code: 'CL', label: 'Clubes'}, {code: 'CC', label: 'Cocteles'}],
		image: 'https://www.figma.com/api/mcp/asset/5c66e9ac-fe7b-4851-84ea-e21693f4f6da'
	},
	{
		slug: 'la-noche-de-flores-y-estrellas',
		category: 'Vida nocturna',
		title: 'La noche de flores y estrellas',
		price: '$120.000',
		priceCop: 120000,
		description: 'Un recorrido bohemio por los miradores de la ciudad bajo la luz nocturna.',
		fullDescription: 'Para una experiencia nocturna más tranquila, oferecemos un último viernes del mes un recorrido especial por el jardín botánico con música y refrigerio. Posteriormente nos dirigiremos al planetario para una función especial bajo las estrellas, perfecto para desconectar.',
		highlights: [{code: 'JB', label: 'Jardín botánico'}, {code: 'PM', label: 'Planetario'}, {code: 'RF', label: 'Refrigerio'}],
		image: 'https://www.figma.com/api/mcp/asset/45193f4c-09f2-4a06-ac4c-3d051c3b9341'
	},
	{
		slug: 'la-ruta-de-letras',
		category: 'Linea cultural',
		title: 'La ruta de letras',
		price: '$160.000',
		priceCop: 160000,
		description: 'Visita librerias iconicas y cafes frecuentados por escritores bogotanos.',
		fullDescription: 'Un recorrido para los amantes de la literatura que empieza a las 8 am en La Candelaria, un lugar histórico donde vivió Gabriel García Márquez. Recorreremos sus calles apreciando arte y parando en cafeterías literarias. Al medio día disfrutaremos almuerzo con muestra artística, visitaremos la Biblioteca Virgilio Barco y terminaremos en Café Pasaje literario hermoso.',
		highlights: [{code: 'LT', label: 'Literatura'}, {code: 'CF', label: 'Cafeterías'}, {code: 'BV', label: 'Biblioteca'}],
		image: 'https://www.figma.com/api/mcp/asset/76b66a22-e790-4bc3-9057-54c8944d9166'
	},
	{
		slug: 'danzarte',
		category: 'Linea cultural',
		title: 'Danzarte',
		price: '$210.000',
		priceCop: 210000,
		description: 'Un taller inmersivo de ritmos tradicionales seguido de una puesta en escena.',
		fullDescription: 'Para los amantes de la danza, vivir una experiencia inmersiva por la Casona de la Danza con tour guiado y muestra cultural. Luego toma una clase de ritmos latinos, tango o urbano. Después elige entre Theatrón, una de las discotecas más grandes de Latinoamérica, o una muestra cultural en nuestros teatros aliados.',
		highlights: [{code: 'DZ', label: 'Danza'}, {code: 'CU', label: 'Cultura'}, {code: 'DC', label: 'Discoteca'}],
		image: 'https://www.figma.com/api/mcp/asset/8f5cc7cc-b225-403d-ac17-a6c62aa4a46e'
	},
	{
		slug: 'historia-y-arquitectura-una-nueva-mirada',
		category: 'Linea cultural',
		title: 'Historia y arquitectura, una nueva mirada',
		price: '$95.000',
		priceCop: 95000,
		description: 'Recorre La Candelaria y descubre secretos que guardan sus calles coloniales.',
		fullDescription: 'Una mirada diferente a la historia y arquitectura a través de nuestro taller de fotografía. Tomaremos fotos de la arquitectura de La Candelaria y Plaza de Bolívar, notando el contraste entre el Capitolio Nacional y Palacio de la Justicia. Visitaremos Fragmentos, espacio de Arte y Memoria, y terminaremos con café-charla en la Casa de la Moneda discutiendo historia arquitectónica.',
		highlights: [{code: 'FG', label: 'Fotografía'}, {code: 'AQ', label: 'Arquitectura'}, {code: 'AM', label: 'Arte'}],
		image: 'https://www.figma.com/api/mcp/asset/912eb63f-7620-4596-9913-9c1bb70b4392'
	},
	{
		slug: 'museos-caminata-y-cafe',
		category: 'Linea cultural',
		title: 'Museos, caminata y café',
		price: '$110.000',
		priceCop: 110000,
		description: 'Trilogia perfecta: visita museos, caminata historica y cafe de especialidad.',
		fullDescription: 'Caminaremos entre arte y aromas locales visitando el Museo del Oro, Museorey y Museo de Arte Miguel Urritia. Recorreremos el Eje Ambiental diseñado por Rogelio Salmona y realizaremos una cata de café de especialidad en Tropicalia Coffee. Aprenderemos métodos de filtrado mientras compartimos las historias de arte apreciado a lo largo de la jornada.',
		highlights: [{code: 'MU', label: 'Museos'}, {code: 'CA', label: 'Caminata'}, {code: 'CF', label: 'Café'}],
		image: 'https://www.figma.com/api/mcp/asset/e44901b5-2e00-4132-b5f9-1c57b2fba4b9'
	},
	{
		slug: 'conocer-y-hacer-arte',
		category: 'Linea cultural',
		title: 'Conocer y hacer arte',
		price: '$145.000',
		priceCop: 145000,
		description: 'Interactua con artistas locales en sus talleres y crea tu propia pieza.',
		fullDescription: 'Vive un día lleno de arte empezando con brunch artístico, un desayuno pintando opciones como totebags, cerámicas y lienzos. Luego visitaremos el Distrito Graffiti viendo el arte urbano con nueva mirada. Finalizaremos en el taller de artesanos en Pasaje Rivas, donde crearás tu propia pieza de arte local.',
		highlights: [{code: 'BR', label: 'Brunch'}, {code: 'GR', label: 'Graffiti'}, {code: 'TA', label: 'Arte'}],
		image: 'https://www.figma.com/api/mcp/asset/5cad9109-f459-4547-a795-7bbedb9d3f01'
	},
	{
		slug: 'monserrate',
		category: 'Deportiva/religiosa',
		title: 'Monserrate',
		price: '$100.000',
		priceCop: 100000,
		description: 'El ascenso sagrado. Opcion de caminata deportiva o teleferico panoramico.',
		fullDescription: 'Vive una experiencia tanto deportiva como religiosa en Monserrate con desafío de ascenso cronometrado para deportistas o sendero peatonal para planes más tranquilos. Desayunaremos de manera tradicional con tamal y chocolate, y visitaremos el majestuoso Santuario del Señor Caído con vistas panorámicas de la ciudad.',
		highlights: [{code: 'SC', label: 'Santuario'}, {code: 'DT', label: 'Deporte'}, {code: 'VS', label: 'Vistas'}],
		image: 'https://www.figma.com/api/mcp/asset/6cab6b98-c970-45d4-802b-7e4390a184b0'
	},
	{
		slug: 'parques-de-diversion-tour',
		category: 'Linea aventura',
		title: 'Parques de diversión tour',
		price: '$195.000',
		priceCop: 195000,
		description: 'Adrenalina pura en los mejores parques tematicos de la ciudad.',
		fullDescription: 'Para los amantes de la adrenalina, vive la experiencia en Salitre Mágico o Mundo Aventura con adrenalina pura. Incluye traslado desde tu hotel, almuerzo e igualmente, ¡vive la aventura con refrigerio nocturno disfrutando de todas las atracciones sin límites!.',
		highlights: [{code: 'AD', label: 'Adrenalina'}, {code: 'PA', label: 'Parques'}, {code: 'AT', label: 'Atracciones'}],
		image: 'https://www.figma.com/api/mcp/asset/dadd04d3-ea29-4625-bbcb-8edc7885033a'
	},
	{
		slug: 'cascadas-tour',
		category: 'Linea deportiva',
		title: 'Cascadas Tour',
		price: '$175.000',
		priceCop: 175000,
		description: 'Caminata ecologica por los cerros orientales hasta encontrar cascadas.',
		fullDescription: 'Desconecta de la rutina con senderismo de alta intensidad, avistamiento de aves y meditación frente a cascadas. Visitaremos Chorrera de Choachí o Salto del Tequendama según disponibilidad con desayuno antes de salir, almuerzo tipo picnic en la naturaleza y refrigerio nocturno. ¡Separa tu cupo para esta aventura inolvidable!',
		highlights: [{code: 'SD', label: 'Senderismo'}, {code: 'AA', label: 'Aves'}, {code: 'MD', label: 'Meditación'}],
		image: 'https://www.figma.com/api/mcp/asset/a4b14240-52e6-437a-94b0-e22d010dfff2'
	},
	{
		slug: 'gastronomia',
		category: 'Linea gastronomica',
		title: 'Gastronomía',
		price: '$220.000',
		priceCop: 220000,
		description: 'Un festin para los sentidos con mercados tradicionales y alta cocina.',
		fullDescription: 'Si quieres vivir una experiencia gastronómica con contrastes culturales, te proponemos un plan de tres tiempos: desayuno de plaza, almuerzo en el centro con ajiaco santafereño, una auténtica sopa bogotana, y una tarde de postres especiales en lugares emblemáticos.',
		highlights: [{code: 'DS', label: 'Desayuno'}, {code: 'AJ', label: 'Ajiaco'}, {code: 'PS', label: 'Postres'}],
		image: 'https://www.figma.com/api/mcp/asset/5f20bdd2-1a80-4ea1-9488-cef2d906a59a'
	},
	{
		slug: 'todo-al-50',
		category: 'Linea compras',
		title: 'Todo al 50%',
		price: '$80.000',
		priceCop: 80000,
		description: 'Guia experta por outlets y zonas de descuentos para encontrar tesoros.',
		fullDescription: 'Para los amantes del ahorro y las compras, visitaremos el outlet de las Américas en el sector de Calle 13, con múltiples marcas reconocidas internacionalmente. Descuentos disponibles todas las épocas del año con guía experta que conoce los mejores deals.',
		highlights: [{code: 'OT', label: 'Outlet'}, {code: 'DC', label: 'Descuentos'}, {code: 'GU', label: 'Guía'}],
		image: 'https://www.figma.com/api/mcp/asset/4ffe208b-3535-4619-ae61-2a31943f788a'
	},
	{
		slug: 'centros-comerciales-tour',
		category: 'Linea compras',
		title: 'Centros comerciales Tour',
		price: '$90.000',
		priceCop: 90000,
		description: 'Explora centros comerciales con marcas globales y arquitectura moderna.',
		fullDescription: 'Visita los centros comerciales más modernos de Bogotá con marcas globales, tiendas premium y arquitectura vanguardista. Un recorrido diseñado para los que buscan experiencia de compra de clase mundial con personal guía experto en recomendaciones y mejores opciones.',
		highlights: [{code: 'CC', label: 'Centros'}, {code: 'MG', label: 'Marcas'}, {code: 'AR', label: 'Arquitectura'}],
		image: 'https://www.figma.com/api/mcp/asset/4ffe208b-3535-4619-ae61-2a31943f788a'
	},
	{
		slug: 'caminata-por-parque-nacional-natural',
		category: 'Linea deportiva',
		title: 'Caminata por Parque Nacional Natural',
		price: '$280.000',
		priceCop: 280000,
		description: 'Expedición al páramo para avistar frailejones y fauna autóctona.',
		fullDescription: 'Conoce el páramo en nuestra expedición al Parque Nacional Natural Chingaza con recorrido guiado para avistar frailejones y venados de cola blanca. Incluye transporte privado, entrada al parque, desayuno, almuerzo, cena, noche de alojamiento en refugio compartido, guía ambiental y seguro de asistencia médica.',
		highlights: [{code: 'PQ', label: 'Páramo'}, {code: 'AA', label: 'Fauna'}, {code: 'AL', label: 'Alojamiento'}],
		image: 'https://www.figma.com/api/mcp/asset/a4b14240-52e6-437a-94b0-e22d010dfff2'
	},
	{
		slug: 'jaime-duque',
		category: 'Linea aventura',
		title: 'Jaime Duque',
		price: '$240.000',
		priceCop: 240000,
		description: 'Experiencia completa en el parque temático más grande de la región.',
		fullDescription: 'Vive una experiencia única en el Parque Jaime Duque, incluye desayuno, almuerzo, cena, entrada al parque con pasaporte legado, transporte de turismo climatizado con asistencia médica disponible. Un día completo de diversión familiar con múltiples atracciones y experiencias unforgettable.',
		highlights: [{code: 'PJ', label: 'Parque'}, {code: 'CM', label: 'Comidas'}, {code: 'TR', label: 'Transporte'}],
		image: 'https://www.figma.com/api/mcp/asset/dadd04d3-ea29-4625-bbcb-8edc7885033a'
	},
	{
		slug: 'plan-romantico',
		category: 'Linea cultural',
		title: 'Plan romántico',
		price: '$320.000',
		priceCop: 320000,
		description: 'Experiencia de parejas con detalles especiales y atardeceres.',
		fullDescription: 'Huye del ruido con tu pareja en una experiencia por estaciones: Picnic y lectura en Jardín Botánico, caminata por zona colonial de Usaquén visitando tiendas y galerías, postre en cafetería aliada y visita a Parroquia Santa Bárbara. Final romántico mirando atardecer en La Calera con canelazo y estrellas. Opcional: cena en Zona G.',
		highlights: [{code: 'PC', label: 'Picnic'}, {code: 'AT', label: 'Atardecer'}, {code: 'ES', label: 'Especial'}],
		image: 'https://www.figma.com/api/mcp/asset/45193f4c-09f2-4a06-ac4c-3d051c3b9341'
	},
	{
		slug: 'puntos-principales',
		category: 'Linea cultural',
		title: 'Puntos principales',
		price: '$150.000',
		priceCop: 150000,
		description: 'Recorrido esencial por los sitios imprescindibles de Bogotá.',
		fullDescription: 'Visita puntos imprescindibles como Plazoleta del Chorro de Quevedo con sesión de cuentería y chicha artesanal, Plaza de Bolívar, Centro Cultural GGM, Parque Santander con Museo de Oro, Usaquén y el Mercado de las Pulgas en busca de artesanías de alta calidad. Finaliza con café en terrazas frente al parque.',
		highlights: [{code: 'CU', label: 'Cultura'}, {code: 'ME', label: 'Mercado'}, {code: 'VA', label: 'Variedad'}],
		image: 'https://www.figma.com/api/mcp/asset/76b66a22-e790-4bc3-9057-54c8944d9166'
	},
	{
		slug: 'iglesias-y-peregrination',
		category: 'Linea religiosa',
		title: 'Iglesias y peregrinación',
		price: '$125.000',
		priceCop: 125000,
		description: 'Tour guiado por las principales iglesias y catedrales de Bogotá.',
		fullDescription: 'Visitaremos en tour guiado las principales catedrales de Bogotá con refrigerio y comidas incluidas: Catedral Primada de Colombia, Basílica Menor de Nuestra Señora de Lourdes, Santuario Nuestra Señora del Carmen, Iglesia de San Francisco y Basílica del Sagrado Corazón de Jesús. Un recorrido espiritual por la arquitectura religiosa más importante.',
		highlights: [{code: 'CT', label: 'Catedrales'}, {code: 'AR', label: 'Religión'}, {code: 'RF', label: 'Refrigerio'}],
		image: 'https://www.figma.com/api/mcp/asset/912eb63f-7620-4596-9913-9c1bb70b4392'
	},
	{
		slug: 'mina-de-sal-de-zipaquira',
		category: 'Linea aventura',
		title: 'Mina de sal de Zipaquirá',
		price: '$135.000',
		priceCop: 135000,
		description: 'Catedral bajo tierra: exploración de la única catedral en una mina de sal.',
		fullDescription: 'Conoce una catedral asombrosa llena de historia, la única catedral del mundo construida dentro de una mina de sal a 180 metros bajo tierra. Tras descender y explorar sus galerías sagradas, caminaremos por la plaza de los comuneros conociendo la arquitectura y gastronomía local de Zipaquirá. Una experiencia arqueológica y religiosa única.',
		highlights: [{code: 'MN', label: 'Mina'}, {code: 'CT', label: 'Catedral'}, {code: 'GS', label: 'Gastronomía'}],
		image: 'https://www.figma.com/api/mcp/asset/6cab6b98-c970-45d4-802b-7e4390a184b0'
	},
	{
		slug: 'bogota-a-tu-ritmo',
		category: 'Personalizado',
		title: 'Libre – "Una Bogotá a tu ritmo"',
		price: 'Personalizado',
		priceCop: 0,
		description: 'Personaliza tu viaje según tus preferencias, fechas y presupuesto.',
		fullDescription: 'Contáctanos y personaliza tu viaje según la cantidad de personas, el estilo del tour, las fechas y tu presupuesto. Nosotros te brindaremos la opción más adecuada a tus necesidades particulares. Desde tours de aventura hasta experiencias culturales, diseñamos tu Bogotá perfecta.',
		highlights: [{code: 'PS', label: 'Personalizado'}, {code: 'FL', label: 'Flexible'}, {code: 'CT', label: 'Contáctanos'}],
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
	'Linea compras': 'is-muted',
	'Linea religiosa': 'is-amber',
	'Personalizado': 'is-blue'
};

let selectedCatalogItem = null;

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
						<strong>${item.priceCop > 0 ? toPricePerPerson(item.priceCop) : 'Contáctanos'}</strong>
					</div>
				</div>
			</div>

			<div class="detail-grid">
				<div class="detail-content-left">
					<div class="detail-description">
						<p class="detail-eyebrow">About the Journey</p>
						<p class="detail-copy">${item.fullDescription}</p>
					</div>

					<div class="detail-highlights" role="list" aria-label="Resumen del recorrido">
						${item.highlights.map(h => `<div class="detail-highlight-item" role="listitem"><span class="detail-highlight-icon" aria-hidden="true">${h.code}</span><p>${h.label}</p></div>`).join('')}
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
						<div class="detail-counter" data-price="${item.priceCop}">
							<button type="button" class="detail-counter-button" data-action="decrease" aria-label="Disminuir personas">-</button>
							<strong class="detail-counter-value" id="detail-counter-value">2</strong>
							<button type="button" class="detail-counter-button" data-action="increase" aria-label="Aumentar personas">+</button>
						</div>
					</div>

					<div class="detail-total-row">
						<span>Total</span>
						<strong id="detail-total-value">${item.priceCop > 0 ? toPricePerPerson(item.priceCop * 2) : 'Contáctanos'}</strong>
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
			<a href="#catalogo/${item.slug}" class="bogota-link" aria-label="Ver detalles de ${item.title}">Ver Detalles <span aria-hidden="true">→</span></a>
		</div>
	`;

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
				selectedCatalogItem = null;
				renderCatalogSection();
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
				totalValue.textContent = toPricePerPerson(price * people);
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

				window.alert(
					`Reserva iniciada para ${selectedCatalogItem.title} el ${toLongDate(scheduleDate)} (${toIsoDate(scheduleDate)}).`
				);
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

export { catalogItems, categoryThemeClass, toPricePerPerson };
