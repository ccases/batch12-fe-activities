var justiceLeague = [
    {name: "Superman", superpower: "Super strength"}, 
    {name: "Batman", superpower: "Super rich"},
    {name: "Wonder Woman", superpower: "Super lasso"}, 
    {name: "The Flash", superpower: "Super speed"}, 
    {name: "Green Lantern", superpower: "Super ring"}
]

let superheroList = document.getElementById("league");
// for(let i = 0; i < justiceLeague.length; i++){
//     superheroList.append(document.createElement("li"));
//     document.getElementsByTagName("li")[i].textContent = 
//         `Hero: ${justiceLeague[i].name} ` + "\r\n" + 
//         `Superpower: ${justiceLeague[i].superpower}`;
// }

// for(let i = 0; i < justiceLeague.length; i++){
//     superheroList.innerHTML += `<li>Hero: ${justiceLeague[i].name} <br>
//         Power: ${justiceLeague[i].superpower}</li>`;
// }