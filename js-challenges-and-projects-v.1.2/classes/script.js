class Player {
  constructor(name, country) {
    this.name = name;
    this.country = country;
  }

  playerInfo() {
    return `${this.name} was born in ${this.country}.`;
  }
}

class BasketballPlayer extends Player {
  constructor(name, country, age) {
    super(name, country);
    this.age = age;
  }

  playerInfo() {
    return `${super.playerInfo()} He is ${this.age} 
    years old and likes playing basketball.`;
  }
}

let player = new Player("Messi", "Argentina");
console.log(player.playerInfo());

let bballPlayer = new BasketballPlayer("Lebron", "Miami", 34);
console.log(bballPlayer.playerInfo());
