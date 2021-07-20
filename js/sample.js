import { createFetch } from './create-fetch.js';
import { getBigPicture } from './fullsize.js';
import { showAlert } from './util.js';
import { getRndArr } from './util.js';
import { throttle } from './utils/throttle.js';

const filters = document.querySelector('.img-filters');
const filterDefault = filters.querySelector('#filter-default');
const filterRandom = filters.querySelector('#filter-random');
const filterDiscussed = filters.querySelector('#filter-discussed');


const filtersForm = document.querySelector('.img-filters__form');
const activeFilter = 'img-filters__button--active';
const allFilters = filtersForm.querySelectorAll('button');


const sampleTemplate = document.querySelector('#picture').content;
const picturesContainer = document.querySelector('.pictures');
let photos = [];

// eslint-disable-next-line no-shadow
const renderPictures = function(photos){
  const fragment = document.createDocumentFragment();
  let pictures = picturesContainer.querySelectorAll('.picture');
  pictures.forEach((item)=> {
    item.remove();
  });

  for (let idx = 0; idx < photos.length; idx++) {
    const copyTemplate = sampleTemplate.cloneNode(true);
    copyTemplate.querySelector('.picture__img').setAttribute('src', photos[idx].url);
    copyTemplate.querySelector('.picture__likes').textContent = photos[idx].likes;
    copyTemplate.querySelector('.picture__comments').textContent = photos[idx].comments.length;
    fragment.appendChild(copyTemplate);
  }
  picturesContainer.appendChild(fragment);
  pictures = picturesContainer.querySelectorAll('.picture');

  for (let idx = 0; idx < pictures.length; idx++) {
    const currentPhoto = photos[idx];
    pictures[idx].addEventListener('click', ()=> {
      getBigPicture(currentPhoto);
    });
  }
};

const url = 'https://23.javascript.pages.academy/kekstagram/data';
const method = 'GET';
const createPhotos = createFetch(url ,method ,(response)=>{
  photos =response;
  renderPictures(photos);
  filters.classList.remove('img-filters--inactive');
},showAlert);
createPhotos();


for(let idx=0; idx < allFilters.length; idx++){
  allFilters[idx].addEventListener('click', (evt)=>{
    filtersForm.querySelector(`.${activeFilter}`).classList.remove(activeFilter);
    evt.target.classList.add(activeFilter);
  });
}

const renderPicturesThrottle = throttle(renderPictures, 500);

filterDefault.addEventListener('click', ()=>{
  renderPicturesThrottle(photos);

});
filterRandom.addEventListener('click', ()=>{
  renderPicturesThrottle(getRndArr(photos, 10, 10));

});
filterDiscussed.addEventListener('click',()=>{
  const clonePhotos = [...photos];
  clonePhotos.sort((el1 ,el2)=>el1.comments.length - el2.comments.length);
  renderPicturesThrottle(clonePhotos);
});
