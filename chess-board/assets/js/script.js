function drag(event) {
  event.target.setAttribute("id", "dragging-this");
  event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
  event.preventDefault();
  const draggedEl = document.getElementById(event.dataTransfer.getData("text"));
  event.target.appendChild(draggedEl);
  draggedEl.setAttribute("id", "");
}

function allowDrop(event) {
  event.preventDefault();
}

class Piece {
  constructor(color, type, loc) {
    this.type = type;
    this.loc = loc;
    this.color = color;
  }

  moveTo = (newLoc) => {};
}

class Square {
  constructor(squareName) {
    this.coords = squareName;
  }
}
