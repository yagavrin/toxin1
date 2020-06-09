import './buttons.scss'

export default function buttons () {

  document.addEventListener('click', function(event) {

    let btn = event.target.closest('.btn');

    if (btn) {

      if (btn.classList.contains('btn_border')) {
        btn.classList.add('btn_border_toggled');
        setTimeout( () => btn.classList.remove('btn_border_toggled'), 500);
        return;
      }

      btn.style.opacity = '0.5';
      setTimeout( () => btn.style.opacity = '', 500);

    };

    let noBorderBtn = event.target.closest('.no-border-btn');

    if (noBorderBtn) {
      noBorderBtn.style.color = 'rgba(31, 32, 65, 0.5)';
    setTimeout( () => noBorderBtn.style.color = '', 500);
    }
    
  })
  
}