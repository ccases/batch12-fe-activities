const students = [
    {name: "Manny", city: "Manila"},
    {name: "Jose", city: "Intramuros"},
    {name: "Ana", city: "Mandaluyong"},
]

for(let student of students){
    var {name, city} = student
    console.log(`${name} lives in ${city}`);
}