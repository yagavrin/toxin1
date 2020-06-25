import './room-details.scss'

export default function roomDetails () {
  let bookingBtn = document.querySelector('.show-booking');
  let filter = document.querySelector('.booking');
  if (!bookingBtn) return;
  bookingBtn.onclick = function() {
    filter.classList.toggle('booking_dropdown');
    if (filter.classList.contains('booking_dropdown')) {
      bookingBtn.firstElementChild.textContent = 'скрыть форму бронирования';
    } else {
      bookingBtn.firstElementChild.textContent = 'Забронировать номер';
    }
  }
  
  let background = document.querySelector('.room-details__background');
  let closeBtn = document.querySelector('.room-details__background-close');
  let activeItem = document.querySelector('.room-details__gallery-item_active');

  document.addEventListener('click', function(event) {
    let item = event.target.closest('.room-details__gallery-item');
    if (item) {
      background.classList.toggle('room-details__background_active');
      activeItem.src = item.src;
    }
    
    if (event.target == background || event.target.closest('.room-details__background-close')) {
      background.classList.toggle('room-details__background_active');
    }
  })

  activeItem.onmouseover = function() {
    closeBtn.classList.toggle('room-details__background-close_active')
  }

  activeItem.onmouseout = function() {
    closeBtn.classList.toggle('room-details__background-close_active')
  }

}