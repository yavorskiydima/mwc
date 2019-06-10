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

export function millisecondsToMinutes(milliseconds) {
  return milliseconds / 1000;
}
export function minutesToMilliseconds(minuets) {
  return minuets * 1000;
}
