import './range-slider.scss'

export default function rangeSlider () {
  let startPoint = document.querySelector('.range-slider__point_start');
  let finishPoint = document.querySelector('.range-slider__point_finish');
  let slider = document.querySelector('.range-slider__scale');
  let coloredBlock = document.querySelector('.range-slider__scale_colored');
  let bottom = document.querySelector('.range-slider__bottom');
  let top = document.querySelector('.range-slider__top');
  const upperLimit = 16000;
  let newLeft;
  
  startPoint.onmousedown = function(event) {
    event.preventDefault();
    let shiftX = event.clientX - startPoint.getBoundingClientRect().left;

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    function onMouseMove(event) {

      newLeft = event.clientX - shiftX - slider.getBoundingClientRect().left;

      if (newLeft < -startPoint.offsetWidth/2) {
        newLeft = -startPoint.offsetWidth/2;
      }

      if (newLeft + startPoint.offsetWidth > finishPoint.getBoundingClientRect().left - slider.getBoundingClientRect().left) {
        newLeft = finishPoint.getBoundingClientRect().left - slider.getBoundingClientRect().left - startPoint.offsetWidth
      }

      startPoint.style.left = newLeft + 'px';
      coloredBlock.style.left = newLeft + startPoint.offsetWidth/2 + 'px';
      coloredBlock.style.width = finishPoint.getBoundingClientRect().left - slider.getBoundingClientRect().left - newLeft + 'px';
      bottom.textContent= roundNum(Math.round((startPoint.getBoundingClientRect().left - slider.getBoundingClientRect().left + startPoint.offsetWidth /2 ) / (slider.offsetWidth - startPoint.offsetWidth) * upperLimit)) + '₽ - ';
    }

    function onMouseUp() {
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mousemove', onMouseMove);
    }

  }
  
  finishPoint.onmousedown = function(event) {
    event.preventDefault();
    let shiftX = event.clientX - finishPoint.getBoundingClientRect().left;

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    function onMouseMove(event) {
      newLeft = event.clientX - shiftX - slider.getBoundingClientRect().left;

      if (newLeft < startPoint.getBoundingClientRect().right - slider.getBoundingClientRect().left ) {
        newLeft = startPoint.getBoundingClientRect().right - slider.getBoundingClientRect().left
      }

      let rightEdge = slider.offsetWidth - startPoint.offsetWidth/2;
      if (newLeft > rightEdge) {
        newLeft = rightEdge;
      }

      finishPoint.style.left = newLeft + 'px';

      coloredBlock.style.width = newLeft + startPoint.offsetWidth - (startPoint.getBoundingClientRect().right - slider.getBoundingClientRect().left) + 'px';
      top.textContent = roundNum(Math.round((finishPoint.getBoundingClientRect().left - slider.getBoundingClientRect().left - startPoint.offsetWidth / 2) / (slider.offsetWidth - startPoint.offsetWidth) * upperLimit)) + "₽";
    }

    function onMouseUp() {
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mousemove', onMouseMove);
    }

  }

  startPoint.ondragstart = function() {
    return false;
  };
  finishPoint.ondragstart = function() {
    return false;
  };

  function roundNum (num) {
    let divider = 100
    let divisionRemainder = num % divider;
  
    if (divisionRemainder === 0) {
      return num.toLocaleString('ru');
    } else if (divisionRemainder > divider/2) {
      return (num - divisionRemainder + divider).toLocaleString('ru');
    } else {
      return (num - divisionRemainder).toLocaleString('ru');
    }
  }

}


