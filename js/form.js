import { isEscEvent } from './util.js';

const pictureFormOpen = document.querySelector('.img-upload__label');
pictureFormOpen.addEventListener('click', ()=> {
  document.querySelector('body').classList.add('modal-open');
  document.querySelector('.img-upload__overlay').classList.remove('hidden');

  function closeForm(){
    document.querySelector('body').classList.remove('modal-open');
    document.querySelector('.img-upload__overlay').classList.add('hidden');
    // eslint-disable-next-line no-use-before-define
    document.removeEventListener('keydown', onFormEscKeyDown);
  }

  const pictureFormClose = document.querySelector('.img-upload__cancel');
  pictureFormClose.addEventListener('click', ()=> {
    closeForm();
  });

  const onFormEscKeyDown = (evt)=> {
    if (isEscEvent(evt)){
      evt.preventDefault();
      closeForm();
    }
  };

  document.addEventListener('keydown', onFormEscKeyDown);
});


