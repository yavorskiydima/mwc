export function runAutoPlayHelper(
  callFunc,
  { visible, holdRun, delay, isAutoSnapShot, changeStatus },
) {
  console.log(isAutoSnapShot && visible && !holdRun);
  if (isAutoSnapShot && visible && !holdRun) {
    setTimeout(() => {
      callFunc();
      changeStatus();
      console.log('run Snap delay->', delay);
    }, delay);
  }
}

export function millisecondsToMinutes(milliseconds) {
  return milliseconds / 1000;
}
export function minutesToMilliseconds(minuets) {
  return minuets * 1000;
}
