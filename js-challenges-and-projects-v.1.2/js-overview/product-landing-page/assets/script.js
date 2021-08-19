// alert(1);

let calculatorLCD = document.createElement("div");
calculatorLCD.setAttribute("id", "lcd");
calculatorLCD.style.backgroundColor = "#eeeeee";
document.getElementsByTagName("body")[0].appendChild(calculatorLCD);
let btn = [10];
for(let i = 0; i<10; i++){
    btn[i] = document.createElement("button");
    btn[i].setAttribute("class", "number-btn");
    btn[i].innerHTML = i;
    document.getElementsByTagName("body")[0].appendChild(btn[i]);
    btn[i].setAttribute("onclick", "typeInLCD(this)");
}

function typeInLCD(x){
    calculatorLCD.textContent += x.textContent;
    // switch (x.textContent){
    //     case "+":
    //     case "-":
    //     case "*":
    //     case "/":

    // }

}

function calcExp(){
    let operands = calculatorLCD.textContent.match(/[*\/+-]/g);
    let calcString = calculatorLCD.textContent.split(/[/*+-]/g);
    var maxLength = operands.length;
    var i = 0;
    console.log(operands);
    console.log(calcString);

    while(i <= maxLength){   //for mult/div
        console.log(`Mult and div ${i} maxlength ${maxLength}`);
        var changed = false;
        if(operands[i] == "*" || operands[i] == "/"){
            if(operands[i] == "*"){
                calcString[i] *= +calcString[i+1];
            }
            else{
                calcString[i] /= +calcString[i+1];
            }
            operands.splice(i,1);
            calcString.splice(i+1, 1);
            changed = true;
            maxLength--;
            console.log(`CalcString: ${calcString}`);
            console.log(`operands: ${operands}`);
        }
        if(!changed){
            i++;
        }
    }
    i = 0; // reset dat
    while(i <= maxLength){   //for add/sub
        console.log(`Add and sub ${i} maxlength ${maxLength}`);
        var changed = false;
        if(operands[i] == "-" || operands[i] == "+"){
            if(operands[i] == "+"){
                calcString[i] = +calcString[i] + +calcString[i+1];
            }
            else{
                calcString[i] = +calcString[i] - +calcString[i+1];
            }
            operands.splice(i,1);
            calcString.splice(i+1, 1);
            changed = true;
            maxLength--;
            console.log(`CalcString: ${calcString}`);
            console.log(`operands: ${operands}`);
        }
        if(!changed){
            i++;
        }
    }
    calculatorLCD.innerHTML += "=";
    calculatorLCD.innerHTML += calcString[0];
}

let multiplyBtn = document.createElement("button");
multiplyBtn.innerHTML = "*";
document.getElementsByTagName("body")[0].appendChild(multiplyBtn);
multiplyBtn.setAttribute("onclick", "typeInLCD(this)");

let divideBtn = document.createElement("button");
divideBtn.innerHTML="/";
document.getElementsByTagName("body")[0].appendChild(divideBtn);
divideBtn.setAttribute("onclick", "typeInLCD(this)");

let addBtn = document.createElement("button");
addBtn.innerHTML="+";
document.getElementsByTagName("body")[0].appendChild(addBtn);
addBtn.setAttribute("onclick", "typeInLCD(this)");

let subtractBtn = document.createElement("button");
subtractBtn.innerHTML="-";
document.getElementsByTagName("body")[0].appendChild(subtractBtn);
subtractBtn.setAttribute("onclick", "typeInLCD(this)");

let equalsBtn = document.createElement("button");
equalsBtn.innerHTML="=";
document.getElementsByTagName("body")[0].appendChild(equalsBtn);
equalsBtn.setAttribute("onclick", "calcExp()");


let clearBtn = document.createElement("button");
clearBtn.innerHTML="Clear all";
document.getElementsByTagName("body")[0].appendChild(clearBtn);
clearBtn.setAttribute("onclick", "clearDisplay()");

function clearDisplay(){
    calculatorLCD.innerHTML = "";
}
