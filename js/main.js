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


function getRndArr(anyArray) {
  const resultArray = [];
  const lengthOfArray = getRandomInteger(1, anyArray.length);
  while (resultArray.length < lengthOfArray) {
    const elementRndIndex = getRandomInteger(0, anyArray.length -1);
    const randomElement = anyArray[elementRndIndex];

    if (!resultArray.includes(randomElement)) {
      resultArray.push(randomElement);
    }
  }
  return resultArray;
}


const createAd = () => {

  const getAvatarRng = getRandomInteger(1, 10).toLocaleString('ru-RU',{
    style: 'decimal',
    minimumIntegerDigits: 2,
    useGrouping: false,
  });

  const  RND_AVATAR = `img/avatars/user${getAvatarRng}.png`;

  const TYPE = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
  const getRandomTypeIndex = [getRandomInteger(0, TYPE.length -1)];

  const CHECK_TIMES = ['12:00', '13:00', '14:00'];
  const getRandomCheckIndex = [getRandomInteger(0, CHECK_TIMES.length -1)];

  const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  const PHOTOS = [
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
  ];

  const LOCATION_LAT = getRandomFloat(35.65000, 35.7000, 5);
  const LOCATION_LNG = getRandomFloat(139.70000, 139.80000, 5);


  return {
    author: {
      avatar: RND_AVATAR,
    },
    offer: {
      title: 'Заголовок',
      address: `${LOCATION_LAT} ${LOCATION_LNG}`,
      price: getRandomInteger(0, 99999),
      type: TYPE[getRandomTypeIndex],
      rooms: getRandomInteger(1, 5),
      guests: getRandomInteger(1, 10),
      checkin: CHECK_TIMES[getRandomCheckIndex],
      checkout: CHECK_TIMES[getRandomCheckIndex],
      features: getRndArr(FEATURES),
      description: 'Описание помещения',
      photos: getRndArr(PHOTOS),
    },
    location: {
      lat: LOCATION_LAT,
      lng: LOCATION_LNG,
    },
  };
};

createAd();

// console.log(createAd());
