import './search-page.scss'

export default function searchPage() {
  let filterBtn = document.querySelector('.show-filter');
  let filter = document.querySelector('.filter');
  if (!filterBtn) return;
  filterBtn.onclick = function() {
    filter.classList.toggle('filter_dropdown');
    if (filterBtn.firstElementChild.textContent == 'показать фильтры') {
      filterBtn.firstElementChild.textContent = 'cкрыть фильтры';
    } else {
      filterBtn.firstElementChild.textContent = 'показать фильтры';
    }
  }
}