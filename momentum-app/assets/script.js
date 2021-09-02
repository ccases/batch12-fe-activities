"use strict";
let quotes = [
    {quote: "Start each day with a positive thought and a grateful heart.", author:"Roy T. Bennett"},
    {quote: "Today is your day. Your mountain is waiting so get on your way.", author:"Dr. Seuss"},
    {quote: "Light tomorrow with today.", author:"Elizabeth Barrett Browning"},
    {quote: "Yesterday is not ours to recover, but tomorrow is ours to win or lose.", author:"Lyndon B. Johnson"},
    {quote: "When it rains, it pours? but soon, the sun shines again. Stay positive. Better days are on their way.", author:"Anonymous"},
    {quote: "Learn the rules like a pro, so you can break them like an artist.", author:"Pablo Picasso"},
    {quote: "Never give up on a dream just because of the time it will take to accomplish it. The time will pass anyway.", author:"Earl Nightingale"},
    {quote: "Just one small positive thought in the morning can change your whole day.", author:"Dalai Lama"},
    {quote: "Push yourself because no one else is going to do it for you.", author:"Anonymous"},
    {quote: "Yesterday is not ours to recover, but tomorrow is ours to win or lose.", author:"Lyndon Johnson"},
    {quote: "Every object, every being, is a jar of delight. Be a connoisseur.", author:"Rumi"},
    {quote: "Yesterday’s home runs don’t win today’s games.", author:"Babe Ruth"},
    {quote: "Someday is not a say of the week.", author:"Janet Dailey"},
    {quote: "You’re off to great places, today is your day. Your mountain is waiting, so get on your way.", author:"Dr. Seuss"},
    {quote: "Don’t count the days, make the days count.", author:"Muhammad Ali"},
    {quote: "Make each day your masterpiece.", author:"John Wooden"},
    {quote: "You’re braver than you believe and stronger than you seem, and smarter than you think.", author:"A.A Mine"},
    {quote: "Wonder is the beginning of wisdom.", author:"Socrates"},
    {quote: "How wonderful it is that nobody need wait a single moment before starting to improve the world.", author:"Anne Frank"},
    {quote: "Believe you can and you’re halfway there.", author:"Theodore Roosevelt"},
    {quote: "Don’t judge each day by the harvest you reap but by the seeds that you plant.", author:"Robert Louis Stevenson"},
    {quote: "Every day, there are 1,440 minutes. That means we have 1,440 daily opportunities to make a positive impact.", author:"Les Brown"},
    {quote: "You’ve got to get up every morning with determination if you’re going to go to bed with satisfaction.", author:"George Lorimer"},
    {quote: "When you want something, all the universe conspires in helping you to achieve it.", author:"Paulo Coelho"},
    ];
const quotesInitLen = quotes.length;
setInterval(showDateAndTime,1000);
randomQuote();

let main = document.getElementById("main");
let initComplete = false;

let nameInput = document.getElementById("name");
let nameBtn = document.getElementById("name-button");
nameBtn.addEventListener("click", goToMain);
nameInput.addEventListener("keyup", function(event){
    event.preventDefault();
    if (keyIsEnter(event)) { 
        nameBtn.click();
    }
});

let addTodo = document.getElementById("add-todo");
let todoInput = document.getElementById("todo-input");
todoInput.addEventListener("keyup", function(event){
    event.preventDefault();
    if (keyIsEnter(event)) { 
        addTodo.click();
    }
});

function keyIsEnter(e){
    if(e.code === "Enter" || 
    (e.location == 3 && e.key == "Enter")) //to also catch the numpad enter
        return true;
    
    return false;
}

let todoListItems = 0;
let lights = document.getElementsByClassName("light");
let currLight = 0;

