import './input.scss'

export default function input() {
  
  document.addEventListener('DOMContentLoaded', function() {

    
    $(function() {

      let filterDate;
      $("[name='date']").mask("99.99.9999", {placeholder: "ДД.ММ.ГГГГ" });
      $("[name='filter-date']").mask("99.99.9999 - 99.99.9999", {placeholder: "ДД.ММ.ГГГГ - ДД.ММ.ГГГГ", 
      completed: function() {
          filterDate = this.val();
        }  
      });
      
      $('.input__datepicker').datepicker({
        range: false,
        onSelect: function (fd, d, picker) { 
          $('.select_date').val(fd)
        }
      })
      
      $('.input__datepicker_range').datepicker({
        range: true,
        onSelect: function (fd, d, picker) { 
          $(".first_date").val(fd.split(" - ")[0]);
          $(".second_date").val(fd.split(" - ")[1]);
        },
      });

      $('.input__datepicker_filter').datepicker({
        range: true,
        dateFormat: 'dd M',
        onSelect: function (fd, d, picker) { 
          $('.input_filter').val(fd)
        },
      });

      document.addEventListener('click', function(event) {

        let input = event.target.closest('.input__block');
        if (input) {
          input.nextElementSibling.classList.add('input__datepicker_active')
        }
    
        if (event.target.closest('[data-action="hide"]')) {
          event.target.closest('.input__datepicker').classList.remove('input__datepicker_active')

        }
      })

      document.addEventListener('keyup', function(event) {
        selectOneDate(event);
        selectTwoDates(event);
      })

      document.addEventListener('input', function(event) {
        selectOneDate(event);
        selectTwoDates(event);
      })
      
      function selectOneDate(event) {
        let parent = event.target.closest('.input__block_single');
        if (parent) {
          let input = parent.querySelector('.select_date');
          let arr = [];
          arr.push( createNewDate(input.value) );
          
          if (arr.length == 1) {
            $(parent.nextElementSibling).data('datepicker').selectDate(arr);
          }
        }
        let filterDateParent = event.target.closest('.input__block_filter');
        if (filterDateParent) {
          let arr = [];
          
          if (filterDate && filterDate.length == 23) {
            let firstVal = filterDate.split(" - ")[0],
              secondVal = filterDate.split(" - ")[1];
            if (firstVal.length == 10 && secondVal.length == 10) {
              arr.push( createNewDate(firstVal) );
              arr.push( createNewDate(secondVal) );
              if (arr.length == 2) {
                $(filterDateParent.nextElementSibling).data('datepicker').selectDate(arr);
              }
            }
          }
          
          
        }
      }

        
      function selectTwoDates (event) {
        let parent = event.target.closest('.input__block_range')
        if (parent) {
          let firstDate = parent.querySelector('.first_date'),
              secondDate = parent.querySelector('.second_date'),
              datepicker = parent.nextElementSibling;
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
          if (arr.length == 2){
            $(datepicker).data('datepicker').selectDate(arr);
          }
        }
      }
    

    })

    function createNewDate (value) {
      let [day, month, year] = value.split(".");
      const newDate = new Date (+year, +month-1, +day);

      if (newDate && newDate >= new Date()) {
        return newDate;
      }
    }
  })
  
}