export function renderAboutUsSection() {
	const mountNode = document.querySelector('#app-home');

	if (!mountNode) {
		return;
	}

	mountNode.innerHTML = `
		<section id="services" aria-label="Sobre Viabo">
			<h3>Nosotros</h3>
			<h2>Conoce Viabo</h2>
			<p style="max-width: 760px; color: #3e4944; line-height: 1.7; font-size: 1.05rem;">
				Somos un equipo enfocado en crear experiencias turisticas memorables en Bogota,
				combinando cultura, aventura y bienestar para visitantes nacionales e internacionales.
			</p>
		</section>
	`;
}
