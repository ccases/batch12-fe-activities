"use strict";

let p1turn = true,
  p2turn = false;
let p1score = 0,
  p2score = 0;

let images = [];
function preloadImages() {
  for (let x of arguments) {
    let img = new Image();
    img.src = x;
    images.push(img);
  }
}

preloadImages("assets/music-normal.svg", "assets/music-muted.svg");

let mainBody = document.getElementsByTagName("body");
let squares = document.querySelectorAll(".square");
let moveHistory = [];
let moveN = 0;
let tp = document.getElementsByClassName("text-prompt");
let textPromptTimer;
let p1TurnPrompt = "It's Player 1's turn. (X)";
let p2TurnPrompt = "It's Player 2's turn. (O)";

let sfx = document.getElementsByClassName("sfx");
for (let s of sfx) {
  s.muted = true;
}

let musics = document.getElementsByClassName("music");
for (let m of musics) {
  m.muted = true;
}

let musicVol = document.getElementById("music-vol");
musicVol.addEventListener("click", (e) => {
  console.log("clicked music");
  let img = document.getElementById("music-img");
  if (e.target.checked) {
    for (let m of musics) {
      m.muted = false;
    }
    img.setAttribute("src", "assets/music-normal.svg");
  } else {
    for (let m of musics) {
      m.muted = true;
    }
    img.setAttribute("src", "assets/music-muted.svg");
  }
});
let sfxVol = document.getElementById("sfx-vol");
sfxVol.addEventListener("click", (e) => {
  let img = document.getElementById("sfx-img");
  console.log("clicked sfx");
  if (e.target.checked) {
    console.log("unmuting!");
    for (let s of sfx) {
      s.muted = false;
    }
    img.setAttribute("src", "assets/sfx-normal.svg");
  } else {
    console.log("muting!");
    for (let s of sfx) {
      s.muted = true;
    }
    img.setAttribute("src", "assets/sfx-muted.svg");
  }
});

addSquareListeners();
initGame();

function initGame() {
  if (p1turn) {
    textPromptTimer = typewriterFx(p1TurnPrompt);
  } else textPromptTimer = typewriterFx(p2TurnPrompt);
}

let firstMoveBtn = document.querySelector(".move-first");
firstMoveBtn.addEventListener("click", (e) => {
  if (moveN > 0) moveN = 0;
  viewMove(moveN);
});

let lastMoveBtn = document.querySelector(".move-last");
lastMoveBtn.addEventListener("click", (e) => {
  if (moveN <= moveHistory.length - 1) moveN = moveHistory.length;
  viewMove(moveN);
});

let prevBtn = document.querySelector(".prev");
prevBtn.addEventListener("click", (e) => {
  if (moveN > 0) moveN--;
  viewMove(moveN);
});
let nextBtn = document.querySelector(".next");
nextBtn.addEventListener("click", (e) => {
  if (moveN <= moveHistory.length - 1) moveN++;
  viewMove(moveN);
});

function hideTextPrompt() {
  tp[0].classList.add("hide");
}

function showTextPrompt() {
  // expecting only 1 at a time
  tp[0].classList.remove("hide");
}

function showNextMsg() {}

function typewriterFx(str) {
  showTextPrompt();
  // wowowow this closure works surprisingly well.. TOO well
  if (chain) {
    str += "  ᐁ";
    tp[0].addEventListener("click", showNextMsg);
  } else {
    tp[0].removeEventListener("click", showNextMsg);
  }
  let c = 0;
  console.log(c);
  function run(str) {
    // console.log(str.length);
    tp[0].textContent = str.substring(0, ++c);
    if (c == str.length) {
      c = 0;
      clearInterval(textPromptTimer);
    }
  }
  return setInterval(function () {
    run(str);
  }, 20);
}

function viewMove(n) {
  console.log(n);
  let arr;
  if (n == 0) {
    arr = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
  } else {
    arr = moveHistory[n - 1];
  }

  let len = moveHistory[0].length;

  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len; j++) {
      let s = document.getElementById(`s${i}${j}`);
      s.classList.remove("p1-marker");
      s.classList.remove("p2-marker");
      if (arr[i][j] == "X") {
        s.classList.add("p1-marker");
      } else if (arr[i][j] == "O") {
        s.classList.add("p2-marker");
      }
    }
  }
  if (n == moveHistory.length) {
    addWinHighlight();
  } else {
    removeWinHighlight();
  }
}

let resetBtn = document.querySelector(".reset");
resetBtn.addEventListener("click", (e) => {
  for (let square of squares) {
    square.classList.remove("p1-hover");
    square.classList.remove("p1-marker");
    square.classList.remove("p2-hover");
    square.classList.remove("p2-marker");
    square.classList.remove("no-ptr-events");
    square.setAttribute("winner", "false");
    moveHistory = [];

    hideBtns();
  }
});

