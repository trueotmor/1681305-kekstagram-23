import { createFetch } from './create-fetch.js';
import { getBigPicture } from './fullsize.js';
import { showAlert } from './util.js';


const sampleTemplate = document.querySelector('#picture').content;
const picturesContainer = document.querySelector('.pictures');
const url = 'https://23.javascript.pages.academy/kekstagram/data';
const method = 'GET';
let photos = [];
const createPhotos = createFetch(url ,method ,(response)=>{
  photos =response;
  const fragment = document.createDocumentFragment();
  for (let idx = 0; idx < photos.length; idx++) {
    const copyTemplate = sampleTemplate.cloneNode(true);
    copyTemplate.querySelector('.picture__img').setAttribute('src', photos[idx].url);
    copyTemplate.querySelector('.picture__likes').textContent = photos[idx].likes;
    copyTemplate.querySelector('.picture__comments').textContent = photos[idx].comments.length;
    fragment.appendChild(copyTemplate);
  }
  picturesContainer.appendChild(fragment);
  const pictures = picturesContainer.querySelectorAll('.picture');

  for (let idx = 0; idx < pictures.length; idx++) {
    const currentPhoto = photos[idx];
    pictures[idx].addEventListener('click', ()=> {
      getBigPicture(currentPhoto);
    });
  }
},showAlert);
createPhotos();
export {photos};
