import { combineReducers } from 'redux';
import { handleActions, handleAction } from 'redux-actions';
import { ACTION_TYPES } from '../actions';

const photoInit = {
  currentPhoto: '',
};
const currentPhotoReducer = handleAction(
  ACTION_TYPES.ADD_PHOTO,
  (state, { payload }) => ({
    currentPhoto: payload.currentPhoto,
  }),
  photoInit,
);
const autoPlayInit = {
  isAutoPlay: false,
};
const autoplayReducer = handleActions(
  {
    [ACTION_TYPES.STOP_AUTOPLAY]: () => ({
      isAutoPlay: false,
    }),
    [ACTION_TYPES.RUN_AUTOPLAY]: () => ({
      isAutoPlay: true,
    }),
  },
  autoPlayInit,
);

export const rootReducer = combineReducers({
  currentPhoto: currentPhotoReducer,
  autoplay: autoplayReducer,
});
console.log({ rootReducer });
