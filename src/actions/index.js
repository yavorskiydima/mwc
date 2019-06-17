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
  'SET_SNAPSHOT_DELAY',
  'SET_SHOW_RESULT_DELAY',
  'SET_STATUS_RUN_SNAPSHOT_ON',
  'SET_STATUS_RUN_SNAPSHOT_OFF',
  'SET_STATUS_RUN_VIEW_RESULT_ON',
  'SET_STATUS_RUN_VIEW_RESULT_OFF',
]);
export const stopAutoPlay = createAction(ACTION_TYPES.STOP_AUTOPLAY);

export const runAutoPlay = createAction(ACTION_TYPES.RUN_AUTOPLAY);

export const addPhoto = createAction(ACTION_TYPES.ADD_PHOTO, currentPhoto => ({
  currentPhoto,
}));

export const setSnapshotDelay = createAction(ACTION_TYPES.SET_SNAPSHOT_DELAY);
export const setShowResultDelay = createAction(
  ACTION_TYPES.SET_SHOW_RESULT_DELAY,
);

export const toggleSnapshotStatusOn = createAction(
  ACTION_TYPES.SET_STATUS_RUN_SNAPSHOT_ON,
);
export const toggleViewResultStatusOn = createAction(
  ACTION_TYPES.SET_STATUS_RUN_VIEW_RESULT_ON,
);

export const toggleSnapshotStatusOff = createAction(
  ACTION_TYPES.SET_STATUS_RUN_SNAPSHOT_OFF,
);
export const toggleViewResultStatusOff = createAction(
  ACTION_TYPES.SET_STATUS_RUN_VIEW_RESULT_OFF,
);
