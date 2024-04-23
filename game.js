const buttonColours = ['red', 'blue', 'green', 'yellow'];
let gamePattern = [];
const allBtns = $('.btn');
let userClickedPattern = [];


// Generate a number between 0 and 4
function newSequence() {
    let randomNumber = Math.floor(Math.random() * 4);
    return randomNumber;
}

// Initialise initial color to display
let randomChosenColour = buttonColours[newSequence()];
gamePattern.push(randomChosenColour);

// Flash the color
let display = $('#' + randomChosenColour);
display.fadeOut(100).fadeIn(100);

// Display color sound
playSound(randomChosenColour);


// Event listener when user clicks on a button
for (let i = 0; i < allBtns.length; i++) {
    allBtns[i].addEventListener('click', function() {
        let userChosenColour = allBtns[i].id;
        userClickedPattern.push(userChosenColour);
        playSound(userChosenColour);
        console.log(userClickedPattern);    //to remove
    });
}

function playSound(name) {
    let sound = new Audio('./sounds/' + name + '.mp3');
    sound.play();
}