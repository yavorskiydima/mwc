import { IS_AUTO_SNAPSHOT, CREATING_PHOTO_DELAY } from './constants';

export function runAutoPlayHelper(
  callFunc,
  { visible, holdRun, delay, isAutoSnapShot },
) {
  holdRun = !visible;
  if (isAutoSnapShot && visible && !holdRun) {
    setTimeout(() => {
      callFunc();
      holdRun = true;
    }, delay);
    return;
  }
}
