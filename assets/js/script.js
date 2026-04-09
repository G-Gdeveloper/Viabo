document.body.dataset.js = "on";

const slides = [
  {
    src: "assets/images/Carrusel1.jpg",
    alt: "Escena historica 1",
    thumb: "assets/images/Carrusel1.jpg"
  },
  {
    src: "assets/images/Carrusel2.png",
    alt: "Escena historica 2",
    thumb: "assets/images/Carrusel2.png"
  },
  {
    src: "assets/images/Carrusel3.jpg",
    alt: "Escena historica 3",
    thumb: "assets/images/Carrusel3.jpg"
  },
  {
    src: "assets/images/Carrusel4.jpg",
    alt: "Escena historica 4",
    thumb: "assets/images/Carrusel4.jpg"
  },
  {
    src: "assets/images/Carrusel5.jpg",
    alt: "Escena historica 5",
    thumb: "assets/images/Carrusel5.jpg"
  }
];

const mainImage = document.getElementById("history-main-image");
const thumbsContainer = document.getElementById("history-thumbs");
const prevButton = document.querySelector(".gallery__btn--prev");
const nextButton = document.querySelector(".gallery__btn--next");

let currentIndex = 0;
let thumbButtons = [];

function setSlide(index) {
  currentIndex = (index + slides.length) % slides.length;
  const currentSlide = slides[currentIndex];

  mainImage.src = currentSlide.src;
  mainImage.alt = currentSlide.alt;

  thumbButtons.forEach((button, buttonIndex) => {
    const isActive = buttonIndex === currentIndex;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function createThumbnails() {
  const fragment = document.createDocumentFragment();

  slides.forEach((slide, index) => {
    const thumbButton = document.createElement("button");
    const thumbImage = document.createElement("img");

    thumbButton.type = "button";
    thumbButton.className = "thumb";
    thumbButton.setAttribute("aria-label", `Ver imagen ${index + 1}`);
    thumbButton.setAttribute("aria-pressed", "false");

    thumbImage.src = slide.thumb || slide.src;
    thumbImage.alt = `Miniatura ${index + 1}`;

    thumbButton.appendChild(thumbImage);
    thumbButton.addEventListener("click", () => setSlide(index));
    fragment.appendChild(thumbButton);
    thumbButtons.push(thumbButton);
  });

  thumbsContainer.appendChild(fragment);
}

if (mainImage && thumbsContainer && prevButton && nextButton) {
  createThumbnails();
  setSlide(0);

  prevButton.addEventListener("click", () => setSlide(currentIndex - 1));
  nextButton.addEventListener("click", () => setSlide(currentIndex + 1));

  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      setSlide(currentIndex - 1);
    }

    if (event.key === "ArrowRight") {
      setSlide(currentIndex + 1);
    }
  });
}

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2
    }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}