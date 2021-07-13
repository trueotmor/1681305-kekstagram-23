import { isEscEvent } from './util.js';

const  imageSelect = document.querySelector('#upload-file');
const form = document.querySelector('.img-upload__form');
const hashTagInput = form.querySelector('.text__hashtags');
const hashTagComment = form.querySelector('.text__description');
imageSelect.addEventListener('change', () =>{
  document.querySelector('body').classList.add('modal-open');
  document.querySelector('.img-upload__overlay').classList.remove('hidden');
  function closeForm(){
    document.querySelector('body').classList.remove('modal-open');
    document.querySelector('.img-upload__overlay').classList.add('hidden');
    // eslint-disable-next-line no-use-before-define
    document.removeEventListener('keydown', onFormEscKeyDown);
    form.reset();
  }

  const pictureFormClose = document.querySelector('.img-upload__cancel');
  pictureFormClose.addEventListener('click', ()=> {
    closeForm();
  });

  const onFormEscKeyDown = (evt)=> {
    if (isEscEvent(evt) && document.activeElement !== hashTagInput && document.activeElement !== hashTagComment){
      evt.preventDefault();
      closeForm();
    }
  };

  document.addEventListener('keydown', onFormEscKeyDown);
});

const hashTagRegularExpr = {
  minLength: 2,
  maxLength: 20,
  amount: 5,
  re: /^#[\p{L}\d]{1,19}$/u,
};

const checkActions = [
  {
    message: false,
    check: (arg) => arg.length === 0,
  },
  {
    message: `нельзя указать больше ${hashTagRegularExpr.amount} хэш-тегов`,
    check: (arg) => arg.length > hashTagRegularExpr.amount,
  },
  {
    message: 'строка после # должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.;',
    check: (arg) => arg.some((value) => !hashTagRegularExpr.re.test(value)),
  },
  {
    message: 'Хэш-тег начинается с символа # (решётка)',
    check: (arg) => arg.some((value) => value[0] !== '#'),
  },
  {
    message: `Хэш-тэг должен состоять минимум из ${hashTagRegularExpr.minLength} символов`,
    check: (arg) => arg.some((value) => value.length < hashTagRegularExpr.minLength),
  },
  {
    message: `Хэш-тэг не должен превышать ${hashTagRegularExpr.maxLength} символов`,
    check: (arg) => arg.some((value) => value.length > hashTagRegularExpr.maxLength),
  },
  {
    message: 'Один и тот же хэш-тег не может быть использован дважды',
    check: (arg) => arg.some((value, index, arr) => arr.indexOf(value) !== index),
  },
  {
    message: false,
    check: (arg) => arg,
  },
];

const getHashTagsArray = (string) => {
  const array = string
    .replace(/\s{2,}/g, ' ')
    .trim()
    .split(' ')
    .map((value) => value.toLowerCase());
  return array;
};

hashTagInput.addEventListener('input', (evt) =>{
  const currentHashTagText = getHashTagsArray(evt.target.value);
  evt.target.setCustomValidity('');
  for (let idx = 0; idx < checkActions.length; idx++) {
    if (checkActions[idx].check(currentHashTagText) === true){
      evt.target.setCustomValidity(checkActions[idx].message);
      break;
    }
  }
});

