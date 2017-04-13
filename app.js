/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
// my global scope variables
var scores, roundScore, activePlayer, gameplaying;

init();

var lastDice;


//click event triggers anonymous function w/no name
document.querySelector('.btn-roll').addEventListener('click', function() {
    //gamePlaying var is already set to true
    if (gamePlaying) {
        //need random number
        var dice = Math.floor(Math.random() * 6) + 1;
        // var dice2 = Math.floor(Math.random() * 6) + 1;

        //display result

        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';

        //concats the name in html w/the number picked in dice variable
        diceDOM.src = 'dice-' + dice + '.png';
        // rolls two 6s
        if (dice === 6 && lastDice === 6) {
            //lose score
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = '0';
            nextPlayer();

            //Update roundScore if 1 was not rolled
        } else if (dice !== 1) {
            //add score, same as roundScore = roundScore + dice.  .textContent is a method
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            //next player
            nextPlayer();

        }
        // the value of dice is stored in new var 
        lastDice = dice;
    }
});

//hold button
document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        //add current score to global
        scores[activePlayer] += roundScore;
        //update UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        var input = document.querySelector('.final-score').value;
        var winningScore;

        // if input is undefined, 0, null, or empty string " ", automatically coerced to FALSE
        // this says if input is true
        if (input) {
            var winningScore = input;
        } else {
            winningScore = 20;
        }

        //Check who won 
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = "Winner!";
            document.querySelector('.dice').style.display = 'none';
            //add the css class already created
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }

});
//create this function so we do not repeat code
function nextPlayer() {
    //next player, with ternary operators. then is ?, else is :
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    //same as 
    // if (activePlayer === 0) {
    // activePalyer =1;
    //} else {
    //activePlayer = 0;
    //}
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    //removing adding classes, active class, from html
    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');
    //better with toggle

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    //makes dice disapear when rolls 1
    document.querySelector('.dice').style.display = 'none';
    // document.querySelector('.dice2').style.display = 'none';
}
document.querySelector('.btn-new').addEventListener('click', function() {
    init();

});

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    document.querySelector('.dice').style.display = 'none';
    // document.querySelector('.dice2').style.display = 'none';

    //Sets all the numbers to 0, getElementById is faster than query (does same thing)
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