addTodo.addEventListener("click", makeTodo);
function makeTodo(){
    
    if(todoInput.value == '') return;

    todoListItems++;
    let todoList = document.getElementById("todo-div");

    let todoItemDiv = document.createElement("div");
    todoItemDiv.classList.add("todo-item-div");
    setTimeout(function(){
        todoItemDiv.classList.add("give-height");
    }, 10);
    todoItemDiv.setAttribute("id", `item${makeNDigit(2,
        todoListItems)}-div`);

    let todoItem = document.createElement("input");
    todoItem.type="checkbox";
    todoItem.setAttribute("id", `item${makeNDigit(2,
        todoListItems)}`);
    todoItem.value = `todoInput.value`;
    todoItem.name = "todo";
    todoItem.classList.add("todo-item");
    todoItem.setAttribute("onClick", "todoDone(this)");

    let lbl = document.createElement("label");
    lbl.classList.add("todo-item-class");
    lbl.htmlFor = `item${makeNDigit(2,
        todoListItems)}`;
    lbl.appendChild(document.
        createTextNode(todoInput.value));
    
    let todoDelete = document.createElement("button");
    todoDelete.classList.add("todo-delete");
    todoDelete.innerHTML = "&nbsp";
    todoDelete.setAttribute("onClick", "deleteTodo(this)");

    todoItemDiv.appendChild(todoItem);
    todoItemDiv.appendChild(lbl);
    todoItemDiv.appendChild(todoDelete);
   
    todoList.appendChild(todoItemDiv);
    todoItemDiv.classList.add("todo-item-div");

    console.log(todoInput.value);

    todoInput.value = '';
}

function todoDone(e){
    if(!e.checked){
        e.checked = true;
    }
    currLight++;
    if(currLight == lights.length) currLight = 0;
    console.log("todo Done");
    blinkLights();
    setTimeout(function() {
        cycleLights(currLight);
    }, 1700);
}


function cycleLights(n){
    for(let i = 0; i < lights.length; i++){
        if(i == n){ // if light is not on yet
            if(!lights[i].classList.contains("turn-on-lights")){
                lights[i].classList.toggle("turn-on-lights");
            }
        }
        else{ // turn off everything
            lights[i].classList.remove("turn-on-lights");
        }
        
    }
}

function blinkLights(){
    for(let j = 0; j < lights.length; j++){
        setTimeout(function() {
            if(!lights[j].classList.contains("turn-on-lights")){
                lights[j].classList.toggle("turn-on-lights");
            }
            }, 0);
    }

    for(let k = 0; k < lights.length; k++){
        setTimeout(function(){
            lights[k].classList.toggle("turn-on-lights");
        }, 1000);
    }

    for(let i = 0; i < lights.length; i++){
        setTimeout(function(){
            lights[i].classList.toggle("turn-on-lights");
        },1700);
    }
}

function deleteTodo(e){
    let p = e.parentNode;
    p.classList.remove("give-height");
    setTimeout(function(){
        while(p.firstChild){
        p.removeChild(p.firstChild);
    }
    p.remove();} , 700);
}

let resetBtn = document.getElementById("reset-btn");
resetBtn.addEventListener("click", reset);

function reset(){
    // reset all EXCEPT name
    const list = document.getElementsByClassName("todo-delete");
    // get todo delete to interface w function
    for(let i = 0; i < list.length; i++){
        deleteTodo(list[i]);
    }

    getRandomQuote(quotesInitLen);

    while(quotes.length != quotesInitLen){
        quotes.pop();
    }

    let mf = document.getElementById("main-focus");
    mf.textContent = "Click to edit!";
}

let genQuote = document.getElementById("generate-quote");
genQuote.addEventListener("click", randomQuote);

let addQuote = document.getElementById("add-quote-btn");
addQuote.addEventListener("click", showQuoteInterface);
function showQuoteInterface(){
    // console.log("👨‍🦱");
    const quoteDisplayed = document.getElementById("quote");
    const authorDisplayed = document.getElementById("author");
    quoteDisplayed.classList.add("hide");
    authorDisplayed.classList.add("hide");

    addQuote.classList.add("hide");
    // console.log(addQuote.classList);
    const quotesDiv = document.getElementById("quotes-div");

    const container = document.createElement("div");
    container.setAttribute("id", "input-quote-div");
    container.style.height = "80%";

    const inputQuote = document.createElement("textarea");
    inputQuote.classList.add("m-text");
    inputQuote.setAttribute("id", "input-quote");
    inputQuote.setAttribute("rows", 5);
    container.appendChild(inputQuote);

    const authorText = document.createElement("input");
    authorText.type="text";
    authorText.classList.add("m-text");
    authorText.setAttribute("id", "input-author");
    authorText.placeholder = getName().substring(0,getName().length-1);
    container.appendChild(authorText);

    const addBtn = document.createElement("button");
    addBtn.innerHTML = "&nbsp";
    addBtn.classList.add("add-btn");
    addBtn.setAttribute("id", "add-btn-id");
    addBtn.addEventListener("click", storeQuote);
    container.appendChild(addBtn);
    
    const cancelBtn = document.createElement("button");
    cancelBtn.innerHTML = "&nbsp";
    cancelBtn.classList.add("cancel-btn");
    cancelBtn.setAttribute("id", "cancel-btn-id");
    cancelBtn.addEventListener("click", cancelQuote);
    container.appendChild(cancelBtn);
    
    quotesDiv.appendChild(container);
}

