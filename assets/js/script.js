"use strict";
import { Particle } from "./Particles.js";
import {
  getDistance,
  randomInRange,
  randomIntInRange,
  clamp,
} from "./CustomMaths.js";

const nParticles = 150;
let canvas = document.getElementById("bg-canvas");
const ctx = canvas.getContext("2d");
let imgContainers = document.getElementsByClassName("overlay");
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

function initImgContainers() {
  Array.from(imgContainers).forEach((container) => {
    container.addEventListener("mouseenter", (e) => {
      container.classList.remove("hide");
    });

    container.addEventListener("mouseleave", (e) => {
      if (!container.classList.contains("hide")) {
        container.classList.add("hide");
      }
    });
  });
}

function connectParticles() {
  let maxD = 80;

  for (let i = 0; i < particleArray.length; i++) {
    for (let j = i + 1; j < particleArray.length; j++) {
      let x1 = particleArray[i].pos.x;
      let x2 = particleArray[j].pos.x;
      let y1 = particleArray[i].pos.y;
      let y2 = particleArray[j].pos.y;

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
  for (let i = 0; i < nParticles; i++) {
    let x = randomIntInRange(0, canvas.width);
    let y = randomIntInRange(0, canvas.height);
    particleArray.push(new Particle(x, y));
  }
}

function connect2(p1, p2, ctx) {
  ctx.strokeStyle = `rgba(150, 150, 244, 1)`;
  ctx.linewidth = 0.5;
  ctx.beginPath();
  ctx.moveTo(p1.pos.x, p1.pos.y);
  ctx.lineTo(p2.pos.x, p2.pos.y);
  ctx.stroke();
}
initImgContainers();
initBgParticles();

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < ctxImg.length; i++) {
    ctxImg[i].clearRect(0, 0, canvasImg[i].width, canvasImg[i].height);
    imgParticles[i].forEach((particle) => {
      particle.update();
      particle.draw();
    });
    imgParticles[i][0].seek(10, 10);
    imgParticles[i][1].seek(canvasImg[i].width - 10, 10);
    imgParticles[i][2].seek(canvasImg[i].width - 10, canvasImg[i].height - 10);
    imgParticles[i][3].seek(10, canvasImg[i].height - 10);
    for (let j = 0; j < 3; j++) {
      connect2(imgParticles[i][j], imgParticles[i][j + 1], ctxImg[i]);
    }
    connect2(imgParticles[i][0], imgParticles[i][3], ctxImg[i]);
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
    if (p.isOutsideCanvas()) {
      p.reinitializeTo(
        Math.random() * canvas.width,
        Math.random() * canvas.height
      );
    }
    p.fleeFrom(mouse);
  }
}
