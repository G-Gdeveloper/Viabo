const featuredExperiences = [
	{
		category: 'Aventura',
		title: 'Cerro Monserrate',
		price: '$95.000',
		description: 'Sube al mirador iconico de Bogota con guia local y vistas panoramicas.',
		image: '/assets/images/Monserrate.jpg'
	},
	{
		category: 'Cultural',
		title: 'La Candelaria',
		price: '$110.000',
		description: 'Recorrido por museos, plazas y arquitectura colonial en el centro historico.',
		image: '/assets/images/Candelaria.png'
	},
	{
		category: 'Gastronomia',
		title: 'Sabores de Bogota',
		price: '$130.000',
		description: 'Ruta de mercados y cocina local para probar platos tradicionales.',
		image: '/assets/images/Cascada.png'
	}
];

const testimonials = [
	{
		name: '6 Martínez',
		location: 'Guadalito, Venezuela',
		stars: '★★★★★',
		text: '"Una experiencia mágica. El guía conocía cada rincón de La Candelaria y nos contó historias que no están en los libros."',
		wide: false
	},
	{
		name: 'Wilfredo Sonders',
		location: 'Arauca, Arauca',
		stars: '★★★★☆',
		text: '"Monserrate al atardecer fue lo mejor de mi viaje. La organización fue impecable y nos sentimos seguros en todo momento."',
		wide: false
	},
	{
		name: 'Sofia Vergara',
		location: 'Keneddy, Bogota',
		stars: '★★★★★',
		text: '"El tour por los Saltos del Tequendama es impresionante. El respeto por la naturaleza y la historia local es notable."',
		wide: true
	}
];

function buildExperienceCard(item) {
	return `
		<article class="column-experience">
			<img src="${item.image}" alt="${item.title}">
			<span class="card-category">${item.category}</span>
			<h3 class="card-heading">${item.title}</h3>
			<div class="experience">
				<div class="card-body">
					<h2 class="card-title">${item.price}</h2>
					<h3 class="card-subtitle">4.9</h3>
					<p>${item.description}</p>
					<button type="button">Reservar</button>
				</div>
			</div>
		</article>
	`;
}

function buildTestimonialCard(item) {
	return `
		<article class="testimonialCard${item.wide ? ' testimonialCardWide' : ''}">
			<div>
				<div class="testimonialStars">${item.stars}</div>
				<p class="testimonialText">${item.text}</p>
			</div>
			<div class="testimonialAuthor">
				<div class="testimonialAvatar" aria-hidden="true">
					<svg class="testimonialAvatarIcon" viewBox="0 0 24 24" focusable="false">
						<path d="M12 12a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm0 2.25c-4.97 0-9 2.24-9 5v1.5h18v-1.5c0-2.76-4.03-5-9-5Z"/>
					</svg>
				</div>
				<div class="testimonialMeta">
					<h3 class="testimonialName">${item.name}</h3>
					<p class="testimonialLocation">${item.location}</p>
				</div>
			</div>
		</article>
	`;
}

export function renderHomeSection() {
	const mountNode = document.querySelector('#app-home');

	if (!mountNode) {
		return;
	}

	mountNode.innerHTML = `
		<section id="services" aria-label="Servicios destacados">
			<h3>Experiencias</h3>
			<h2>Home</h2>
			<div class="row-experiences">
				${featuredExperiences.map((item) => buildExperienceCard(item)).join('')}
			</div>
		</section>

		<section class="testimonialsSection" aria-labelledby="testimonials-title">
			<div class="testimonialsContainer">
				<div class="testimonialsHeader">
					<p class="testimonialsEyebrow">Testimonios</p>
					<h2 id="testimonials-title" class="testimonialsTitle">Voces de nuestros viajeros</h2>
				</div>
				<div class="testimonialsGrid">
					${testimonials.map((item) => buildTestimonialCard(item)).join('')}
				</div>
			</div>
		</section>
	`;

	const reserveButtons = mountNode.querySelectorAll('.experience button');
	reserveButtons.forEach((button) => {
		button.addEventListener('click', () => {
			window.alert('Pronto habilitaremos la reserva en linea.');
		});
	});
}
