function getRandomInteger (min, max) {

  // Проверяем, что параметры целое число
  if  (!Number.isInteger(min) || !Number.isInteger(max)) {
    throw new TypeError('Параметры должен быть целым числом');
  }

  // Проверяем, что минимальное значение положительное и меньше максимального
  if (min < 0 || max <= min) {
    throw new RangeError('Параметры min и max должны соответствовать требованиям: max > min и min > 0');
  }

  return Math.floor(Math.random() * (max - min)) + min;
}


function getRandomFloat (min, max, precision) {

  // Проверяем, что точность целое число
  if  (!Number.isInteger(precision)) {
    throw new TypeError('Параметр precision должен быть целым числом');
  }

  // Проверяем, что минимальное значение положительное и меньше максимального
  if (min < 0 || max <= min) {
    throw new RangeError('Параметры min и max должны соответствовать требованиям: max > min и min > 0');
  }

  // Вводим коэффициент масштабирования для получения нужного количества знаков после запятой
  const  factor = Math.pow(10, precision);

  // Определение нахождения чисел при заданной тоночсти в заданном диапазоне
  min=Math.ceil(min*factor)/factor;
  max=Math.floor(max*factor)/factor;
  if (max <= min) {
    throw new RangeError('В заданном диапазоне нет чисел указанной precision');
  }

  return getRandomInteger(Math.round(min * factor), Math.round(max * factor)) / factor;
}

getRandomFloat(1, 2, 3);

function getRndArr(anyArray, maxLength) {
  const resultArray = [];

  if (maxLength === undefined) {
    maxLength = anyArray.length;
  }
  if (maxLength > 1) {
    maxLength = getRandomInteger(1, maxLength);
  }
  while (resultArray.length < maxLength) {
    const elementRndIndex = getRandomInteger(0, anyArray.length -1);
    const randomElement = anyArray[elementRndIndex];

    if (!resultArray.includes(randomElement)) {
      resultArray.push(randomElement);
    }
  }
  return resultArray;
}

function getUniqueId (anyArray, limit, offset) {
  offset = offset || 1;
  let uniqueId = getRandomInteger(offset, limit);
  if (anyArray.includes(uniqueId)) {
    uniqueId = getUniqueId(anyArray, limit, offset);
  }
  return uniqueId;
}

export {getRandomInteger, getRandomFloat, getRndArr, getUniqueId};

