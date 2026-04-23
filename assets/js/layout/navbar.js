import '../utils/cartBadge.js';

(function () {
	const header = document.querySelector('.siteHeader');

	if (!header) {
		return;
	}

	const menuButton = header.querySelector('.menuButton');
	const nav = header.querySelector('.siteNav');
	const backdrop = header.querySelector('.headerBackdrop');

	if (!menuButton || !nav || !backdrop) {
		return;
	}

	const setOpenState = (isOpen) => {
		header.classList.toggle('is-open', isOpen);
		menuButton.setAttribute('aria-expanded', String(isOpen));
		backdrop.hidden = !isOpen;
	};

	menuButton.addEventListener('click', () => {
		setOpenState(!header.classList.contains('is-open'));
	});

	backdrop.addEventListener('click', () => setOpenState(false));

	nav.querySelectorAll('a').forEach((link) => {
		link.addEventListener('click', () => setOpenState(false));
	});

	window.addEventListener('keydown', (event) => {
		if (event.key === 'Escape') {
			setOpenState(false);
		}
	});
})();
