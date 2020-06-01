import './expandable-checkbox.scss'

export default function expandableCheckbox () {
  const expandableMore = document.querySelector(':after')
  document.addEventListener('click', function(event) {

    if (event.target.classList.contains('expandable-checkbox__btn')) {
      event.target.classList.toggle('expandable-checkbox__btn_up')

      event.target.nextElementSibling.hasAttribute('hidden') ? 
      event.target.nextElementSibling.removeAttribute('hidden') : 
      event.target.nextElementSibling.setAttribute('hidden', '')
    }
  })
}