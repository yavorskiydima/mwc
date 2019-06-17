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
  snapshotDelay: 10,
  showResultDelay: 20,
};

const runStatusInitial = {
  isRunSnapshot: false,
  isRunResultView: false,
};

const runStatus = handleActions(
  {
    [ACTION_TYPES.SET_STATUS_RUN_SNAPSHOT_ON]: state => ({
      ...state,
      isRunSnapshot: true,
    }),
    [ACTION_TYPES.SET_STATUS_RUN_VIEW_RESULT_ON]: state => ({
      ...state,
      isRunResultView: true,
    }),
    [ACTION_TYPES.SET_STATUS_RUN_SNAPSHOT_OFF]: state => ({
      ...state,
      isRunSnapshot: false,
    }),
    [ACTION_TYPES.SET_STATUS_RUN_VIEW_RESULT_OFF]: state => ({
      ...state,
      isRunResultView: false,
    }),
  },
  runStatusInitial,
);

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
  runStatus,
});
