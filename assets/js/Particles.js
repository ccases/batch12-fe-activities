import * as CMath from "./CustomMaths.js";

export class Particle {
  constructor(x, y, canvas = document.getElementById("bg-canvas")) {
    this.pos = CMath.createVector(x, y);

    this.size = randomInRange(1, 3);
    this.mass = this.size * 2;

    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");

    this.acc = CMath.createVector(0, 0);
    // this.accX = 0;
    // this.accY = 0;
    this.maxForce = 0.4;

    this.baseVel = CMath.createVector(
      randomInRange(-1, 1),
      randomInRange(-1, 1)
    );

    this.vel = CMath.createVector(this.baseVel.x, this.baseVel.y);
    this.maxVel = 6;

    this.opacity = 0;

    this.fillColor = null;
  }

  setVel(x, y) {
    this.baseVel.x = x;
    this.baseVel.y = y;

    this.vel.x = x;
    this.vel.y = y;
  }
  seek(x, y) {
    let force = CMath.createVector(x, y);
    force = force.sub(this.pos);
    let desiredSpeed = this.maxVel;
    let slowDistance = 100;
    let distance = getDistance(this.pos.x, this.pos.y, x, y);
    // console.log(distance);
    // if (distance < 100 || distance > -100) {
    //   this.applyForce(new CMath.createVector(0, 0));
    //   console.log("true");
    //   return;
    // }
    if (distance < slowDistance) {
      desiredSpeed = CMath.map(distance, 0, slowDistance, 0, this.maxVel);
    }
    force.setMag(desiredSpeed);
    force.sub(this.vel);
    force.limit(this.maxForce);
    this.applyForce(force);
    return force;
  }
  draw() {
    if (this.fillColor) this.ctx.fillStyle = this.fillColor;
    else this.ctx.fillStyle = "rgba(195, 134, 250, " + this.opacity + ")";
    this.ctx.beginPath();
    this.ctx.arc(this.pos.x, this.pos.y, this.size, 0, Math.PI * 2);
    this.ctx.closePath();
    this.ctx.fill();
  }
  update() {
    // this.vel.x = CMath.limitMax(this.vel.x + this.acc.x, this.maxVel);
    // this.vel.y = CMath.limitMax(this.vel.y + this.acc.y, this.maxVel);
    this.vel.add(this.acc);
    this.vel.limit(this.maxVel);
    this.pos.add(this.vel);
    this.acc.set(0, 0);

    this.opacity += 0.01;
    if (this.opacity >= 1) this.opacity = 1;
  }
  isOutsideCanvas() {
    if (
      this.pos.x > this.canvas.width ||
      this.pos.x < 0 ||
      this.pos.y > this.canvas.height ||
      this.pos.y < 0
    ) {
      return true;
    }
    return false;
  }
  reinitializeTo(x, y) {
    this.pos.x = x;
    this.pos.y = y;
    this.baseVel.x = randomInRange(-1, 1);
    this.baseVel.y = randomInRange(-1, 1);
    this.vel.x = this.baseVel.x;
    this.vel.y = this.baseVel.y;
    this.opacity = 0;
  }
  applyForce(force) {
    this.acc.set(force.x, force.y);
  }
  fleeFrom(target) {
    let d = getDistance(target.x, target.y, this.pos.x, this.pos.y);
    if (d < target.radius) {
      this.applyForce(
        // apply a negative vector to particle
        CMath.createVector(
          -(target.x - this.pos.x) / (d * 2 * this.mass + 1),
          -(target.y - this.pos.y) / (d * 2 * this.mass + 1)
        )
      );
    } else {
      // this.applyForce(this.baseVel.sub(this.vel));
      if (this.vel.x > this.baseVel.x) {
        this.acc.x -= 0.01 * this.mass;
      } else {
        this.acc.x += 0.01 * this.mass;
      }
      if (this.vel.y > this.baseVel.y) {
        this.acc.y -= 0.01 * this.mass;
      } else {
        this.acc.y += 0.01 * this.mass;
      }
    }
  }
  changeColor(hexColor) {}
  drawCircle(x, y, rad) {
    this.ctx.beginPath();
    this.ctx.arc(x, y, rad, 0, Math.PI * 2);
    this.ctx.closePath();
    this.ctx.fill();
  }
}

function randomInRange(a, b) {
  return Math.random() * (b - a) + a;
}

function getDistance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}
