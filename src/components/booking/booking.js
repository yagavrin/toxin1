import './booking.scss';

export default function booking () {
  
  let daysDeclension = {
    numDefault: 'суток',
    num1: 'сутки',
    num2to4: 'суток',
  }

  document.addEventListener('keyup', function(event) {
    countTotalSum(event);
  })
 
  document.addEventListener('click', function(event) {
    countTotalSum(event);

    let dropdown = event.target.closest('.booking')
    
    if (dropdown) {
      
      let guestCountCell = dropdown.querySelector('.dropdown__subtitle');
      let guestCount = parseInt(guestCountCell.textContent);
      isNaN(guestCount) ? countTotalSum(event, 1) : countTotalSum(event, guestCount)
    }
  })
  
  function countTotalSum(event, guestCount = 1) {
    let newDate, lastDate;
    let parent = event.target.closest('.booking');
    if (parent) {
      let firstDate = parent.querySelector('.first_date'),
          secondDate = parent.querySelector('.second_date'),
          daysCell = document.querySelector('.booking__days-count'),
          priceCell = document.querySelector('.booking__price'),
          serviceChargeSale = document.querySelector('.booking__service-charge-sale'),
          serviceCharge = document.querySelector('.booking__service-charge-price'),
          additionalServices = document.querySelector('.booking__add-services-price'),
          totalSum = document.querySelector('.booking__total-sum'),
          totalPriceCell = document.querySelector('.booking__total-price');

    
      if (firstDate.value.length == 10) {
        let [day, month, year] = firstDate.value.split(".");

        newDate = new Date (+year, +month-1, +day);
      }
      if (secondDate.value.length == 10) {
        let [day, month, year] = secondDate.value.split(".");

        lastDate = new Date (+year, +month-1, +day);

      }
      let roomPrice = extractNum(priceCell);
      if (newDate && lastDate) {
        let daysCount = Math.abs(lastDate - newDate)/1000/60/60/24;
        daysCell.textContent = changeWordEnding(daysCount, daysDeclension);
        let totalPrice = roomPrice * daysCount * guestCount;
        totalPriceCell.textContent = (totalPrice).toLocaleString('ru') + '₽';
        totalSum.textContent = (totalPrice - 
        extractNum(serviceChargeSale) +
        extractNum(serviceCharge) + 
        extractNum(additionalServices)).toLocaleString('ru') + '₽';
      } else {
        let totalPrice = roomPrice * guestCount;
        totalPriceCell.textContent = (totalPrice).toLocaleString('ru') + '₽';
        totalSum.textContent = (totalPrice - 
        extractNum(serviceChargeSale) +
        extractNum(serviceCharge) + 
        extractNum(additionalServices)).toLocaleString('ru') + '₽';
      }
    }
  }

  function changeWordEnding(num, wordObj) {
    let word;
    if (num % 100 > 10 && num % 100 < 20) {
      word= wordObj.numDefault;
      } else {
        switch (num % 10) {
          case 1:
          word = wordObj.num1;
          break;

          case 2:
          case 3:
          case 4:
          word = wordObj.num2to4;
          break;

          default: word = wordObj.numDefault;
      }
    }
    return num + ' ' + word;
  }

  function extractNum(elem) {
    return parseInt(elem.textContent.split(' ').join(''));
  }

}