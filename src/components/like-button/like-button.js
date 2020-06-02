import './like-button.scss'

export default function likeButton () {
  let likeButtons = document.querySelectorAll('.like-button');

  for (let btn of likeButtons) {

    btn.addEventListener('click', function() {

      let likeCount = btn.lastElementChild.textContent;

      if (!btn.classList.contains('like-button_selected')) {
        btn.classList.add('like-button_selected');
        likeCount = +likeCount +1;
        btn.lastElementChild.textContent = likeCount;
      } else {
        btn.classList.remove('like-button_selected');
        likeCount = +likeCount -1;
        btn.lastElementChild.textContent = likeCount;
      }
  
      
    })

  }

}