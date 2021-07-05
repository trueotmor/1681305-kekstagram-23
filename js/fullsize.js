import { photos } from './sample.js';


const bigPicture = document.querySelector('.big-picture');
bigPicture.classList.remove('hidden');


for (let idx = 0; idx < photos.length; idx++) {
  bigPicture.querySelector('.big-picture__img img').setAttribute('src', photos[idx].url);
  bigPicture.querySelector('.likes-count').textContent = photos[idx].likes;
  bigPicture.querySelector('.comments-count').textContent = photos[idx].comments.length;
}


