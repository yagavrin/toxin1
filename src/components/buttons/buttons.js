import './buttons.scss'

export default function buttons () {

  document.addEventListener('click', function(event) {

    let btn = event.target.closest('.btn');

    if (btn) {

      if (btn.classList.contains('btn_border')) {
        btn.style.background= 'rgba(188, 156, 255, 0.75)';
        setTimeout( () => btn.style.background = 'linear-gradient(180deg, #BC9CFF 0%, #8BA4F9 100%)', 500);
        return;
      }

      btn.style.opacity = '0.5';
      setTimeout( () => btn.style.opacity = '', 500);

    };
   
  })

  document.addEventListener('click', function(event) {
    let noBorderBtn = event.target.closest('.no-border-btn');
    if (!noBorderBtn) return;
    noBorderBtn.style.color = 'rgba(31, 32, 65, 0.5)';
    setTimeout( () => noBorderBtn.style.color = '', 500);
  })
  
}