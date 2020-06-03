import './range-slider.scss'

export default function rangeSlider () {
  let startPoint = document.querySelector('.range-slider__point_start');
  let finishPoint = document.querySelector('.range-slider__point_finish');
  let slider = document.querySelector('.range-slider__block');
  let coloredBlock = document.querySelector('.range-slider__colored-block');
  let bottom = document.querySelector('.range-slider__bottom');
  let top = document.querySelector('.range-slider__top');
  const bottomText = +bottom.textContent;
  const topText = +top.textContent;
  let newLeft;


  startPoint.onmousedown = function(event) {
    event.preventDefault();
    let shiftX = event.clientX - startPoint.getBoundingClientRect().left;

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    function onMouseMove(event) {

      newLeft = event.clientX - shiftX - slider.getBoundingClientRect().left;

      if (newLeft < -startPoint.offsetWidth/2) {
        newLeft = 0 - startPoint.offsetWidth/2;
      }

      if (newLeft + startPoint.offsetWidth > finishPoint.getBoundingClientRect().left- slider.getBoundingClientRect().left) {
        newLeft = finishPoint.getBoundingClientRect().left - slider.getBoundingClientRect().left - startPoint.offsetWidth
      }

      let rightEdge = slider.offsetWidth - startPoint.offsetWidth/2;
      if (newLeft > rightEdge) {
        newLeft = rightEdge;
      }

      startPoint.style.left = newLeft + 'px';
      coloredBlock.style.left = newLeft + startPoint.offsetWidth + 'px';
      let coloredBlockWidth = finishPoint.getBoundingClientRect().left - slider.getBoundingClientRect().left - newLeft
      coloredBlock.style.width = coloredBlockWidth + 'px';
      bottom.textContent= roundNum(Math.round((startPoint.getBoundingClientRect().left - slider.getBoundingClientRect().left)/ 266 * topText)) + ' - ';
    }

    function onMouseUp() {
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mousemove', onMouseMove);
    }

  }
  
  finishPoint.onmousedown = function(event) {
    event.preventDefault();
    let shiftX = event.clientX - finishPoint.getBoundingClientRect().left + startPoint.offsetWidth;

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    function onMouseMove(event) {
      newLeft = event.clientX - shiftX - slider.getBoundingClientRect().left;

      if (newLeft < -startPoint.offsetWidth/2) {
        newLeft = 0 - startPoint.offsetWidth/2;
      }

      if (newLeft < startPoint.getBoundingClientRect().right - slider.getBoundingClientRect().left ) {
        newLeft = startPoint.getBoundingClientRect().right - slider.getBoundingClientRect().left - startPoint.offsetWidth
      }

      let rightEdge = slider.offsetWidth - startPoint.offsetWidth/2 - startPoint.offsetWidth;
      if (newLeft > rightEdge) {
        newLeft = rightEdge;
      }

      finishPoint.style.left = newLeft + 'px';
      let coloredBlockWidth = newLeft + startPoint.offsetWidth - (startPoint.getBoundingClientRect().left - slider.getBoundingClientRect().left);
      coloredBlock.style.width = coloredBlockWidth + 'px';
      top.textContent= roundNum(Math.round((finishPoint.getBoundingClientRect().left - slider.getBoundingClientRect().left)/ 266 * topText));
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

    let divisionRemainder = num % 100;
  
    if (divisionRemainder === 0) {
      return num;
    } else if (divisionRemainder > 50) {
      return num - divisionRemainder + 100
    } else {
      return num - divisionRemainder
    }
  }

}

