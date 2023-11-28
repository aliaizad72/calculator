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
deleteBtn.addEventListener('click', deleteChar)