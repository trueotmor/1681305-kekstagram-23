import {getRandomInteger, getRndArr, getUniqueId} from './util.js';

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

function photo (DESCRIPTION_COUNT) {
  const photoDescription = new Array(DESCRIPTION_COUNT).fill(null).map(() => createPhotoDescription());
  return photoDescription;
}

export {photo};
