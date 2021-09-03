let p1turn = true,
  p2turn = false;
let p1score = 0,
  p2score = 0;

let squares = document.querySelectorAll(".square");
let moveHistory = [];

makeSquareListeners();

let resetBtn = document.querySelector(".reset");
resetBtn.addEventListener("click", (e) => {});
let prevBtn = document.querySelector(".prev");
let nextBtn = document.querySelector(".next");

function makeSquareListeners() {
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
      if (p1turn) {
        p1turn = false;
        p2turn = true;
        this.classList.add("p1-marker");

        placeMarkOn(this, "X");
      } else {
        p1turn = true;
        p2turn = false;
        this.classList.add("p2-marker");

        placeMarkOn(this, "O");
      }
      this.classList.add("no-ptr-events");
      if (findWin() != "") {
        // parse the winner + win location
        removePtrEvents();
        showWinner();
      }
    });
  }
}
function showWinner() {
  // findWin returns: rowN | colN | main | reverse
  let len = moveHistory.length;
  let win = findWin();
  let result = "";
  result =
    win.substring(0, 3) == "row"
      ? moveHistory[len - 1][+win.substring(3, 4)][0]
      : win.substring(0, 3) == "col"
      ? moveHistory[len - 1][0][+win.substring(3, 4)]
      : win == "main"
      ? moveHistory[len - 1][1][1]
      : win == "reverse"
      ? moveHistory[len - 1][1][1]
      : `no winner?`;
  console.log(result);
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
  for (let i = 0; i < len; i++) {
    // check rows
    if (arr[i][0] == arr[i][1] && arr[i][1] == arr[i][2] && arr[i][0] != "") {
      console.log(`Winner on row ${i}!`);
      return `row${i}`;
    }
  }

  for (let i = 0; i < len; i++) {
    // check cols
    if (arr[0][i] == arr[1][i] && arr[1][i] == arr[2][i] && arr[0][i] != "") {
      console.log(`Winner on column ${i}!`);
      return `col${i}`;
    }
  }

  if (arr[0][0] == arr[1][1] && arr[1][1] == arr[2][2] && arr[0][0] != "") {
    console.log(`Winner on main diag!`);
    return `main`;
  }

  if (arr[0][2] == arr[1][1] && arr[1][1] == arr[2][0] && arr[0][2] != "") {
    console.log(`Winner on reverse diag!`);
    return `reverse`;
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
