import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { ACTION_TYPES } from '../actions';

const photoInit = {
  photo: '',
};
const currentPhotoReducer = handleActions({}, photoInit);
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
