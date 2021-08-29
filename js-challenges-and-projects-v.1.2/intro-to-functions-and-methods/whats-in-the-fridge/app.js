const downButton = document.querySelector('#down')
const upButton = document.querySelector('#up')
const buyListDisplay = document.querySelector('#first-list')
const fridgeListDisplay = document.querySelector('#second-list')

const buyList = ['chicharon ', 'buko pie ', 'mango ', 'bacon ', 'cheese ', 'yakult ', 'chicken ', 'beef ' ]
const fridge = ['coke ', 'donut ']

//Challenge: Please fill the fridge array with 5 items of your choice. 
fridgeListDisplay.innerHTML = fridge;
buyListDisplay.innerHTML = buyList;
//Challenge 2: You have bought some chicharon.
//Please remove it from the buyList and add it to the items in fridge.


//Challenge 3: Write a function that will remove an item from the fridge,
//and put it in the buyList, on the press of the moveUp button.
function refreshDisplay(){
    fridgeListDisplay.innerHTML = fridge;
    buyListDisplay.innerHTML = buyList;
}

function moveItem(source, destination){
    destination.unshift(source.shift());
}

function moveUp(){
    //your code
    if(fridge[0]!=undefined){
        moveItem(fridge, buyList);
        refreshDisplay();
    }
}

upButton.addEventListener('click', moveUp);

//Challenge 4: Write a function that will remove the last item in the buyList, 
//and put it in the fridge.

function moveDown(){
    //your code
    if(buyList[0]!=undefined){
        moveItem(buyList,fridge);
        refreshDisplay();
    }
}

downButton.addEventListener('click', moveDown);
