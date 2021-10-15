"use strict";
import { Particle } from "./Particles.js";
import {
  getDistance,
  randomInRange,
  randomIntInRange,
  clamp,
} from "./CustomMaths.js";

let canvas = document.getElementById("bg-canvas");
const ctx = canvas.getContext("2d");

let canvasImg = document.getElementsByClassName("img-canvas");
let canvasDiv = document.getElementsByClassName("canvas-div");
let imgDivs = document.getElementsByClassName("img-container");
let images = document.getElementsByClassName("c-img");
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

const holoObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        showHolo(entry.target);
      } else {
        hideHolo(entry.target);
      }
    });
  },
  { rootMargin: "0px 0px -200px 0px" }
);

function initCanvasDivs() {
  for (let imgDiv of imgDivs) {
    holoObserver.observe(imgDiv);
    imgDiv.isAnimating = false; // attach a new key
  }
}

function hideHolo(imgDiv) {
  if (imgDiv.isAnimating) {
    setTimeout(function () {
      hideHolo(imgDiv);
    }, 200);
    return;
  }

  let img = imgDiv.lastElementChild;

  imgDiv.isAnimating = true;

  if (!img.classList.contains("hide")) img.classList.add("hide");
  img.classList.remove("flicker");
  setTimeout(function () {
    imgDiv.classList.remove("give-height");
  }, 400);
  setTimeout(function () {
    imgDiv.classList.remove("give-width");
    imgDiv.isAnimating = false;
  }, 800);
}
function showHolo(imgDiv) {
  if (imgDiv.isAnimating) {
    setTimeout(function () {
      showHolo(imgDiv);
    }, 200);
    return;
  }

  let img = imgDiv.lastElementChild;
  imgDiv.isAnimating = true;

  if (!imgDiv.classList.contains("give-width"))
    imgDiv.classList.add("give-width");
  if (!imgDiv.classList.contains("give-height"))
    setTimeout(function () {
      imgDiv.classList.add("give-height");
    }, 400);
  setTimeout(function () {
    img.classList.add("flicker");
    img.classList.remove("hide");
    imgDiv.isAnimating = false;
  }, 800);
}

window.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});
window.addEventListener("resize", (e) => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  for (let i = 0; i < canvasImg.length; i++) {
    let c = canvasImg[i];
    let d = canvasDiv[i];

    c.width = d.clientWidth;
    c.height = d.clientHeight;
  }
});

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
  for (let i = 0; i < 100; i++) {
    let x = randomIntInRange(0, canvas.width);
    let y = randomIntInRange(0, canvas.height);
    particleArray.push(new Particle(x, y));
  }
}

//initialize canvas imgs
function initCanvasImg() {
  for (let c of canvasImg) {
    c.width = clamp(300, 0.8 * window.innerWidth, 1000);
    c.height = clamp(300, 0.5 * window.innerHeight, 1000);

    ctxImg.push(c.getContext("2d"));
    ctxImg[ctxImg.length - 1].fillStyle = "rgba(100, 0, 0, 1)";
    ctxImg[ctxImg.length - 1].fillRect(0, 0, c.width, c.height);
  }

  for (let i = 0; i < ctxImg.length; i++) {
    images[i].onload = function () {
      ctxImg[i].drawImage(images[i], 10, 10);
      console.log(images[i], ctxImg[i]);
    };
  }
}

function initImgParticles() {
  for (let c of canvasImg) {
    let smallArr = [];

    for (let i = 0; i < 4; i++) {
      // create 4 particles for each corner of img
      let p = new Particle(c.width / 2, c.height / 2, c);
      p.size = 5;
      smallArr.push(p);
      p.fillColor = "rgba(255, 255, 0, 1)";
      p.setVel(0, 0);
    }

    imgParticles.push(smallArr);
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

initCanvasDivs();
initCanvasImg();
initImgParticles();
initBgParticles();

// setInterval(function () {
//   console.log(imgParticles[1][0].acc.x, imgParticles[1][0].acc.y);
// }, 1000);

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
