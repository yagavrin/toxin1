import './input.scss'

export default function input() {
  // function loadScript(src) {
  //   let mainScript = document.querySelector('script');
  //   let script = document.createElement('script');
  //   script.src = src;
  //   script.async = false;
  //   mainScript.before(script);
  // }
  // loadScript('/src/components/calendar/jquery.maskedinput.js');
  // loadScript('/src/components/calendar/datepicker.js');
  // loadScript("https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js");
  document.addEventListener('DOMContentLoaded', function() {

    
    $(function() {
      $("[name='date']").mask("99.99.9999 - 99.99.9999", {placeholder: "ДД.ММ.ГГГГ - ДД.ММ.ГГГГ" });
      
    
      // var myDatepicker = $('.first_date').datepicker().data('datepicker');
      $('.input__datepicker').datepicker({
      
        range: true,
        
        onSelect: function (fd, d, picker) { 
          $(".first_date").val(fd.split(" - ")[0]);
          $(".second_date").val(fd.split(" - ")[1]);
        },
      });
      let firstDate = document.querySelector('.first_date')
      let secondDate = document.querySelector('.second_date')
      let date = document.querySelector('#date')
      date.addEventListener('keyup', function() {
        console.log('fdf');
      })
      if (date.value.length == 10) {
        
        firstDate.value = date.value;
      }

      document.addEventListener('click', function(event) {
        let input = event.target.closest('.input__block');
        if (input) {
          input.nextElementSibling.classList.add('input__datepicker_active')
        }
        
        if (event.target.closest('[data-action="hide"]')) {
          event.target.closest('.input__datepicker').classList.remove('input__datepicker_active')

        }
      })
      firstDate.addEventListener('keyup', function() {
        let arr = [];
          if (firstDate.value.length == 10) {
            let [day, month, year] = firstDate.value.split(".");

            const newDate = new Date (+year, +month-1, +day);
            if (newDate && newDate >= new Date()) {
              arr.push(newDate);
              
            }
          }
          if (secondDate.value.length == 10) {
            let [day, month, year] = secondDate.value.split(".");
  
            const lastDate = new Date (+year, +month-1, +day);
            if (lastDate && lastDate > new Date()) {
              
              
              arr.push(lastDate)
              
            }
          }
          if (arr.length == 2){$('.input__datepicker').data('datepicker').selectDate(arr);}
        })
      secondDate.addEventListener('keyup', function() {
        let arr = [];
        
        if (firstDate.value.length == 10) {
          let [day, month, year] = firstDate.value.split(".");

          const newDate = new Date (+year, +month-1, +day);
          if (newDate && newDate >= new Date()) {
            console.log(arr);
            arr.push(newDate);
          }
        }
        if (secondDate.value.length == 10) {
          let [day, month, year] = secondDate.value.split(".");

          const lastDate = new Date (+year, +month-1, +day);
          if (lastDate && lastDate > new Date()) {
            
            
            arr.push(lastDate)
            
          }
        }
        if (arr.length == 2){$('.input__datepicker').data('datepicker').selectDate(arr);}
        
      })
         
    })
  })
}