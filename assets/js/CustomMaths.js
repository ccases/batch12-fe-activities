export function randomIntInRange(a, b) {
  return Math.floor(Math.random() * (b - a)) + a;
}
export function randomInRange(a, b) {
  return Math.random() * (b - a) + a;
}
export function getDistance(x1, y1, x2, y2) {
  // console.log(Math.pow(x2 - x1, 2));
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}
export function clamp(min, num, max) {
  //clamps the number between min and max, inclusive
  // very useful in resizing while being dependent on client/window width and height
  if (num < min) return min;
  else if (num > max) return max;
  return num;
}
export class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  add(v) {
    this.x += v.x;
    this.y += v.y;
    return this;
  }
  sub(v) {
    this.x -= v.x;
    this.y -= v.y;
    return this;
  }
  mult(n) {
    this.x *= n;
    this.y *= n;
    return this;
  }
  div(v) {
    this.x /= v.x;
    this.y /= v.y;
    return this;
  }
  set(x, y) {
    this.x = x;
    this.y = y;
    return this;
  }
  setMag(len) {
    return this.normalize().mult(len);
  }
  normalize() {
    let mag = this.getMag();
    if (mag !== 0) this.mult(1 / mag);
    return this;
  }
  getMag() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  limit(magnitude) {
    if (this.getMag() > magnitude) {
      return this.setMag(magnitude);
    }
    return this;
  }
}
export function createVector(x, y) {
  return new Vector(x, y);
}
export function limitMax(num, maxL) {
  if (Math.abs(num) > Math.abs(maxL)) return num < 0 ? -maxL : maxL;
  return num;
}
export function map(n, start1, stop1, start2, stop2) {
  return ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
}
export function isWithin(num, range) {
  return num <= range[1] && num >= range[0];
}
