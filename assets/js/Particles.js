export class Particle {
  constructor(x, y, canvas = document.getElementById("bg-canvas")) {
    this.x = x;
    this.y = y;
    this.size = randomInRange(1, 3);
    this.mass = this.size * 2;

    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");

    this.accX = 0;
    this.accY = 0;

    this.baseVelX = randomInRange(-1, 1);
    this.baseVelY = randomInRange(-1, 1);

    this.velX = this.baseVelX;
    this.velY = this.baseVelY;

    this.opacity = 0;

    this.targetX = null;
    this.targetY = null;

    this.fillColor = null;
  }
  setTarget(x, y) {
    this.targetX = x;
    this.targetY = y;
  }
  seekTarget() {
    if (this.targetX && this.targetY) {
      let dx = this.targetX - this.x;
      let dy = this.targetY - this.y;
    }
    return; // do nothing if no target set
  }
  draw() {
    if (this.fillColor) this.ctx.fillStyle = this.fillColor;
    else this.ctx.fillStyle = "rgba(195, 134, 250, " + this.opacity + ")";
    // c386fbff;
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    this.ctx.closePath();
    this.ctx.fill();
  }
  update() {
    this.velX += this.accX;
    this.velY += this.accY;
    this.x += this.velX;
    this.y += this.velY;

    this.accX = 0;
    this.accY = 0;

    this.opacity += 0.01;
    if (this.opacity >= 1) this.opacity = 1;
  }
  isOutsideCanvas() {
    if (
      this.x > this.canvas.width ||
      this.x < 0 ||
      this.y > this.canvas.height ||
      this.y < 0
    ) {
      return true;
    }
    return false;
  }
  reinitializeTo(x, y) {
    this.x = x;
    this.y = y;
    this.baseVelX = randomInRange(-1, 1);
    this.baseVelY = randomInRange(-1, 1);
    this.velX = this.baseVelX;
    this.velY = this.baseVelY;
    this.opacity = 0;
  }
  applyForce(accX, accY) {
    this.accX = accX;
    this.accY = accY;
  }
  fleeFrom(mouse) {
    let d = getDistance(mouse.x, mouse.y, this.x, this.y);
    if (d < mouse.radius) {
      this.applyForce(
        -(mouse.x - this.x) / (d * 2 * this.mass),
        -(mouse.y - this.y) / (d * 2 * this.mass)
      );
    } else {
      if (this.velX > this.baseVelX) {
        this.accX -= 0.01 * this.mass;
      } else {
        this.accX += 0.01 * this.mass;
      }
      if (this.velY > this.baseVelY) {
        this.accY -= 0.01 * this.mass;
      } else {
        this.accY += 0.01 * this.mass;
      }
    }
  }
}

function randomInRange(a, b) {
  return Math.random() * (b - a) + a;
}

function getDistance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}
