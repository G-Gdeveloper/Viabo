class Header extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <link rel="stylesheet" href="./assets/css/Home.css">
            <header class="siteHeader" style >
                <div class="headerInner">
                    <a class="brand" href="#" aria-label="Ir al inicio">
                        <img class="brandLogo" src="/assets/imagenes/Logo.png" alt="Viabo">
                    </a>

                    <button class="menuButton" type="button" aria-label="Abrir menú" aria-expanded="false" aria-controls="site-navigation">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>

                    <nav class="siteNav" id="site-navigation" aria-label="Navegación principal">
                        <ul>
                            <li><a href="#">Inicio</a></li>
                            <li><a class="active" href="#">Catálogo</a></li>
                            <li><a href="#">Nosotros</a></li>
                            <li><a href="./contact.html">Contacto</a></li>
                        </ul>
                    </nav>

                    <a class="cartButton" href="#" aria-label="Ir al carrito">
                        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                            <path d="M3 4h2l2.2 9.3a1 1 0 0 0 1 .7h8.8a1 1 0 0 0 1-.8L20 7H7" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/>
                            <circle cx="10" cy="19" r="1.6" fill="currentColor"/>
                            <circle cx="17" cy="19" r="1.6" fill="currentColor"/>
                        </svg>
                    </a>
                </div>

                <div class="headerBackdrop" hidden></div>
            </header>
        `;
    }
}
customElements.define('viabo-header', Header);