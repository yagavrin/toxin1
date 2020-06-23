import './room-details.scss'

export default function roomDetails () {
  let bookingBtn = document.querySelector('.show-booking');
  let filter = document.querySelector('.booking');
  if (!bookingBtn) return;
  bookingBtn.onclick = function() {
    filter.classList.toggle('booking_dropdown');
    if (filter.classList.contains('booking_dropdown')) {
      console.log('fdf');
      bookingBtn.firstElementChild.textContent = 'скрыть форму бронирования';
    } else {
      bookingBtn.firstElementChild.textContent = 'Забронировать номер';
    }
  }
}