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

let photoDescriptionTotalCount = 1;
const commentsIdArray = [];
const createPhotoDescription = () => {

  const RANDOM_MESSAGE = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
  ];

  const RANDOM_NAME = [
    'Гарфилд', 'Том', 'Гудвин', 'Рокки', 'Ленивец', 'Пушок', 'Спорти', 'Бегемот', 'Пират', 'Гудини', 'Зорро', 'Саймон', 'Альбус', 'Базилио', 'Леопольд', 'Нарцисс',
  ];

  const commentsIdArrayNumber = getUniqueId (commentsIdArray, 99999);

  const messageObject = {
    id: photoDescriptionTotalCount,
    url: `photos/${photoDescriptionTotalCount}.jpg`,
    description: 'Описание фотографии',
    likes: getRandomInteger(15, 200),

    comments: {
      id: commentsIdArrayNumber,
      avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
      message: (getRndArr(RANDOM_MESSAGE, 3)).join(' '),
      name: getRndArr(RANDOM_NAME, 2).toString(),
    },
  };

  photoDescriptionTotalCount += 1;
  commentsIdArray.push(commentsIdArrayNumber);

  return messageObject;
};

const DESCRIPTION_COUNT = 25;

const photoDescription = new Array(DESCRIPTION_COUNT).fill(null).map(() => createPhotoDescription());

photoDescription;

// console.log(photoDescription);
