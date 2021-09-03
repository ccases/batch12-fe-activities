let p1turn = true,
  p2turn = false;
let p1score = 0,
  p2score = 0;

let squares = document.querySelectorAll(".square");
let moveHistory = [];

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
    let arr = copyPreviousState();
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
    console.log(moveHistory);
  });
}

function copyPreviousState() {
  // to instantiate new arrays every time
  let moveNum = moveHistory.length;
  let arr = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  if (moveNum == 0) {
    return arr;
  }

  for (let i = 0; i < moveHistory[0].length; i++) {
    for (let j = 0; j < moveHistory[0][0].length; j++) {
      arr[i][j] = moveHistory[moveNum - 1][i][j];
    }
  }
  return arr;
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
