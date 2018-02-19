export default function() {
  const w = document.body.clientWidth;
  const h = document.body.clientHeight;

  const c = document.createElement("canvas");
  const aspect = h / w;
  c.width = 128;
  c.height = 128;

  const ctx = c.getContext("2d");

  const linearGradient1 = ctx.createLinearGradient(128 / aspect, 0, 0, 128);
  linearGradient1.addColorStop(0, "rgb(11, 0, 201)");
  linearGradient1.addColorStop(1, "rgb(238, 32, 154)");
  ctx.fillStyle = linearGradient1;
  ctx.fillRect(0, 0, 128, 128);

  return c;
}
