const buttonColours = ['red', 'blue', 'green', 'yellow'];
let gamePattern = [];
const allBtns = $('.btn');
let userClickedPattern = [];
let level = 0;


// Generate a number between 0 and 4
function nextSequence() {
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    
    console.log('Game Pattern: ' + gamePattern);

    // Update Title
    level++;
    $('h1').text('Level ' + level);

    // Animation + Sound for Game Pattern
    for (let i = 0; i < gamePattern.length; i++) {
        setTimeout(function() {
            // Animation
            animateBtn(gamePattern[i]);
    
            // Sound
            playSound(gamePattern[i]);
        }, i * 500);
    }

}


// Event listener when user clicks on a button
for (let i = 0; i < allBtns.length; i++) {
    allBtns[i].addEventListener('click', function() {
        let userChosenColour = allBtns[i].id;
        userClickedPattern.push(userChosenColour);
        playSound(userChosenColour);
        animatePress(userChosenColour);

        // If user fails the round
        if (!checkAnswer() && gamePattern.length != 0) {
            startOver();
            return;
        }

        // If user passes the round
        if (userClickedPattern.length == level) {
            userClickedPattern.splice(0, userClickedPattern.length);
            setTimeout(nextSequence, 1000);
        }

    });
}

function playSound(name) {
    let sound = new Audio('./sounds/' + name + '.mp3');
    sound.play();
}

function animateBtn(colour) {
    let animate = $('#' + colour);
    animate.fadeOut(100).fadeIn(100);
}

// Animation for when user clicks on the buttons
function animatePress(currentColour) {
    $('#' + currentColour).addClass('pressed');
    setTimeout(function() {
        $('#' + currentColour).removeClass('pressed')
    }, 100);
}


// Start first round
$(document).keypress(function() {
    if (gamePattern.length == 0) {
        userClickedPattern.splice(0, userClickedPattern.length);    // in case user clicks on buttons before starting the round
        setTimeout(nextSequence, 500);
    }
})

$('#level-title').click(function() {
    if (gamePattern.length == 0) {
        userClickedPattern.splice(0, userClickedPattern.length);    // in case user clicks on buttons before starting the round
        setTimeout(nextSequence, 500);
    }
})

function checkAnswer() {
    for (let i = 0; i < userClickedPattern.length; i++) {
        if (userClickedPattern[i] != gamePattern[i]) {
            return false;
        }
    }
    return true;
}

function startOver() {
    playSound('wrong');
    $('body').addClass('game-over');
    setTimeout(function() {
        $('body').removeClass('game-over');
    }, 200);
    userClickedPattern.splice(0, userClickedPattern.length);
    gamePattern.splice(0, gamePattern.length);
    level = 0;
    $('h1').text('Game Over, Press Any Key to Restart');
}