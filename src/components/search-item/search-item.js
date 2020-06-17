import './search-item.scss'

export default function searchItem () {
  let width = 270; // ширина картинки
  let carousel = document.querySelector('#carousel')
  let list = carousel.querySelector('ul');
  let listElems = carousel.querySelectorAll('li');

  let position = 0; // положение ленты прокрутки
  let i = 0;
  document.addEventListener('click', function(event) {
    console.log(event.target.closest('.search-item__li'));
    let slider = event.target.closest('.search-item__slider');
    if (slider) {
      let slides = slider.querySelectorAll('li');
      for (let i =0; i < slides.length; i++) {
        slides[i].setAttribute('data-slide-number', i)
      }
      let dots = slider.querySelectorAll('.search-item__nav-dot');
      for (let i =0; i < dots.length; i++) {
        dots[i].setAttribute('data-dot-number', i)
      }
    }
    
    let dot = event.target.closest('.search-item__nav-dot');

    if (dot) {
      let dotNumber = dot.dataset.dotNumber;
      
      list.style.marginLeft = -width * dotNumber + 'px';
      
      let parent = dot.parentElement;
      let otherDots = parent.querySelectorAll('.search-item__nav-dot');
      for (let dot of otherDots) {
        dot.classList.remove('search-item__nav-dot_active')
      }
      dot.classList.add('search-item__nav-dot_active');
    }
    
    let firstDot = document.querySelector('.search-item__nav-dot')
    let navLeft = event.target.closest('.search-item__nav-left');
    if (navLeft) {
      position += width;
      console.log(position);
      if (position == 0) {
        position = -width * (listElems.length - 1)
      }
      list.style.marginLeft = position + 'px';
      
    }

    let navRight = event.target.closest('.search-item__nav-right');
    
    if (navRight) {
      position -= width;
      console.log(position);
      if (position == -width * (listElems.length - 1)) {
        position = 0;
      }
      list.style.marginLeft = position + 'px';
      firstDot.classList.remove('search-item__nav-dot_active');
      firstDot.nextElementSibling.classList.add('search-item__nav-dot_active');
      
      i++;
      console.log(i) 
      let dots = document.querySelectorAll('.search-item__nav-dot');
      for (let dot of dots) {
        let num = dot.getAttribute('data-dot-number');
        if (num == i) {
          console.log(dot)
          dot.classList.add('search-item__nav-dot_active')
        } else {dot.classList.remove('search-item__nav-dot_active')};
      }
    }
  })

  document.addEventListener('mouseover', function(event) {

    let slider = event.target.closest('.search-item__slider');

    if (slider) {
      let navLeft = slider.querySelector('.search-item__nav-left');
      let navRight = slider.querySelector('.search-item__nav-right');
      navLeft.classList.add('search-item__nav-left_active');
      navRight.classList.add('search-item__nav-right_active');
    }
  })

  document.addEventListener('mouseout', function(event) {

    let slider = event.target.closest('.search-item__slider');

    if (slider) {
      let navLeft = slider.querySelector('.search-item__nav-left');
      let navRight = slider.querySelector('.search-item__nav-right');
      navLeft.classList.remove('search-item__nav-left_active');
      navRight.classList.remove('search-item__nav-right_active');
    }
  })
}