const quoteDisplayed = document.getElementById("quote");
const authorDisplayed = document.getElementById("author");

function storeQuote(){
    const inputQuote = 
        {quote: document.getElementById("input-quote").value,
        author: document.getElementById("input-author").value};

    if(inputQuote.quote == '') return;
    if(inputQuote.author == '') {
        inputQuote.author = getName().substring(0,getName().length-1);
        quotes.push(inputQuote);
    }
    else{
        quotes.push(inputQuote);
    }
    quoteDisplayed.textContent = inputQuote.quote;
    authorDisplayed.innerHTML = `<strong>${inputQuote.author}</strong>`;
    
    cancelQuote();
}

function cancelQuote(){
    
    const container = document.getElementById("input-quote-div");

    while(container.firstChild){
        container.firstChild.remove();
    }
    container.remove();
    addQuote.classList.remove("hide");
    quoteDisplayed.classList.remove("hide");
    authorDisplayed.classList.remove("hide");
}

function goToMain(){
    if(getName() == '') return;
    if(!initComplete){
        let initDisplay = document.getElementsByClassName("display-initial");
        let q = document.getElementById("question");
        let skyline = document.getElementsByClassName("main-background");
        for(let i = 1; i < 4; i++){
            setTimeout(function() {
                skyline[i].classList.add("init-animation");
            }, 2300);
        }
        setTimeout(function(){
            for(let i = 0; i < 3; i++){
                setTimeout(function() {
                    cycleLights(i);
                }, (500*i));
            }
        }, 3800);
        

        q.classList.add("make-invisible");

        setTimeout(function(){
            q.textContent = "Welcome!"
            q.classList.add("make-visible");
        }, 500);

        setTimeout(function(){
            q.classList.remove("make-invisible");

            for(let i = 0; i < initDisplay.length; i++){
                initDisplay[i].classList.add("slide-up");
            }
        }, 1700);
        
        document.getElementById("greeting").textContent = getName()+"!";

        initComplete = true;
    }
    window.name = getName();
    console.log(window.name);
    // console.log("👽");
}

function getName(){
    if(!initComplete) return document.getElementById("name").value;
    // console.log("😦");
    return document.getElementById("greeting").textContent;
}

function showDateAndTime(){
    var month = ["January", "February", "March", "April",
                "May", "June", "July", "August",
                "September", "October", "November", "December"];
    var day = ["Sunday","Monday", "Tuesday", "Wednesday", 
               "Thursday","Friday", "Saturday", ];

    let timeText = document.getElementById("time");
    let dateText = document.getElementById("date");

    var today = new Date();
    var date = day[today.getDay()]+', '+(month[today.getMonth()])+' '+today.getDate();
    var time = makeNDigit(2,today.getHours()) + ":" + makeNDigit(2,today.getMinutes());

    dateText.textContent = date;
    timeText.textContent = time;
}

function makeNDigit(n,x){ //by padding N zeros to x
    let str = String(x);
    while(str.length < n){
        str = '0' + str;
    }
    return str;
}

function randomQuote(){
    let rand = Math.floor(Math.random()*quotes.length);
    document.getElementById("quote").textContent = quotes[rand].quote;
    document.getElementById("author").innerHTML = `<strong>${quotes[rand].author}</strong>`;
}

function getRandomQuote(i){
    let rand = Math.floor(Math.random()*i);
    document.getElementById("quote").textContent = quotes[rand].quote;
    document.getElementById("author").innerHTML = `<strong>${quotes[rand].author}</strong>`;
}
