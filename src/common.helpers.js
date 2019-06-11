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

export function cutImage(
  blob,
  canvas,
  xs,
  ys,
  sWidth,
  sHeight,
  dx,
  dy,
  dWidth,
  dHeight,
) {
  console.log('Canvas', canvas);
  // const canvas = document.createElement('canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.height = 480;
    img.width = 640;
    canvas.width = 640;
    canvas.height = 480;
    img.onload = () => {
      ctx.drawImage(img, 50, 100, 200, 100, 0, 0, 200, 100);
      // , xs, ys, sWidth, sHeight, dx, dy, dWidth, dHeight);
      console.log('IMG size', img.width, img.height);
    };
    img.src = URL.createObjectURL(blob);
  }
}
