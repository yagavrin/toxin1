import './search-item.scss'

export default function searchItem () {
  let width = 270; // ширина картинки

  let position = 0; // положение ленты прокрутки
  
  let i = 0;

  document.addEventListener('click', function(event) {
    let slider = event.target.closest('.search-item__slider');

    if (slider) {
      let list = slider.querySelector('ul');
      let slides = slider.querySelectorAll('li');
      for (let i =0; i < slides.length; i++) {
        slides[i].setAttribute('data-slide-number', i)
      }
      let dots = slider.querySelectorAll('.search-item__nav-dot');
      for (let i =0; i < dots.length; i++) {
        dots[i].setAttribute('data-dot-number', i)
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

      let navLeft = event.target.closest('.search-item__nav-left');
      if (navLeft) {
        position += width;
        if (position > 0) {
          position = -width * (slides.length - 1)
        }
        list.style.marginLeft = position + 'px';
        let dots = slider.querySelectorAll('.search-item__nav-dot');
        if (i == 0) {
          dots[0].classList.remove('search-item__nav-dot_active')
          i = slides.length;
          dots[slides.length-1].classList.add('search-item__nav-dot_active')
        }
        if (i > 0) {
          i--;
        }
        
        for (let dot of dots) {
          let num = dot.getAttribute('data-dot-number');
          if (num == i) {
            dot.classList.add('search-item__nav-dot_active')
          } else {
            dot.classList.remove('search-item__nav-dot_active')
          };

          
        }
        
        
      }

      let navRight = event.target.closest('.search-item__nav-right');
    
      if (navRight) {
        position -= width;
        if (position == -width * (slides.length)) {
          position = 0;
        }
        list.style.marginLeft = position + 'px';

        
        i++;
        console.log(i);
        let dots = slider.querySelectorAll('.search-item__nav-dot');
        for (let dot of dots) {
          let num = dot.getAttribute('data-dot-number');
          if (num == i) {
            dot.classList.add('search-item__nav-dot_active')
          } else {
            dot.classList.remove('search-item__nav-dot_active')
          };

          if (i > slides.length-1) {
            console.log('dct ghbotw')
            dots[slides.length-1].classList.remove('search-item__nav-dot_active')
            i = 0;
            dots[0].classList.add('search-item__nav-dot_active')
          }
        }
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
  let sliders = document.querySelectorAll(".search-item__slider");

  for (let slider of sliders) {
    slider.addEventListener('mouseleave', function(event) {

      let slider = event.target.closest('.search-item__slider');
  
      if (slider) {
        i = 0;
        
        let list = slider.querySelector('ul');
        position = 0;
        list.style.marginLeft = 0 + 'px';
        let dots = slider.querySelectorAll('.search-item__nav-dot');
        for (let dot of dots) {
          dot.classList.remove('search-item__nav-dot_active')
        }
        dots[0].classList.add('search-item__nav-dot_active')
        let navLeft = slider.querySelector('.search-item__nav-left');
        let navRight = slider.querySelector('.search-item__nav-right');
        navLeft.classList.remove('search-item__nav-left_active');
        navRight.classList.remove('search-item__nav-right_active');
      }
    })
  }

}