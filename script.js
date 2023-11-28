//HANDLING the INPUT
    //OUTPUTTING the INPUT on the DISPLAY

//function to CLEAR input DISPLAY
function clearInput () {
    const inputDisplay = document.querySelector('#input-display');
    const outputDisplay = document.querySelector('#output-display');
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
    console.log(e.target.textContent);
}