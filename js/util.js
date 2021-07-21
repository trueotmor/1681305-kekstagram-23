const SHOW_TIME = 5000;

const getRandomInteger = (min, max) => {
  if  (!Number.isInteger(min) || !Number.isInteger(max)) {
    throw new TypeError('Параметры должен быть целым числом');
  }

  if (min < 0 || max <= min) {
    throw new RangeError('Параметры min и max должны соответствовать требованиям: max > min и min > 0');
  }

  return Math.floor(Math.random() * (max - min)) + min;
};

const getRndArr = (anyArray, maxLength, minLength) => {
  const resultArray = [];

  if (maxLength === undefined) {
    maxLength = anyArray.length;
  }
  if (minLength === undefined) {
    minLength = 1;
  }
  if (maxLength > 1) {
    if (minLength < maxLength){
      maxLength = getRandomInteger(minLength, maxLength);
    } else {
      maxLength = minLength;
    }
  }

  while (resultArray.length < maxLength) {
    const elementRndIndex = getRandomInteger(0, anyArray.length -1);
    const randomElement = anyArray[elementRndIndex];

    if (!resultArray.includes(randomElement)) {
      resultArray.push(randomElement);
    }
  }
  return resultArray;
};

const getUniqueId = (anyArray, limit, offset) => {
  offset = offset || 1;
  let uniqueId = getRandomInteger(offset, limit);
  if (anyArray.includes(uniqueId)) {
    uniqueId = getUniqueId(anyArray, limit, offset);
  }
  return uniqueId;
};

const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, SHOW_TIME);
};

export {getRandomInteger, getRndArr, getUniqueId, isEscEvent, showAlert};

