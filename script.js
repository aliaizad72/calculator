//HANDLING the INPUT
    //OUTPUTTING the INPUT on the DISPLAY

//function to CLEAR input DISPLAY
const inputDisplay = document.querySelector('#input-display');
const outputDisplay = document.querySelector('#output-display');

function clearInput () {
    inputDisplay.textContent = '';
    outputDisplay.textContent = '';
}

const clearBtn = document.querySelector('#AC');
clearBtn.addEventListener('click', clearInput);

//function to add text to INPUT display when button is clicked

const inputButtons = document.querySelectorAll('.input-buttons');
inputButtons.forEach((button) => {
    button.addEventListener('click', addInput);
})

function addInput(e) {
    inputDisplay.textContent += `${e.target.textContent}`;
}

//function to delete 1 character from INPUT display
function deleteChar() {
    inputDisplay.textContent = inputDisplay.textContent.slice(0, inputDisplay.textContent.length - 1);
}

const deleteBtn = document.querySelector('#DEL');
deleteBtn.addEventListener('click', deleteChar);

//PROCESSING the INPUT 
function Operation(sign, fn) {
    this.sign = sign;
    this.fn = fn;
};

const add = new Operation('+', (a, b) => a + b);
const subtract = new Operation('-', (a, b) => a - b);
const multiply = new Operation('x', (a, b) => a * b);
const divide = new Operation('/', (a, b) => a / b);
const operations = [add, subtract, multiply, divide];
const equalBtn = document.querySelector('#equal');
equalBtn.addEventListener('click', operate);

//CREATE functions that does mathematical operations on 2 numbers
function operate() {
    const inputStr = inputDisplay.textContent;
    operations.forEach((operation) => {
        if (inputStr.includes(operation.sign)) {
            const inputArr = inputStr.split(operation.sign);
            const numArr = inputArr.map((item) => +item);
            const result = numArr.reduce(operation.fn);
            console.log(result);
            return result;
        }
    })
};
