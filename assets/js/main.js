import './layout/navbar.js';
import { renderHomeSection } from './pages/home.js';
import { renderCatalogSection } from './pages/catalog.js';
import { renderAboutUsSection } from './pages/aboutUs.js';
import { renderServiceDetailSection } from './pages/serviceDetail.js';

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

function getSlugFromPath() {
	const path = window.location.pathname;
	const match = path.match(/\/catalogo\/([a-z0-9\-]+)$/);
	return match ? match[1] : null;
}

function getSlugFromHash() {
	const hash = window.location.hash.replace('#', '').trim().toLowerCase();
	const match = hash.match(/^catalogo\/([a-z0-9\-]+)$/);
	return match ? match[1] : null;
}

function renderRoute() {
	const pathSlug = getSlugFromPath();
	const hashSlug = getSlugFromHash();
	const slug = pathSlug || hashSlug;

	if (slug) {
		renderServiceDetailSection(slug);
		setActiveNavLink('catalog');
		return;
	}

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
	window.addEventListener('popstate', renderRoute);

	if (!window.location.hash && !getSlugFromPath()) {
		window.location.hash = '#home';
	} else {
		renderRoute();
	}
}
