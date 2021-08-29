const nightClubRegister = [
    {
        name: 'Tony',
        lastname: 'Stark',
        age: 25,
        gender: 'male'
    },
    {
        name: 'Harry',
        lastname: 'Potter',
        age: 16,
        gender: 'male'
    },
    {
        name: 'Hermione',
        lastname: 'Granger',
        age: 17,
        gender: 'female'
    },
    {
        name: 'Steve',
        lastname: 'Rogers',
        age: 62,
        gender: 'male'
    }
]

for(let i = 0; i<nightClubRegister.length; i++)
    if(nightClubRegister[i].age < 18)
        console.log((nightClubRegister[i].gender == 'female'? 
        "Sorry miss " : "Sorry sir ") +nightClubRegister[i].lastname + ", you're under 18 years old.");
    