import './layout/navbar.js';
import { renderHomeSection } from './pages/home.js';
import { renderCatalogSection } from './pages/catalog.js';
import { renderAboutUsSection } from './pages/aboutUs.js';

const routes = {
	home: renderHomeSection,
	catalog: renderCatalogSection,
	about: renderAboutUsSection
};

function getRouteFromHash() {
	const hash = window.location.hash.replace('#', '').trim().toLowerCase();
	return routes[hash] ? hash : 'home';
}

function setActiveNavLink(route) {
	const navLinks = document.querySelectorAll('.siteNav a[data-route]');

	navLinks.forEach((link) => {
		const linkRoute = link.getAttribute('data-route');
		link.classList.toggle('active', linkRoute === route);
	});
}

function renderRoute() {
	const route = getRouteFromHash();
	const renderPage = routes[route];

	if (!renderPage) {
		return;
	}

	renderPage();
	setActiveNavLink(route);
}

window.addEventListener('hashchange', renderRoute);

if (!window.location.hash) {
	window.location.hash = '#home';
} else {
	renderRoute();
}
