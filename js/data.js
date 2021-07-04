import {getRandomInteger, getRndArr, getUniqueId} from './util.js';

let photoDescriptionTotalCount = 1;
const commentsIdentifiers = [];
const createPhotoDescription = () => {

  const RANDOM_MESSAGES = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
  ];

  const RANDOM_NAMES = [
    'Гарфилд', 'Том', 'Гудвин', 'Рокки', 'Ленивец', 'Пушок', 'Спорти', 'Бегемот', 'Пират', 'Гудини', 'Зорро', 'Саймон', 'Альбус', 'Базилио', 'Леопольд', 'Нарцисс',
  ];

  const MAX_COMMENT_IDENTIFIER = 99999;

  const MIN_LIKES_NUMBER = 15;
  const MAX_LIKES_NUMBER = 200;

  const MIN_AVATAR_NUMBER = 1;
  const MAX_AVATAR_NUMBER = 6;

  const MAX_MESSAGES_NUMBER = 3;

  const MAX_NAMES_NUMBER = 2;

  const commentsIdArrayNumber = getUniqueId (commentsIdentifiers, MAX_COMMENT_IDENTIFIER);

  const messageObject = {
    id: photoDescriptionTotalCount,
    url: `photos/${photoDescriptionTotalCount}.jpg`,
    description: 'Описание фотографии',
    likes: getRandomInteger(MIN_LIKES_NUMBER, MAX_LIKES_NUMBER),

    comments: {
      id: commentsIdArrayNumber,
      avatar: `img/avatar-${getRandomInteger(MIN_AVATAR_NUMBER, MAX_AVATAR_NUMBER)}.svg`,
      message: (getRndArr(RANDOM_MESSAGES, MAX_MESSAGES_NUMBER)).join(' '),
      name: getRndArr(RANDOM_NAMES, MAX_NAMES_NUMBER).toString(),
    },
  };

  photoDescriptionTotalCount += 1;
  commentsIdentifiers.push(commentsIdArrayNumber);

  return messageObject;
};

function photo (DESCRIPTION_COUNT) {
  const photoDescription = new Array(DESCRIPTION_COUNT).fill(null).map(() => createPhotoDescription());
  return photoDescription;
}

export {photo};

