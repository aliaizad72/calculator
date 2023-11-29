//HANDLING the INPUT
    //OUTPUTTING the INPUT on the DISPLAY
//function to CLEAR input DISPLAY
const inputDisplay = document.querySelector('#input-display');
const outputDisplay = document.querySelector('#output-display');
clearInput();

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
const operations = [multiply, divide, add, subtract];
const equalBtn = document.querySelector('#equal');
equalBtn.addEventListener('click', operate);

//CREATE functions that does mathematical operations on 2 numbers
function operate() {
    const inputStr = inputDisplay.textContent;
    const signs = operations.map((item) => item.sign);
    const inputArr = inputStr.split('+').join(',').split('-').join(',').split('x').join(',').split('/').join(',').split(',');
    const numArr = inputArr.map((item) => +item);
    //count how many times is there an operation
    const opArr = inputStr.split('').filter((item) => signs.includes(item));
    let opFn;
    let aboveLoopCount = 0;
    for (i = 0; i < opArr.length; i++) {
        if (opArr.includes('x') || opArr.includes(`/`)) {
            if (opArr[i] === 'x' || opArr[i] === '/') {
                operations.forEach((item) => {
                    if (item.sign === opArr[i]) {
                        opFn = item.fn;
                    }
                })

                const calcArr = [numArr[i], numArr[i+1]];
                const result = calcArr.reduce(opFn);
                numArr.splice(i, 2 ,result);
                opArr.splice(i, 1);
                aboveLoopCount++;
                i--; //where the magic happens
            }
        } else {
            if (aboveLoopCount > 0) {
                i = 0;
                aboveLoopCount = 0;
            }
            operations.forEach((item) => {
                if (item.sign === opArr[i]) {
                    opFn = item.fn;
                }
            })
            
            const calcArr = [numArr[0], numArr[1]];
            const result = calcArr.reduce(opFn);
            numArr.splice(0, 2, result);
        }
    }
    console.log( numArr[0]);
};
