import './form-elements.scss'

export default function formElements () {
  let inputs = document.getElementsByClassName('input');

  for (let input of inputs) {

    input.addEventListener('focus', function () {
      let defaultValue = input.value;

      if (input.value == defaultValue) {
        input.value = '';
      }

      input.addEventListener('blur', function () {
        if (input.value == '') {
            input.value = defaultValue;
        }
      })

    })
      
  }

}

