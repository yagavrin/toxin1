import './dropdown.scss'

export default function dropdown () {
    const dropdown = document.querySelector('.dropdown');
    const dropdownInput = document.querySelector('.dropdown__input');
    const dropdownBlock = document.querySelector('.dropdown__block');
    const dropdownClearBtn = document.querySelector('.dropdown__clear-btn');
    const dropdownSubmitBtn = document.querySelector('.dropdown__submit-btn');
    let adultCount, childCount, babyCount, guestCount;
    
    document.addEventListener('click', function(event) {

        if (event.target === dropdownInput) {
            toggleDropdownBlock()
        }
        
        if (event.target.classList.contains('dropdown__minus')) {
            let n = event.target.nextElementSibling.textContent;

            if (n > 0) {
                n--;
                event.target.nextElementSibling.textContent= n;
            }
            guestCounter();
        }

        if (event.target.classList.contains('dropdown__plus')) {

            let n = event.target.previousElementSibling.textContent;
            if (n >= 0) {
                n++;
                event.target.previousElementSibling.textContent= n;
            }
            guestCounter();
        }

        if (event.target === dropdownClearBtn) {
            document.querySelector('.adultCounter').textContent = 0;
            document.querySelector('.childCounter').textContent = 0;;
            document.querySelector('.babyCounter').textContent = 0;
            guestCounter();
        }

        if (event.target === dropdownSubmitBtn) {
            toggleDropdownBlock()
        }
        
    })

    function toggleDropdownBlock() {
        dropdownBlock.hasAttribute('hidden') ? dropdownBlock.removeAttribute('hidden') : dropdownBlock.setAttribute('hidden', '')
    }
    
    function guestCounter() {
        adultCount = document.querySelector('.adultCounter').textContent;
        childCount = document.querySelector('.childCounter').textContent;
        babyCount = document.querySelector('.babyCounter').textContent;
        guestCount = 0;
        guestCount = +adultCount + +childCount + +babyCount;
        if (guestCount > 0) {
            dropdownInput.textContent= wordEnding(guestCount);
            dropdownClearBtn.removeAttribute('hidden');
        }

        if (guestCount == 0) {
            dropdownInput.textContent= 'Сколько гостей';
            dropdownClearBtn.setAttribute('hidden', '');
        }
    }

    function wordEnding (num) {
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

