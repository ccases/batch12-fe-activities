// import Stack from "./Stack.js";

class Operation {
  constructor(val) {
    this.value = val;
  }
}
class Add extends Operation {
  apply(value) {
    return value + this.value;
  }

  undo(value) {
    return value - this.value;
  }
}
class Times extends Operation {
  apply(value) {
    return value * this.value;
  }
  undo(value) {
    return value / this.value;
  }
}

export { Add, Times };
