"use strict";
import { Particle } from "./Particles.js";
import { getDistance, randomInRange, randomIntInRange } from "./CustomMaths.js";

let canvas = document.getElementById("bg-canvas");
const ctx = canvas.getContext("2d");

let canvasImg = document.getElementsByClassName("img-canvas");
let ctxImg = [];
let imgParticles = [];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

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

function connectParticles() {
  let maxD = 80;

  for (let i = 0; i < particleArray.length; i++) {
    for (let j = i + 1; j < particleArray.length; j++) {
      let x1 = particleArray[i].x;
      let x2 = particleArray[j].x;
      let y1 = particleArray[i].y;
      let y2 = particleArray[j].y;

      let d = getDistance(x1, y1, x2, y2);
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
    p.fleeFrom(mouse);
  }
}
