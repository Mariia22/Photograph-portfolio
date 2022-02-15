const menu = document.querySelector('.header__menu');
const hamburgerIcon = document.querySelector('.header__icon');

function toggleMenu() {
  hamburgerIcon.classList.toggle('header__icon-active');
  menu.classList.toggle('header__menu-open');
  document.body.classList.toggle('overflow-hidden');
}

function closeMenu(event) {
  if (event.target.classList.contains('header__link')) {
    hamburgerIcon.classList.remove('header__icon-active');
    menu.classList.remove('header__menu-open');
    document.body.classList.remove('overflow-hidden');
  }
}

export { toggleMenu, closeMenu };