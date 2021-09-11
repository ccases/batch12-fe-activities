let Book = function (title, quantity, value) {
  this.title = title;
  this.quantity = quantity;
  this.value = value;
};

let Store = function (storeName) {
  this.storeName = storeName;
  this.inventoryList = [];
  this.earnings = 0;

  this.addBook = function (title, quantity, value) {
    //push a book to inventory
    this.inventoryList.push(new Book(title, quantity, value));
  };

  this.restockBook = function (title, quantity) {
    //find title first, then restock. if title not in inventory, dont bother
    let found = this.inventoryList.find((book) => book.title === title);
    if (!found) {
      console.log(`"${title}" not in inventory.`);
    } else {
      found.quantity += quantity;
      console.log(`Added ${quantity} of ${found.title}.`);
    }

    return;
  };

  this.sellBook = function (title, quantity) {
    // deduct quantity, multiply book.value*quantity add to earnings!
    let found = this.inventoryList.find((book) => book.title === title);

    if (!found) {
      console.log(`"${title}" not found.`);
    } else {
      if (quantity <= found.quantity) {
        found.quantity -= quantity;
        this.earnings += found.value * quantity;
      } else {
        console.log(`${found.title}: only ${found.quantity} stocks left.`);
      }
    }
  };

  this.showTotalEarnings = function () {
    console.log(`${this.storeName} earnings: ${this.earnings}`);
  };

  this.showListInventory = function () {
    let i = 0;
    this.inventoryList.forEach(function (book) {
      console.log(`\nBook ${++i}`);
      console.log(`Title: ${book.title}`);
      console.log(`Qty: ${book.quantity}`);
      console.log(`Val: ${book.value}`);
    });
  };
};

let nbs = new Store("National Bookstore");

nbs.addBook("twilight", 24, 540);
nbs.addBook("abnkkbsnplk", 15, 230);
nbs.addBook("dictionary", 109, 90);

nbs.restockBook("hey", 15);
nbs.restockBook("twilight", 20);

nbs.sellBook("heyeye", 2);
nbs.sellBook("dictionary", 5);
nbs.sellBook("abnkkbsnplk", 32);
nbs.sellBook("abnkkbsnplk", 15);

nbs.showTotalEarnings();

nbs.showListInventory();
