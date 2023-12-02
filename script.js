const inputDisplay = document.querySelector('#input-display');
const outputDisplay = document.querySelector('#output-display');

clearInput(); //clearing INPUT div so it does not return weird text with spaces and newlines

function clearInput () {
    inputDisplay.textContent = '';
    outputDisplay.textContent = '';
}

const clearBtn = document.querySelector('#AC');
clearBtn.addEventListener('click', clearInput);

const inputButtons = document.querySelectorAll('.input-buttons');
const mathButtons = document.querySelectorAll('.math-buttons');

inputButtons.forEach((button) => {
    button.addEventListener('click', addInput);
});

mathButtons.forEach((button) => {
    button.addEventListener('click', addMathInput);
});

function addInput(e) {
    inputDisplay.textContent += `${e.target.textContent}`;
}

function addMathInput(e) {
    if (outputDisplay.textContent) {
        inputDisplay.textContent = outputDisplay.textContent + `${e.target.textContent}`;
        outputDisplay.textContent = '';
    } else {
        inputDisplay.textContent += `${e.target.textContent}`;
    }
}

function deleteChar() {
    inputDisplay.textContent = inputDisplay.textContent.slice(0, inputDisplay.textContent.length - 1);
}

const deleteBtn = document.querySelector('#DEL');
deleteBtn.addEventListener('click', deleteChar);

function Operation(sign, fn) {
    this.sign = sign;
    this.fn = fn;
};//creating the MATH OPERATION function this way in order to use it with arrays and the convenient method 'reduce'

const add = new Operation('+', (a, b) => a + b);
const subtract = new Operation('-', (a, b) => a - b);
const multiply = new Operation('x', (a, b) => a * b);
const divide = new Operation('/', (a, b) => a / b);
const multiplyNegative = new Operation('x-', (a, b) => -a*b);
const divideNegative = new Operation('/-', (a, b) => -1*(a/b))
const operations = [multiply, divide, multiplyNegative, divideNegative, add, subtract]; //putting the MATH objects in array to make it easier to iterate which 'sign' is used in the INPUT

const equalBtn = document.querySelector('#equal');
equalBtn.addEventListener('click', operate);

function operate() {
    let inputStr = inputDisplay.textContent;
    if (outputDisplay.textContent) {
        inputDisplay.textContent = outputDisplay.textContent;
        outputDisplay.textContent = '';
    } else {
        if (inputStr.includes('(') || inputStr.includes(')')) {
            let startInd;
            let endInd;
            let calcStr = '';
            const inputArr = inputStr.split('');
            //loopCount to make sure that the loop runs as much as there are brackets in the INPUT
            const loopCount = inputArr.filter((item) => item === '(').length;
    
    
            //using j instead of i because in the function calculate i is being reduce everytime there is a multiplication or division
            for (j = 0; j < loopCount; j++) {
                if (j === 0) {
                    //calculating the result of the str inside the bracket and passing it back into the input str
                    startInd = inputArr.indexOf('(');
                    endInd = inputArr.indexOf(')');
                    const subCalcStr = inputArr.slice(startInd+1, endInd).join('');
                    const deleteCount = inputArr.slice(startInd, endInd+1).length
                    const result = calculate(subCalcStr); 
                    inputArr.splice(startInd, deleteCount, result);
                    calcStr = inputArr.join('');
                } else {
                    //if there is more than one bracket, the new str that was produced above needs to be split instead of the input str
                    const calcArr = calcStr.split('');
                    startInd = calcArr.indexOf('(');
                    endInd = calcArr.indexOf(')');
                    const subCalcStr = calcArr.slice(startInd+1, endInd).join('');
                    const deleteCount = calcArr.slice(startInd, endInd+1).length
                    const result = calculate(subCalcStr);
                    calcArr.splice(startInd, deleteCount, result);
                    calcStr = calcArr.join('');
                }
            }
            if (Number.isNaN(calculate(calcStr))) {
                outputDisplay.textContent = 'ERROR!'
            } else {
                outputDisplay.textContent = calculate(calcStr);
            }
        } else {
            if (Number.isNaN(calculate(inputStr))) {
                outputDisplay.textContent = 'ERROR!'
            } else {
                outputDisplay.textContent = calculate(inputStr);
            }
        }
    }
};

function calculate (str) {
    const signs = operations.map((item) => item.sign);
    //checking for two signs in a row
    const strArr = str.split('');
    strArr.forEach((item, index) => {
        if (signs.includes(item)) {
            if (item === strArr[index + 1]) {
                if (item === '+') {
                    strArr.splice(index, 1);
                } else if (item === '-') {
                    strArr.splice(index, 2, '+');
                } else {
                    strArr.splice(index, 1, 'errrrrrrorrrrr');
                }
            } else if (item != strArr[index + 1]) {
                if ((item === 'x' || item === '/') && strArr[index + 1] === '+') {
                    strArr.splice(index + 1, 1);
                } else if (item === '-' && strArr[index + 1 ] === '+') {
                    strArr.splice(index + 1, 1);
                }
            }
        }
    })
    str = strArr.join('');

    //a verbose way of splitting the str argument because I dont know regex 
    const inputArr = str.split('x-').join(',').split('/-').join(',').split('+').join(',').split('-').join(',').split('x').join(',').split('/').join(',').split(',');
    const numArr = inputArr.map((item) => +item);
    let opArr = str.split('').filter((item) => signs.includes(item));
    //make sure that division and multiplication by negative number sign registers on opARR
    opArr.forEach((item, index) => {
        if (opArr.length === numArr.length) {
            if (item === 'x' && opArr[index+1] === '-') {
                opArr.splice(index, 2, 'x-');
            } else if (item === '/' && opArr[index+1] === '-') {
                opArr.splice(index, 2, '/-');
            }
        }
    })
    let opFn;
    let aboveLoopCount = 0; //this is to offset the i val in the loop to be 0 so that the addition or subtraction algo can run properly
    for (i = 0; i < opArr.length; i++) {
        //making sure that multiplication or division is conducted first
        if (opArr.includes('x') || opArr.includes(`/`) || opArr.includes('x-') || opArr.includes('/-')) {
            if (opArr[i] === 'x' || opArr[i] === '/' || opArr[i] === 'x-' || opArr[i] === '/-') {
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
                i = -1; //after deleting the element of opArr above, the i value must be decremented to -1 so when the loop iterates it becomes 0
            }
        } else {
            //because we delete multiplication and division signs from opArr, the addition or subtraction will automatically move to index 0, so we must reset the loopcount to 0
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
    let answer = numArr[0];
    if (!Number.isInteger(answer)) {
        answer = roundDecimals(answer);
        return answer;
    }  else {
        return answer;
    }
}

function roundDecimals(number) {
    if (number === Infinity) {
        return number;
    }
    
    const decVal = number.toString().split('.');
    if (decVal[1].length > 8) {
        decVal[1] = decVal[1].substr(0, 9);
    }
    return +decVal.join('.');
}