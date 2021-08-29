const robot = document.querySelector('.robot')

//Challenge: Make Eve move when you click its body.
let numClicks = 0;
var goingRight = true;
function moveRobot() {
    //add code here
    robot.style.transition = "0.3s";
    console.log(window.innerWidth);
    console.log(numClicks*50);
    if(numClicks*50 > window.innerWidth-300){
        goingRight = false;
    }
    else if(numClicks*50<0) goingRight = true;

    if(goingRight) numClicks++;
    else numClicks--;

    robot.style.transform = `translateX(${numClicks*50}px)`;
}
robot.addEventListener('click', moveRobot)