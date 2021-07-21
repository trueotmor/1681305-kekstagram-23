import { isEscEvent } from './util.js';

const getBigPicture = (picture) => {
  const bigPicture = document.querySelector('.big-picture');
  const bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
  const socialComments = document.querySelector('.social__comments');
  const comments = picture.comments;
  const showMore = bigPicture.querySelector('.social__comments-loader');
  socialComments.innerHTML = '';


  const render = () => {
    showMore.classList.remove('visually-hidden');
    let renderComments = bigPicture.querySelectorAll('.social__comment').length;
    const newComment = comments.slice(renderComments, renderComments+5).map( (comment) => `<li class="social__comment">
    <img class="social__picture" src='${comment.avatar}' width="35" height="35">
    <p class="social__text"> '${comment.message}' </p>
    </li>`).join('');
    socialComments.insertAdjacentHTML('beforeend', newComment);
    renderComments = bigPicture.querySelectorAll('.social__comment').length;
    bigPicture.querySelector('.social__comment-count').innerHTML = `${renderComments} из <span class="comments-count">${picture.comments.length}</span> комментариев`;
    if (renderComments === picture.comments.length) {
      showMore.classList.add('visually-hidden');
    }
  };
  render();
  showMore.addEventListener('click', render);

  const onPopupEscKeyDown = (evt)=> {
    if (isEscEvent(evt)){
      evt.preventDefault();
      // eslint-disable-next-line no-use-before-define
      closeBigPicture();
    }
  };

  const closeBigPicture = () => {
    bigPicture.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
    document.removeEventListener('keydown', onPopupEscKeyDown, {once:true});
    showMore.removeEventListener('click', render);
  };

  bigPictureClose.addEventListener('click', ()=> {
    bigPicture.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
    closeBigPicture();
  }, {once:true});

  document.addEventListener('keydown', onPopupEscKeyDown, {once:true});

  bigPicture.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  bigPicture.querySelector('.big-picture__img img').setAttribute('src', picture.url);
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.social__caption').textContent = picture.description;
};

export {getBigPicture};
