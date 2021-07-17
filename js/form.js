import { isEscEvent } from './util.js';

const imageSelect = document.querySelector('#upload-file');
const form = document.querySelector('.img-upload__form');
const hashTagInput = form.querySelector('.text__hashtags');
const hashTagComment = form.querySelector('.text__description');
const picture =form.querySelector('.img-upload__preview');

const scaleSmaller = form.querySelector('.scale__control--smaller');
const scaleBigger = form.querySelector('.scale__control--bigger');
const scaleValue = form.querySelector('.scale__control--value');

const effectSelectors = document.querySelectorAll('.effects__item input');
const defaultEffectSelector = document.querySelector('.effects__item input[value="none"]');

const sliderBar = form.querySelector('.img-upload__effect-level');

const sliderElement = document.querySelector('.effect-level__slider');
const valueElement = document.querySelector('.effect-level__value');


// Транформация изображения
const scale = () => {
  const defaultScaleNumber = 100;
  const pictureTransform = function (){
    picture.style.transform = `scale(${parseInt(scaleValue.value, 10)*.01})`;
  };
  const setScaleValue = function(scaleNumber){
    if(scaleNumber < 25 ){scaleNumber = 25;}
    if(scaleNumber > 100 ){scaleNumber = 100;}
    scaleValue.value = `${scaleNumber}%`;
    scaleSmaller.style.pointerEvents = 'auto';
    scaleBigger.style.pointerEvents = 'auto';
    if(scaleNumber === 25){
      scaleSmaller.style.pointerEvents = 'none';
    }
    if(scaleNumber === 100){
      scaleBigger.style.pointerEvents = 'none';
    }
  };
  setScaleValue(defaultScaleNumber);
  picture.style.transform = 'scale(1)';
  scaleSmaller.addEventListener('click', ()=> {
    setScaleValue(parseInt(scaleValue.value, 10) - 25);
    pictureTransform();
  });
  scaleBigger.addEventListener('click', ()=> {
    setScaleValue(parseInt(scaleValue.value, 10) + 25);
    pictureTransform();
  });
};
// Применение эффектов
const setEffect = function(evt ){

  sliderBar.style.display = 'block';
  const re = /effects__preview--[\w-]+/g;
  const resetPictureClassName = picture.className.replace(re, '');
  picture.className = resetPictureClassName;
  picture.classList.add(`effects__preview--${evt.target.value}`);

  if(sliderElement.noUiSlider !== undefined){
    sliderElement.noUiSlider.destroy();
  }


  let sliderElementsOptions = null;
  let sliderUpdateOptions = null;

  switch (evt.target.value) {
    case 'chrome':
      sliderElementsOptions = {
        range: {
          min:0,
          max:1,
        },
        start:1,
        step: .1,
        connect: 'lower',
      };
      sliderUpdateOptions = function(_, handle, unencoded){
        valueElement.value = unencoded[handle];
        picture.style.filter = `grayscale(${valueElement.value})`;
      };
      break;
    case 'sepia':
      sliderElementsOptions = {
        range: {
          min:0,
          max:1,
        },
        start:1,
        step: .1,
        connect: 'lower',
      };
      sliderUpdateOptions = function(_, handle, unencoded){
        valueElement.value = unencoded[handle];
        picture.style.filter = `sepia(${valueElement.value})`;
      };
      break;
    case 'marvin':
      sliderElementsOptions = {
        range: {
          min:0,
          max:100,
        },
        start:100,
        step: 1,
        connect: 'lower',
      };
      sliderUpdateOptions = function(_, handle, unencoded){
        valueElement.value = unencoded[handle];
        picture.style.filter = `invert(${valueElement.value}%)`;
      };
      break;
    case 'phobos':
      sliderElementsOptions = {
        range: {
          min:0,
          max:3,
        },
        start:3,
        step: .1,
        connect: 'lower',
      };
      sliderUpdateOptions = function(_, handle, unencoded){
        valueElement.value = unencoded[handle];
        picture.style.filter = `blur(${valueElement.value}px)`;
      };
      break;
    case 'heat':
      sliderElementsOptions = {
        range: {
          min:1,
          max:3,
        },
        start:3,
        step: .1,
        connect: 'lower',
      };
      sliderUpdateOptions = function(_, handle, unencoded){
        valueElement.value = unencoded[handle];
        picture.style.filter = `brightness(${valueElement.value})`;
      };
      break;
    default:
      sliderBar.style.display = 'none';
      picture.style.filter = 'none';
  }

  if(sliderElementsOptions !== null){

    noUiSlider.create(sliderElement, sliderElementsOptions);
    sliderElement.noUiSlider.on('update', sliderUpdateOptions);
  }
};

sliderBar.style.display = 'none';
for(let idx = 0; idx < effectSelectors.length; idx++ ){
  effectSelectors[idx].addEventListener('change', setEffect);
}

imageSelect.addEventListener('change', () =>{
  document.querySelector('body').classList.add('modal-open');
  document.querySelector('.img-upload__overlay').classList.remove('hidden');
  scale();
  defaultEffectSelector.checked = true;
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
