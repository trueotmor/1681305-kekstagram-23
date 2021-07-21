import { isEscEvent} from './util.js';
import { createFetch } from './create-fetch.js';

const DEFAULT_SCALE_NUMBER = 100;

const FILTER_CHROME_RANGE_MIN = 0;
const FILTER_CHROME_RANGE_MAX = 1;
const FILTER_CHROME_START = 1;
const FILTER_CHROME_STEP = .1;

const FILTER_SEPIA_RANGE_MIN = 0;
const FILTER_SEPIA_RANGE_MAX = 1;
const FILTER_SEPIA_START = 1;
const FILTER_SEPIA_STEP = .1;

const FILTER_MARVIN_RANGE_MIN = 0;
const FILTER_MARVIN_RANGE_MAX = 100;
const FILTER_MARVIN_START = 100;
const FILTER_MARVIN_STEP = 1;

const FILTER_PHOBOS_RANGE_MIN = 0;
const FILTER_PHOBOS_RANGE_MAX = 3;
const FILTER_PHOBOS_START = 3;
const FILTER_PHOBOS_STEP = .1;

const FILTER_HEAT_RANGE_MIN = 1;
const FILTER_HEAT_RANGE_MAX = 3;
const FILTER_HEAT_START = 3;
const FILTER_HEAT_STEP = .1;

const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;
const SCALE_STEP =25;

const NOTATION =10;
const FACTOR = .01;

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

const errorMessage = document.querySelector('#error').content;
const successMessage = document.querySelector('#success').content;

const hashTagRegularExpr = {
  minLength: 2,
  maxLength: 20,
  amount: 5,
  re: /^#[\p{L}\d]{1,19}$/u,
};

const showMessagePopup = (messageTemplate) => {
  const element = document.createElement('div');
  element.append(messageTemplate.cloneNode(true));
  document.querySelector('body').append(element);
  const messageWindow = element.firstElementChild;
  const close = element.querySelector('button');

  const popupCloseHandler = (evt)=> {
    const messageWindowInner = messageWindow.firstElementChild;
    if(!messageWindowInner.contains(evt.target)){
      messageWindow.remove();
      // eslint-disable-next-line no-use-before-define
      closePopup();
    }
  };

  const popupCloseByEscHandler = (evt)=>{
    if (isEscEvent(evt)){
      messageWindow.remove();
      // eslint-disable-next-line no-use-before-define
      closePopup();
    }
  };

  close.addEventListener('click', ()=> {
    messageWindow.remove();
    // eslint-disable-next-line no-use-before-define
    closePopup();
  });
  document.addEventListener('keydown', popupCloseByEscHandler);
  document.addEventListener('click', popupCloseHandler);

  const closePopup = () => {
    document.removeEventListener('click', popupCloseHandler);
    document.removeEventListener('keydown', popupCloseByEscHandler);
  };
};

// Транформация изображения
const pictureTransform =  () => {
  picture.style.transform = `scale(${parseInt(scaleValue.value, NOTATION)*FACTOR})`;
};

const setScaleValue = (scaleNumber) => {
  if(scaleNumber < MIN_SCALE_VALUE ){scaleNumber = MIN_SCALE_VALUE;}
  if(scaleNumber > MAX_SCALE_VALUE ){scaleNumber = MAX_SCALE_VALUE;}
  scaleValue.value = `${scaleNumber}%`;
  scaleSmaller.style.pointerEvents = 'auto';
  scaleBigger.style.pointerEvents = 'auto';
  if(scaleNumber === MIN_SCALE_VALUE){
    scaleSmaller.style.pointerEvents = 'none';
  }
  if(scaleNumber === MAX_SCALE_VALUE){
    scaleBigger.style.pointerEvents = 'none';
  }
};

scaleSmaller.addEventListener('click', ()=> {
  setScaleValue(parseInt(scaleValue.value, NOTATION) - SCALE_STEP);
  pictureTransform();
});

scaleBigger.addEventListener('click', ()=> {
  setScaleValue(parseInt(scaleValue.value, NOTATION) + SCALE_STEP);
  pictureTransform();
});


