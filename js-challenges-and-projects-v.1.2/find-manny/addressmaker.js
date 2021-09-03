function addressMaker(address){
    
    const {city, street} = address;

    const newAddress = {
        city,
        street,
        country: "Philippines",
    }
    return newAddress;
}

let ad = {
    city:"Quezon",
    street: "Ortigas Avenue",
}

var{city, street} = ad;
var ad1 = addressMaker(ad);

var{city, street, country} = ad1;
console.log(city, street, country);
