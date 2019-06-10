export function runAutoPlayHelper(
  callFunc,
  { visible, holdRun, delay, isAutoSnapShot, changeStatus },
) {
  if (isAutoSnapShot && visible && !holdRun) {
    setTimeout(() => {
      console.log('run Snap delay->', delay);
      callFunc();
      changeStatus();
    }, delay);
  }
}

export function millisecondsToMinutes(milliseconds) {
  return milliseconds / 1000;
}
export function minutesToMilliseconds(minuets) {
  return minuets * 1000;
}
