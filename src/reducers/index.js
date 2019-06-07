import { combineReducers } from 'redux';
import { handleActions, handleAction } from 'redux-actions';
import { ACTION_TYPES } from '../actions';

const photoInit = {
  currentPhoto: '',
};
const currentPhoto = handleAction(
  ACTION_TYPES.ADD_PHOTO,
  (state, { payload }) => ({
    currentPhoto: payload.currentPhoto,
  }),
  photoInit,
);
const autoPlayInit = {
  isAutoPlay: false,
};
const autoplay = handleActions(
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
const delaySettingsInitial = {
  snapshotDelay: 1,
  showResultDelay: 2,
};
const delaySettings = handleActions(
  {
    [ACTION_TYPES.SET_SNAPSHOT_DELAY]: (state, { payload }) => ({
      ...state,
      snapshotDelay: payload,
    }),
    [ACTION_TYPES.SET_SHOW_RESULT_DELAY]: (state, { payload }) => ({
      ...state,
      showResultDelay: payload,
    }),
  },
  delaySettingsInitial,
);

export const rootReducer = combineReducers({
  currentPhoto,
  autoplay,
  delaySettings,
});
console.log({ rootReducer });
