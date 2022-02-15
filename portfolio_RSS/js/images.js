import toggleActive from "./common.js";

function downloadImages(event) {
  if (event.target.classList.contains('portfolio__btn')) {
    let season = event.target.getAttribute('data-season');
    const images = document.querySelectorAll('.portfolio__img');
    images.forEach((img, index) => img.src = `./assets/img/${season}/${index + 1}.jpg`);
  }
}

function changeImagesAndActiveButton(event) {
  const button = document.querySelectorAll('.portfolio__btn');
  downloadImages(event);
  toggleActive('portfolio__btn-active', button, event.target);
}

function preloadImages(arr) {
  arr.forEach(item => {
    for (let i = 1; i <= 6; i++) {
      const img = new Image();
      img.src = `./assets/img/${item}/${i}.jpg`;
    }
  })
}

export { changeImagesAndActiveButton, preloadImages };