class Queue {
  data = [];
  maxSize;

  constructor(initialData, maxSize = -1) {
    this.data = Array.isArray(initialData)
      ? initialData
      : typeof initialData == "undefined"
      ? []
      : [initialData];
    this.maxSize = maxSize;
  }

  isFull() {
    return this.data.length == 0;
  }

  enqueue(item) {
    if (this.isFull()) return false;
    this.data.push(item);
  }
  i = 0;
  *generator() {
    while (!this.isEmpty()) {
      yield this.data.shift();
      ++i;
    }
  }

  dequeue() {
    const { value, done } = this.generator().next();
    if (done) return false;
    return value;
  }
}

export default Queue;
