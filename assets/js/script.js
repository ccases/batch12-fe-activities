let canvas = document.getElementById("bg-canvas");
const ctx = canvas.getContext("2d");

let canvasImg = document.getElementsByClassName("img-canvas");
let ctxImg = [];
let imgParticles = [];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.strokeStyle = "black";
let particleArray = [];

let mouse = {
  x: null,
  y: null,
  mScroll: null,
  radius: 80,
};

window.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});
window.addEventListener("resize", (e) => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

function randomIntInRange(a, b) {
  return Math.floor(Math.random() * (b - a)) + a;
}
function randomInRange(a, b) {
  return Math.random() * (b - a) + a;
}
function getDistance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = randomInRange(1, 3);
    this.mass = this.size * 2;

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
    if (this.fillColor) ctx.fillStyle = this.fillColor;
    else ctx.fillStyle = "rgba(195, 134, 250, " + this.opacity + ")";
    // c386fbff;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
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
      this.x > canvas.width ||
      this.x < 0 ||
      this.y > canvas.height ||
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
  fleeFromMouse() {
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

function connectParticles() {
  let maxD = 80;

  for (let i = 0; i < particleArray.length; i++) {
    for (let j = i + 1; j < particleArray.length; j++) {
      let x1 = particleArray[i].x;
      let x2 = particleArray[j].x;
      let y1 = particleArray[i].y;
      let y2 = particleArray[j].y;

      d = getDistance(x1, y1, x2, y2);
      if (d < maxD) {
        let op = ((maxD - d) / maxD) * 0.5;

        ctx.strokeStyle = `rgba(150, 150, 244, ${op})`;
        ctx.linewidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }
    }
  }
}

function initBgParticles() {
  particleArray = [];
  for (let i = 0; i < 100; i++) {
    let x = randomIntInRange(0, canvas.width);
    let y = randomIntInRange(0, canvas.height);
    particleArray.push(new Particle(x, y));
  }
}

//initialize canvas imgs
function initImgParticles() {
  for (let c of canvasImg) {
    ctxImg.push(c.getContext("2d"));
    let smallArr = [];
    for (let i = 0; i < 4; i++) {
      // create 4 particles for each corner of img
      let p = new Particle(c.height / 2, c.width / 2);
      smallArr.push(p);
      p.fillColor = "rgba(255, 0, 0, 1)";
    }
    imgParticles.push(smallArr);
  }
}

function initCtxImg() {
  for (let c of canvasImg) {
    ctxImg.push(c.getContext("2d"));
    ctxImg[0].fillStyle = "rgba(0, 0, 0, 1)";
    ctxImg[0].fillRect(0, 0, c.width, c.height);
  }
}

initImgParticles();
initBgParticles();

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < ctxImg.length; i++) {
    imgParticles[i].forEach((p) => {
      p.draw();
      p.update();
    });
  }
  animateBgParticles();
  connectParticles();
  requestAnimationFrame(animate);
}

animate();

function animateBgParticles() {
  for (let p of particleArray) {
    p.update();
    p.draw();
    // console.log(p);
    if (p.isOutsideCanvas()) {
      p.reinitializeTo(
        Math.random() * canvas.width,
        Math.random() * canvas.height
      );
    }
    p.fleeFromMouse();
  }
}