// Применение эффектов
const setEffect = (value) => {

  sliderBar.style.display = 'block';
  const re = /effects__preview--[\w-]+/g;
  const resetPictureClassName = picture.className.replace(re, '');
  picture.className = resetPictureClassName;
  picture.classList.add(`effects__preview--${value}`);

  if(sliderElement.noUiSlider !== undefined){
    sliderElement.noUiSlider.destroy();
  }

  let sliderElementsOptions = null;
  let sliderUpdateOptions = null;

  switch (value) {
    case 'chrome':
      sliderElementsOptions = {
        range: {
          min:FILTER_CHROME_RANGE_MIN,
          max:FILTER_CHROME_RANGE_MAX,
        },
        start:FILTER_CHROME_START,
        step: FILTER_CHROME_STEP,
        connect: 'lower',
      };
      sliderUpdateOptions = (__, handle, unencoded) => {
        valueElement.value = unencoded[handle];
        picture.style.filter = `grayscale(${valueElement.value})`;
      };
      break;
    case 'sepia':
      sliderElementsOptions = {
        range: {
          min:FILTER_SEPIA_RANGE_MIN,
          max:FILTER_SEPIA_RANGE_MAX,
        },
        start:FILTER_SEPIA_START,
        step: FILTER_SEPIA_STEP,
        connect: 'lower',
      };
      sliderUpdateOptions = (__, handle, unencoded) => {
        valueElement.value = unencoded[handle];
        picture.style.filter = `sepia(${valueElement.value})`;
      };
      break;
    case 'marvin':
      sliderElementsOptions = {
        range: {
          min:FILTER_MARVIN_RANGE_MIN,
          max:FILTER_MARVIN_RANGE_MAX,
        },
        start:FILTER_MARVIN_START,
        step: FILTER_MARVIN_STEP,
        connect: 'lower',
      };
      sliderUpdateOptions = (__, handle, unencoded) => {
        valueElement.value = unencoded[handle];
        picture.style.filter = `invert(${valueElement.value}%)`;
      };
      break;
    case 'phobos':
      sliderElementsOptions = {
        range: {
          min:FILTER_PHOBOS_RANGE_MIN,
          max:FILTER_PHOBOS_RANGE_MAX,
        },
        start:FILTER_PHOBOS_START,
        step: FILTER_PHOBOS_STEP,
        connect: 'lower',
      };
      sliderUpdateOptions = (__, handle, unencoded) => {
        valueElement.value = unencoded[handle];
        picture.style.filter = `blur(${valueElement.value}px)`;
      };
      break;
    case 'heat':
      sliderElementsOptions = {
        range: {
          min:FILTER_HEAT_RANGE_MIN,
          max:FILTER_HEAT_RANGE_MAX,
        },
        start:FILTER_HEAT_START,
        step: FILTER_HEAT_STEP,
        connect: 'lower',
      };
      sliderUpdateOptions = (__, handle, unencoded) => {
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
  effectSelectors[idx].addEventListener('change', (evt)=>{
    setEffect(evt.target.value);
  });
}

const closeForm = () => {
  document.querySelector('body').classList.remove('modal-open');
  document.querySelector('.img-upload__overlay').classList.add('hidden');
  // eslint-disable-next-line no-use-before-define
  document.removeEventListener('keydown', onFormEscKeyDown);
  form.reset();
  setEffect('none');
  setScaleValue(DEFAULT_SCALE_NUMBER);
  pictureTransform();
};

const onFormEscKeyDown = (evt)=> {
  if (isEscEvent(evt) && document.activeElement !== hashTagInput && document.activeElement !== hashTagComment){
    evt.preventDefault();
    closeForm();
  }
};

imageSelect.addEventListener('change', () =>{
  document.querySelector('body').classList.add('modal-open');
  document.querySelector('.img-upload__overlay').classList.remove('hidden');
  defaultEffectSelector.checked = true;
  setScaleValue(DEFAULT_SCALE_NUMBER);
  pictureTransform();

  const pictureFormClose = document.querySelector('.img-upload__cancel');
  pictureFormClose.addEventListener('click', ()=> {
    closeForm();
  });
  document.addEventListener('keydown', onFormEscKeyDown);
});

const sendForm = createFetch(form.action, form.method, ()=>{
  closeForm();
  showMessagePopup(successMessage);
},()=>{
  closeForm();
  showMessagePopup(errorMessage);
});

form.addEventListener('submit', (evt) =>{
  evt.preventDefault();
  const formData = new FormData(evt.target);
  sendForm(formData);
});

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
