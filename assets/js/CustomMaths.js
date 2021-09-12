export function randomIntInRange(a, b) {
  return Math.floor(Math.random() * (b - a)) + a;
}
export function randomInRange(a, b) {
  return Math.random() * (b - a) + a;
}
export function getDistance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}
