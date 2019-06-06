import { createAction } from 'redux-actions';
function makeActionType(arrTypes) {
  return arrTypes.reduce((accumObject, type) => {
    accumObject[type] = type;
    return accumObject;
  }, {});
}
export const ACTION_TYPES = makeActionType([
  'STOP_AUTOPLAY',
  'RUN_AUTOPLAY',
  'ADD_PHOTO',
]);
export const stopAutoPlay = createAction(ACTION_TYPES.STOP_AUTOPLAY);

export const runAutoPlay = createAction(ACTION_TYPES.RUN_AUTOPLAY);

export const addPhoto = createAction(ACTION_TYPES.ADD_PHOTO, currentPhoto => ({
  currentPhoto,
}));
