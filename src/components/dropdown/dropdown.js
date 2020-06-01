import './dropdown.scss'

export default function dropdown() {
    const dropdownInput = document.querySelector('.dropdown__input');
    const dropdownBlock = document.querySelector('.dropdown__block');
    const dropdownClearBtn = document.querySelector('.dropdown__clear-btn');
    const dropdownSubmitBtn = document.querySelector('.dropdown__submit-btn');
    const dropdownTitle = document.querySelector('.dropdown__title');
    let adultCount = document.querySelector('.adultCounter'),
        childCount = document.querySelector('.childCounter'),
        babyCount = document.querySelector('.babyCounter'),
        guestSum = 0;
    
    document.addEventListener('click', function(event) {
        if (event.target === dropdownInput || 
            event.target === document.querySelector('.dropdown__expand-more')) {
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
            guestCounter();
        }

        if (event.target.classList.contains('dropdown__plus')) {

            let n = event.target.previousElementSibling.textContent;

            n++;
            event.target.previousElementSibling.textContent= n;
            
            guestCounter();

            if (n > 0) {
               event.target.previousElementSibling.previousElementSibling.classList.remove('dropdown__gray-btn');
            }

        }

        if (event.target === dropdownClearBtn) {
            adultCount.textContent = 0;
            childCount.textContent = 0;
            babyCount.textContent = 0;
            guestCounter();
            for (let btn of document.querySelectorAll('.dropdown__minus')) {
                btn.classList.add('dropdown__gray-btn');
            }
        }

        if (event.target === dropdownSubmitBtn) {
            toggleDropdownBlock()
        }
        
    })

    

    function toggleDropdownBlock() {
        dropdownBlock.hasAttribute('hidden') ? dropdownBlock.removeAttribute('hidden') : dropdownBlock.setAttribute('hidden', '')
    }

    
    function guestCounter() {
        guestSum = +adultCount.textContent + +childCount.textContent + +babyCount.textContent;
        if (guestSum > 0) {
            dropdownTitle.textContent= wordEnding(guestSum);
            dropdownClearBtn.removeAttribute('hidden');
        }

        if (guestSum == 0) {
            dropdownTitle.textContent= 'Сколько гостей';
            dropdownClearBtn.setAttribute('hidden', '');
        }
    }

    function wordEnding(num) {
        let word;
        if (num % 100 > 10 && num % 100 < 20) {
            word= 'гостей';
        } else {
            switch (num % 10) {
                case 1:
                word = 'гость';
                break;
    
                case 2:
                case 3:
                case 4:
                word = 'гостя';
                break;
    
                default: word = 'гостей';
            }
        }
    
        return num + ' ' + word;
    }
}

