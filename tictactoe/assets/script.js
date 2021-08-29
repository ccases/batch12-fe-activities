function Player(legalMoves, turn, moveHistory=[]){
    this.legalMoves = legalMoves;
    this.turn = turn;
    this.moveHistory = moveHistory;
    this.score = 0;

    this.showMoveHistory=function(){
        console.log(this.moveHistory);
    };
    this.addMoveHistory = function(move){
        this.moveHistory.push(move);
    }
    this.clearMoveHistory = function(){
        this.moveHistory = [];
    }
}

let squares = document.querySelectorAll(".square");
// for(let i = 0; i<3; i++){
//     for(let j = 0; j<3; j++){
//         squares[i*3+j].setAttribute("id", "c"+i+"r"+j);
//         console.log(squares[i*3+j].id);
//     }
// }


let p1 = new Player(squares, true);     // P1 GETS X
let p2 = new Player(squares, false);    // P2 GETS O

function onHover(){

}

console.log("Square[2] id: " + squares[2].id);


for(let i = 0; i < squares.length; i++){
    squares[i].setAttribute("id",i);
    squares[i].addEventListener("mouseover", function(){
        if(p1.turn){
            this.classList.add("p1-hover");
        }
        else{
            this.classList.add("p2-hover");
        }
    });
    squares[i].addEventListener("mouseleave", function(){
        if(p1.turn){
            this.classList.remove("p1-hover");
        }
        else{
            this.classList.remove("p2-hover");
        }
    });
    squares[i].addEventListener("click", function(){
        if(p1.turn){
            p1.turn = false;
            p2.turn = true;
            this.classList.add("p1-marker");
            p1.addMoveHistory(squares[i].id);
        }
        else{
            p1.turn = true;
            p2.turn=false;
            this.classList.add("p2-marker");
            p2.addMoveHistory(squares[i].id);
        }
        console.log(i);
        p1.showMoveHistory();
        p2.showMoveHistory();
        
        console.log("Square[2] id: " + squares[2].id);
    });
}
console.log("Square[2] id: " + squares[2].id);
function placeMark(){
    if(p1.turn){

    }
    else{}
}