import './dropdown.scss'

export default function dropdown() {

    let guestSum = 0;
    
    document.addEventListener('click', function(event) { 
        let parent = event.target.closest('.dropdown');
        let dropdownInput = event.target.closest('.dropdown__input');
        let dropdownBlock = parent.querySelector('.dropdown__block');
        let dropdownClearBtn = dropdownBlock.querySelector('.dropdown__clear-btn');
        let dropdownTitle = parent.querySelector('.dropdown__title');
        let adultCount = dropdownBlock.querySelector('.adultCounter'),
            childCount = dropdownBlock.querySelector('.childCounter'),
            babyCount = dropdownBlock.querySelector('.babyCounter');

        if (dropdownInput) {
            toggleDropdownBlock(event)
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
            guestCounter(event);
        }

        if (event.target.classList.contains('dropdown__plus')) {
            
            let n = event.target.previousElementSibling.textContent;

            n++;
            event.target.previousElementSibling.textContent= n;
            
            guestCounter(event);

            if (n > 0) {
               event.target.previousElementSibling.previousElementSibling.classList.remove('dropdown__gray-btn');
            }

        }

        if (event.target.classList.contains('dropdown__submit-btn')) {
            toggleDropdownBlock(event);
        }
        
        function toggleDropdownBlock(event) {
            dropdownBlock.hasAttribute('hidden') ? 
            dropdownBlock.removeAttribute('hidden') : dropdownBlock.setAttribute('hidden', '')
        }

        function guestCounter(event) {
    
            guestSum = +adultCount.textContent + +childCount.textContent + +babyCount.textContent;
            if (guestSum > 0) {
                
                dropdownTitle.textContent = changeWordEnding(guestSum);
                dropdownClearBtn.removeAttribute('hidden');
            }
    
            if (guestSum == 0) {
                dropdownTitle.textContent = 'Сколько гостей';
                dropdownClearBtn.setAttribute('hidden', '');
            }

            dropdownClearBtn.addEventListener('click', function(event) {
                adultCount.textContent = 0;
                childCount.textContent = 0;
                babyCount.textContent = 0;
                guestCounter(event);
                for (let btn of dropdownBlock.querySelectorAll('.dropdown__minus')) {
                    btn.classList.add('dropdown__gray-btn');
                }
            })
        }
    })

    function changeWordEnding(num) {
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

