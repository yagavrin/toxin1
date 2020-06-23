import './header.scss'

export default function header() {
  let hamburger = document.querySelector('.header__hamburger');
  let navigation = document.querySelector('.menu__list')
  hamburger.onclick = function() {
    hamburger.classList.toggle('header__hamburger_active');
    navigation.classList.toggle('menu__list_active');
  }
}