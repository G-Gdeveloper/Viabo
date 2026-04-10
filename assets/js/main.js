import './layout/navbar.js';
import { renderHomeSection } from './pages/home.js';
import { renderCatalogSection } from './pages/catalog.js';
import { renderAboutUsSection } from './pages/aboutUs.js';

const routes = {
	home: renderHomeSection,
	catalog: renderCatalogSection,
	about: renderAboutUsSection
};

const currentPath = window.location.pathname;
const hasSpaMount = Boolean(document.querySelector('#app-home'));

if (currentPath.endsWith('/index.html')) {
	const rootPath = currentPath.slice(0, -'index.html'.length);
	const currentHash = window.location.hash || '#home';
	window.history.replaceState(null, '', `${rootPath}${currentHash}`);
}

if (currentPath.endsWith('/QuienesSomos.html')) {
	const rootPath = currentPath.slice(0, -'QuienesSomos.html'.length);
	const currentHash = window.location.hash || '#about';
	window.history.replaceState(null, '', `${rootPath}${currentHash}`);
}

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

function redirectNonSpaRoutes(route) {
	if (hasSpaMount) {
		return false;
	}

	if (route === 'home' || route === 'catalog') {
		window.location.replace(`/index.html#${route}`);
		return true;
	}

	return false;
}

function renderRoute() {
	const route = getRouteFromHash();

	if (route === 'about' && hasSpaMount) {
		window.location.replace('/QuienesSomos.html#about');
		return;
	}

	const renderPage = routes[route];

	if (!renderPage) {
		return;
	}

	renderPage();
	setActiveNavLink(route);
}

if (hasSpaMount) {
	window.addEventListener('hashchange', renderRoute);

	if (!window.location.hash) {
		window.location.hash = '#home';
	} else {
		renderRoute();
	}
} else {
	window.addEventListener('hashchange', () => {
		const route = getRouteFromHash();
		redirectNonSpaRoutes(route);
	});

	const route = getRouteFromHash();
	redirectNonSpaRoutes(route);
}
