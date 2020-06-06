import './pagination.scss'

export default function pagination () {

  document.addEventListener('click', function(event) {
    let items = document.querySelectorAll('.pagination__item')
    let targetItem = event.target.closest('.pagination__item');

    if (event.target.classList.contains('pagination__item_divider')) {
      return;
    }

    if (targetItem) {
      event.preventDefault();

      for (let item of items) {
        item.classList.remove('pagination__item_active');
      }

      targetItem.classList.add('pagination__item_active');
    }
  })
}