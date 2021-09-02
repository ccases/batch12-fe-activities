const player = {
    name: 'James Bond',
    codeName: 007,
    age: 32,
    address:{
        city: 'London',
    },
};

var { name, codeName, age, {city}:address} = player;

console.log(name);
console.log(codeName);
console.log(age);
console.log(address);
console.log(city);
