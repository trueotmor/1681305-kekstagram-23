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

getRandomInteger();


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

  return getRandomInteger(min * factor, max * factor) / factor;
}

getRandomFloat();
