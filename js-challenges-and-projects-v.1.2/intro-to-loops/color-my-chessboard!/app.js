const squares = Array.from(document.querySelectorAll('.grid div'))
//Nodelist of all the div squares on our board. Think of it as an array. 

//Your goal is to add a chessboard color pattern to this blank board using loops and Arrays.
//write code here

for(let i = 0; i<squares.length; i++){
    squares[i].classList.add((i%2 === 0?"even" : "odd"));
}
