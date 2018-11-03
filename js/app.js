/*
Developer: Emeka Augustine
Contact: cafafanscoders@gmail.com
Company: Cafafans Nig. Ltd

*/

var scores, roundScore, activePlayer, dice, gamePlaying;

//call the init function
init();

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    //hide the dice by default
    document.querySelector('.dice').style.display = "none";

    document.getElementById('score-0').textContent = '0'; 
    document.getElementById('score-1').textContent = '0'; 
    document.getElementById('current-0').textContent = '0'; 
    document.getElementById('current-1').textContent = '0'; 
    document.getElementById('name-0').textContent = "Player 1";
    document.getElementById('name-1').textContent = "Player 2";
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

// The function to get a random number; 
// both min and max inclusive
function getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Next Player function
function nextPlayer() {
    //next player using ternary operator
    (activePlayer === 0) ? activePlayer = 1: activePlayer = 0;
    roundScore = 0;
    //update the roundScore in the DOM
    document.getElementById('current-0').textContent = roundScore; 
    document.getElementById('current-1').textContent = roundScore; 

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    //hide the dice
    document.querySelector('.dice').style.display = "none";
}

//add event listener to btn-roll 
document.querySelector('.btn-roll').addEventListener('click', function() {
    //check if the game is playing
    if (gamePlaying) {
        //run some code here
        //1. when a player click the btn; get the random number
        dice = getRandomNumber(1, 6);
        document.querySelector('#current-' + activePlayer).textContent = dice;
        //2. display the result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = "block";
        diceDOM.src = "images/dice-" + dice + ".png";
        //3. update the round score IF the rolled number is not 1
        if (dice !== 1) {
            //update the roundscore
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            //next player using ternary operator
            nextPlayer();
        }
    }

});


//add event listener to btn-hold
document.querySelector('.btn-hold').addEventListener('click', function() {
    //check if the game is playing
    if (gamePlaying) {
        //1. add current score to the global score
        scores[activePlayer] += roundScore;
        //2. Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer]; 
        //3. Check if the current user have upto 100 in the global score
        if (scores[activePlayer] >= 100) {
            document.querySelector('#name-' + activePlayer).textContent = "Winner!";
            document.querySelector('.dice').style.display = "none";
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            //next player
            nextPlayer();
        }
    }
});


//add event listerner to btn-new
document.querySelector('.btn-new').addEventListener('click', init);


