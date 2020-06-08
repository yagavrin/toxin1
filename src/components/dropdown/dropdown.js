import './dropdown.scss'

export default function dropdown() {

  let facilitiesDeclension = [
    {
      numDefault: 'спален',
      num1: 'спальня',
      num2to4: 'спальни',
    },
    {
      numDefault: 'кроватей',
      num1: 'кровать',
      num2to4: 'кровати',
    },
    {
      numDefault: 'ванных комнат',
      num1: 'ванная комната',
      num2to4: 'ванных комнаты',
    },
  ]

  let guestDeclension = {
    numDefault: 'гостей',
    num1: 'гость',
    num2to4: 'гостя',
  };

  let guestSum = 0;
  
  document.addEventListener('click', function(event) { 
    let parent = event.target.closest('.dropdown');
    
    if (!parent) {
      return
    }

    let dropdownInput = parent.querySelector('.dropdown__input');
    let dropdownBlock = parent.querySelector('.dropdown__block');
    let dropdownClearBtn = parent.querySelector('.dropdown__clear-btn');
    let dropdownSubtitle = parent.querySelector('.dropdown__subtitle');
    let counters = dropdownBlock.querySelectorAll('.dropdown__counter');

    if (event.target.closest('.dropdown__input')) {
      toggleDropdownBlock()
    }
    
    if (event.target.classList.contains('dropdown__minus')) {
        
      let n = event.target.nextElementSibling.textContent;

      if (n > 0) {
        n--;
        event.target.nextElementSibling.textContent= n;
      } 

      if (n == 0) {
        event.target.classList.add('dropdown__gray-btn');
      }
      changeInputText(event);
    }

    if (event.target.classList.contains('dropdown__plus')) {
        
      let n = event.target.previousElementSibling.textContent;

      n++;
      event.target.previousElementSibling.textContent= n;
      
      changeInputText(event);

      if (n > 0) {
        event.target.previousElementSibling.previousElementSibling.classList.remove('dropdown__gray-btn');
      }

    }

    if (dropdownInput && event.target.classList.contains('dropdown__submit-btn')) {
      toggleDropdownBlock();
    }
    
    function toggleDropdownBlock() {
      if (dropdownBlock.hasAttribute('hidden')) {
        dropdownBlock.removeAttribute('hidden');
        dropdownInput.style.borderColor= 'rgba(31, 32, 65, 0.5)';
      } else {
        dropdownBlock.setAttribute('hidden', '');
        dropdownInput.style.borderColor= 'rgba(31, 32, 65, 0.25)';
      } 
    }

    function changeInputText(event) {
      return parent.classList.contains('dropdown_room') ? facilitiesCounter() : guestCounter(event)
    }

    function facilitiesCounter(event) {
      let facilitiesSum = 0;
      for (let counter of counters) {
        facilitiesSum += +counter.textContent;
      }

      if (facilitiesSum > 0) {
        let arr = [];
        for (let i = 0; i < counters.length; i++) {
          if (counters[i].textContent == 0) continue;
          arr.push(changeWordEnding(counters[i].textContent, facilitiesDeclension[i]))
        }
        switch (arr.length) {
          case 1:
            dropdownSubtitle.textContent = arr.join();
            break;
          case 2:
            dropdownSubtitle.textContent = arr.join(', ');
            break;
          case 3:
            dropdownSubtitle.textContent = `${arr[0]}, ${arr[1]}...`
            break;
        }

      }
    
      if (facilitiesSum == 0) {
        dropdownSubtitle.textContent = 'Выберите удобства';
      }

    }

    function guestCounter(event) {
      guestSum = 0;
      for (let counter of counters) {
        guestSum += +counter.textContent;
      }

      if (guestSum > 0) {
        dropdownSubtitle.textContent = changeWordEnding(guestSum, guestDeclension);
        dropdownClearBtn.removeAttribute('hidden');
      }

      if (guestSum == 0) {
        dropdownSubtitle.textContent = 'Сколько гостей';
        dropdownClearBtn.setAttribute('hidden', '');
      }

      dropdownClearBtn.addEventListener('click', function(event) {
        for (let counter of counters) {
          counter.textContent = 0;
        }
        guestCounter(event);
        for (let btn of dropdownBlock.querySelectorAll('.dropdown__minus')) {
            btn.classList.add('dropdown__gray-btn');
        }
      })
    }
})

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

}

