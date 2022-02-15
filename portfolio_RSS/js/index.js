import toggleActive from './common.js'
import { changeImagesAndActiveButton, preloadImages } from './images.js'
import { toggleMenu, closeMenu } from './menu.js'
import { getTranslate, setTranslate } from './translate.js'
import { changeColors, setTheme } from './theme.js'
import clickEffect from './effects.js'

let lang;
let theme;
const hamburgerIcon = document.querySelector('.header__icon')
const buttons = document.querySelector('.portfolio__buttons')
const navLinks = document.querySelectorAll('.header__link')
const languageButtons = document.querySelectorAll('[name="language"]')
const themeButton = document.querySelector('.header__theme')
const seasons = ['winter', 'spring', 'summer', 'autumn']
const buttonActive = document.querySelector('.hero__btn')

navLinks.forEach(item => item.addEventListener('click', closeMenu))
hamburgerIcon.addEventListener('click', toggleMenu)

buttons.addEventListener('click', changeImagesAndActiveButton)
buttonActive.addEventListener('click', clickEffect);
preloadImages(seasons);

languageButtons.forEach(item => item.addEventListener('click', changeLanguageAndActiveButton))

function changeLanguageAndActiveButton(event) {
  getTranslate(event);
  const radioButtons = document.querySelectorAll('.header__language__label')
  toggleActive('header__language-active', radioButtons, event.path[1])
  return lang === 'ru' ? lang = 'en' : lang = 'ru'
}

themeButton.addEventListener('click', changeTheme)

function changeTheme() {
  document.body.classList.toggle('light-theme')
  changeColors();
  return theme === 'light' ? theme = 'dark' : theme = 'light';
}

function setLocalStorage() {
  localStorage.setItem('lang', lang)
  localStorage.setItem('theme', theme)
}
window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
  localStorage.getItem('lang') ? lang = localStorage.getItem('lang') : lang = 'en'
  setTranslate(lang);
  localStorage.getItem('theme') ? theme = localStorage.getItem('theme') : theme = 'dark'
  setTheme(theme);
}
window.addEventListener('load', getLocalStorage)
