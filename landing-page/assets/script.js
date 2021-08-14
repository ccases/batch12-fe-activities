"use strict";
//HAMBURGER CODE HERE
var mq = window.matchMedia("(max-width: 600px)");
mq.addListener(resetMenu);

//LAZY LOAD CODE HERE
const storeItems = document.querySelectorAll(".store-item");

const lazyLoad = target => {
  const io = new IntersectionObserver((entries, observer) => {
    console.log(entries)
    entries.forEach(entry => {

      if (entry.isIntersecting) {
        const storeItem = entry.target;
        storeItem.classList.remove('pop-up-item');

        observer.disconnect();
      }
    });
  });
  io.observe(target);
};
storeItems.forEach(lazyLoad);

const vacObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        const vacuumCleaner = entry.target.querySelector("#vacuum-div");

        if(entry.isIntersecting){
            vacuumCleaner.classList.add("vacuum-div-animate");
            return;
        }
        vacuumCleaner.classList.remove("vacuum-div-animate");
    });
});

// let storeItems = document.querySelectorAll(".store-item");
// function addStyleOrder(items) {
//     var itemNo=0;
//     items.forEach(i ={
//         i.style.setProperty('--order', itemNo++);
//     });
// };

const dustObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        const dustToClean = entry.target.querySelector("#dust-div");

        if(entry.isIntersecting){
            dustToClean.classList.add("dust-div-animate");
            return;
        }
        dustToClean.classList.remove("dust-div-animate");
    });
});

dustObserver.observe(document.querySelector("#suction-div"));
vacObserver.observe(document.querySelector("#suction-div"));



let binObsOptions = {
    rootMargin: '0px',
    threshold: 0.5
}

var binObs = new IntersectionObserver(observerCallback, binObsOptions);

function observerCallback(entries, binObs) {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            // alert("intersecting");
          //do something
          entry.target.classList.add("dust-out");
          return;
        }
        entry.target.classList.remove("dust-out");
    });
};

let dusts = '.bin-animate';
document.querySelectorAll(dusts).forEach((i) => {
    if (i) {
        binObs.observe(i);
    }
});

// const dustBinObserver = new IntersectionObserver(entries => {
//     entries.forEach(entry =>{
//         const dustLoad = entry.target.querySelector(".lazy-init");

//         if(entry.isIntersecting){
//             dustLoad.classList.add("dust-out");
//             return;
//         }
//         dustLoad.classList.remove("dust-out");
//     });
// });
// dustBinObserver.observe(document.querySelectorAll(".lazy-init"));

let submitDiv=document.getElementById("submit-button-div");
let submitButton=document.getElementById("submit");
submitDiv.addEventListener("click", e=> {
    submitButton.click();
});



//SUBMIT FORM CODE HERE

let form = document.getElementById("form");
let errorMsg = document.getElementById("email-invalid");

submitButton.addEventListener("click", e=>{
    if(form[0].validity.valid){
        // alert("valid email")
        errorMsg.classList.remove('invalid-animation');
    }
    else{
        // alert("not valid");
        errorMsg.classList.add('invalid-animation');
    }
});

//THANK YOU PAGE CODE HERE
// document.getElementById("client-email").html(emailVal);


// IDK ALL OTHER FUNCTIONS I GUESS
function changeModeBg(divToChange){
    if(document.getElementById("eco-mode").checked){
        divToChange.classList.add("eco-class");
        divToChange.classList.remove("boost-class");
        divToChange.classList.remove("auto-class");
    }
    else if(document.getElementById("auto-mode").checked){
        divToChange.classList.add("auto-class");
        divToChange.classList.remove("boost-class");
        divToChange.classList.remove("eco-class");
    }
    else if(document.getElementById("boost-mode").checked){
        divToChange.classList.add("boost-class");
        divToChange.classList.remove("eco-class");
        divToChange.classList.remove("auto-class");
    }
}

// function changeModeBg(divToChange){
//     if(document.getElementById("eco-mode").checked){
//         divToChange.style.background ="linear-gradient(to left, rgba(0,0,0,0), rgba(36,36,36,0) 75%, rgba(36,36,36,1) 100%) url(eco-bg.jpg)"
//     }
//     else if(document.getElementById("auto-mode").checked){
//         divToChange.style.background ="linear-gradient(to left, rgba(0,0,0,0), rgba(36,36,36,0) 75%, rgba(36,36,36,1) 100%) url(auto-bg.jpg)"
//     }
//     else if(document.getElementById("boost-mode").checked){
//         divToChange.style.background ="linear-gradient(to left, rgba(0,0,0,0), rgba(36,36,36,0) 75%, rgba(36,36,36,1) 100%) url(boost-bg.jpg)"
//     }
// }

function menuToggle(x) {
    if(x.classList.contains("change")){ //menu is opened, close it
        x.classList.remove("change");
        collapseMenu();
    }
    else{
        x.classList.add("change");
        expandMenu();
    }
}
function expandMenu(){
    var menuBox = document.getElementById("navbar-links-div");
    menuBox.style.height ="153.6px";
}
function collapseMenu(){
    var menuBox=document.getElementById("navbar-links-div");
    menuBox.style.height = "0px";
}
function resetMenu(mq){
    var menuBox=document.getElementById("navbar-links-div");
    var x = document.getElementById("hamburger-div");
    
    menuBox.style.height = "100%";

    if(!mq.matches){    // if device gets larger
        if(x.classList.contains("change")){
            x.classList.remove("change"); // get that out of here
        }
        // alert("changed screensize");
    }
    else{ //if device gets small again
        menuBox.style.height = "0px";   //collapse menu
    }
}