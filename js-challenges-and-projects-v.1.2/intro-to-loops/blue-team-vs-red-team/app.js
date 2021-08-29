const people = 58;

for(let i = 1; i<=people; i++)
    console.log(i+ (i%2 === 0? ": blue team" : ": red team"));
