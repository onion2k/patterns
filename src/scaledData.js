/**
 * Scale an image using a canvas
 * @constructor
 * @external document - A browser document instance
 * @param {number} imgCache - cached image
 * @param {number} imgSize - img size to scale to
 * @param {number} dX - distortion factor in the x axis
 * @param {number} dY - distortion factor in the y axis
 */
export function getScaledImageData(imgCache, imgSize, dX, dY) {
  const distX = dX || 1;
  const distY = dY || 1;
  const c = document.createElement("canvas");
  const aspect = imgCache.height / imgCache.width;

  c.width = imgSize * distX;
  c.height = Math.floor(imgSize * aspect * distY);

  const ctx = c.getContext("2d");

  ctx.drawImage(imgCache, 0, 0, c.width, c.height);

  return {
    data: ctx.getImageData(0, 0, c.width, c.height).data,
    width: c.width,
    height: c.height
  };
}
