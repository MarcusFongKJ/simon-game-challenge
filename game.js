const buttonColours = ['red', 'blue', 'green', 'yellow'];
const gamePattern = [];

// Generate a number between 0 and 4
function newSequence() {
    let randomNumber = Math.floor(Math.random() * 4);
    return randomNumber;
}

// Initialise initial color to display
let randomChosenColour = buttonColours[newSequence()];
gamePattern.push(randomChosenColour);