function addSquareListeners() {
  //adding event listeners to everyone
  for (let i = 0; i < squares.length; i++) {
    squares[i].addEventListener("mouseover", function () {
      if (p1turn) {
        this.classList.add("p1-hover");
      } else {
        this.classList.add("p2-hover");
      }
    });

    squares[i].addEventListener("mouseleave", function () {
      if (p1turn) {
        this.classList.remove("p1-hover");
      } else {
        this.classList.remove("p2-hover");
      }
    });

    squares[i].addEventListener("click", function () {
      sfx[0].play();
      if (p1turn) {
        p1turn = false;
        p2turn = true;
        this.classList.add("p1-marker");
        this.classList.remove("p1-hover");
        placeMarkOn(this, "X");

        clearInterval(textPromptTimer);
        textPromptTimer = typewriterFx(p2TurnPrompt);
      } else {
        p1turn = true;
        p2turn = false;
        this.classList.add("p2-marker");
        this.classList.remove("p2-hover");
        placeMarkOn(this, "O");

        clearInterval(textPromptTimer);
        textPromptTimer = typewriterFx(p1TurnPrompt);
      }

      this.classList.add("no-ptr-events");

      let winner = findWin();
      if (winner != "" && winner != "draw") {
        showBtns();
        removePtrEvents();
        showWinner(winner); // parse the winner + win location (or draw)

        playMusic("victory-music");
        clearInterval(textPromptTimer);
        textPromptTimer = typewriterFx(
          `Congratulations, ${winner.charAt(0)}!`,
          true
        );
      }
      moveN++;
    });
  }
}

function playMusic(musicId) {
  for (let m of musics) {
    // stop all first
    m.pause();
    m.currentTime = 0;
  }
  let selection = document.getElementById(musicId);
  selection.play();
  selection.loop = true;
}
function showBtns() {
  prevBtn.classList.remove("hide");
  nextBtn.classList.remove("hide");
  firstMoveBtn.classList.remove("hide");
  lastMoveBtn.classList.remove("hide");
}
function hideBtns() {
  prevBtn.classList.add("hide");
  nextBtn.classList.add("hide");
  firstMoveBtn.classList.add("hide");
  lastMoveBtn.classList.add("hide");
}

function addWinHighlight() {
  for (let square of squares) {
    if (square.getAttribute("winner") == "true") {
      if (!square.classList.contains("win")) {
        square.classList.add("win");
      }
    }
  }
}

function removeWinHighlight() {
  for (let square of squares) {
    square.classList.remove("win");
  }
}
function showWinner(w) {
  // findWin returns: *letter* *pair1* *pai r2* *pair3*
  // highlights winning squares
  let idxs = [w.substring(2, 4), w.substring(5, 7), w.substring(8, 10)];

  for (let idx of idxs) {
    document.getElementById(`s${idx}`).setAttribute("winner", "true");
  }
  addWinHighlight();
}

function removePtrEvents() {
  for (let square of squares) {
    if (!square.classList.contains("no-ptr-events")) {
      square.classList.add("no-ptr-events");
    }
  }
}

function copyPreviousState() {
  // to instantiate new arrays every time
  let len = moveHistory.length;
  let arr = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  if (len == 0) {
    return arr;
  }

  for (let i = 0; i < moveHistory[0].length; i++) {
    for (let j = 0; j < moveHistory[0][0].length; j++) {
      arr[i][j] = moveHistory[len - 1][i][j];
    }
  }
  return arr;
}

function findWin() {
  let arr = moveHistory[moveHistory.length - 1];
  let len = arr.length;
  let filled = 0;
  for (let i = 0; i < len; i++) {
    // check rows
    if (arr[i][0] == arr[i][1] && arr[i][1] == arr[i][2] && arr[i][0] != "") {
      console.log(`Winner on row ${i}!`);
      return `${arr[i][0]} ${i}0 ${i}1 ${i}2`;
    }
  }

  for (let i = 0; i < len; i++) {
    // check cols
    if (arr[0][i] == arr[1][i] && arr[1][i] == arr[2][i] && arr[0][i] != "") {
      console.log(`Winner on column ${i}!`);
      return `${arr[0][i]} 0${i} 1${i} 2${i}`;
    }
  }

  if (arr[0][0] == arr[1][1] && arr[1][1] == arr[2][2] && arr[0][0] != "") {
    console.log(`Winner on main diag!`);
    return `${arr[1][1]} 00 11 22`;
  }

  if (arr[0][2] == arr[1][1] && arr[1][1] == arr[2][0] && arr[0][2] != "") {
    console.log(`Winner on reverse diag!`);
    return `${arr[1][1]} 02 11 20`;
  }

  outer: for (let i = 0; i < len; i++) {
    for (let j = 0; j < len; j++) {
      if (!arr[i][j] == "") {
        filled++;
        if (filled >= len * len) {
          return "draw";
        }
      } else {
        break outer;
      }
    }
  }
  return "";
}

function placeMarkOn(div, mark) {
  // places and stores to move history
  let idx = getIndices(div);
  let arr = copyPreviousState();
  arr[idx[0]][idx[1]] = mark;
  moveHistory.push(arr);
}

function getIndices(div) {
  let result = [0, 0];
  result[0] = +div.id.substring(1, 2); //parsing row
  result[1] = +div.id.substring(2, 3); //parsing col
  return result;
}
