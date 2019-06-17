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
  siblingImg,
  xs = 0,
  ys = 0,
  sWidth = 200,
  sHeight = 200,
) {
  if (canvas) {
    const ctx = canvas.getContext('2d');
    const img = new Image();

    canvas.width = (siblingImg && siblingImg.width) || 640;
    canvas.height = (siblingImg && siblingImg.height) || 480;
    img.onload = () => {
      const { dLeft, dTop, dWidth, dHeight } = getCenterPosition({
        sWidth,
        sHeight,
        canvasWidth: canvas.width,
        canvasHeight: canvas.height,
      });
      ctx.drawImage(img, xs, ys, sWidth, sHeight, dLeft, dTop, dWidth, dHeight);
    };
    img.src = URL.createObjectURL(blob);
  }
}

export function drawRect(
  blob,
  canvas,
  { left, top, width, height, strokeStyle = 'green', lineWidth = 2 },
) {
  if (!canvas) {
    return;
  }
  const ctx = canvas.getContext('2d');

  const img = new Image();

  // ctx.setTransform(1, 0, 0, 1, 0, 0);
  // ctx.scale(1, -1);

  img.onload = () => {
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = strokeStyle;
    ctx.drawImage(img, 0, 0);

    ctx.beginPath();
    ctx.rect(top, left, width, height);
    ctx.stroke();
  };
  img.src = URL.createObjectURL(blob);
}

function getCenterPosition({ sWidth, sHeight, canvasWidth, canvasHeight }) {
  const getPos = (canvasSide, srcSide) =>
    canvasSide <= srcSide ? 0 : canvasSide / 2 - srcSide / 2;
  return {
    dLeft: getPos(canvasWidth, sWidth),
    dTop: getPos(canvasHeight, sHeight),
    dWidth: canvasWidth >= sWidth ? sWidth : canvasWidth,
    dHeight: canvasHeight >= sHeight ? sHeight : canvasHeight,
  };
}
