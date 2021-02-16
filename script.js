'use strict';

// Defining the Dom Elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const inputTarget = document.getElementById('setTargetscore');
const targetScore = document.getElementById('targetScore');
const popUpOverlay = document.getElementById('popUpOverlay');

let scores, currentScore, activePlayer, playing, target;


inputTarget.addEventListener('input', updateValue);
function updateValue(e) {
  target  = targetScore.textContent = e.target.value;
  console.log(target);
}
// Start Conditions
const init = function() {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
}
init();

const switchPlayer = function() {
      // Swwiching player
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      currentScore = 0;
      activePlayer = activePlayer === 0 ? 1 : 0;
      player0El.classList.toggle('player--active');
      player1El.classList.toggle('player--active');
};

// Functionality for Rolling The Dice
btnRoll.addEventListener('click', function() {
  if (playing) {
    // The Dice Roll
    const dice = Math.trunc(Math.random()*6)+1;
    // Display the Number Rolled
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    // Check the Roll for number 1
    if(dice !== 1) {
      // add to the current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else {
      // Rolled 1, initialize active player
      document.getElementById(`score--${activePlayer}`).textContent = 0;
      scores[activePlayer] = 0;
      currentScore = 0;
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function() {
  if (playing) {
    // Add current score to active player
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

    // Check if => 100
    if(scores[activePlayer] >= target) {
      playing = false;
      diceEl.classList.add('hidden');
      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
      document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

// New Game
btnNew.addEventListener('click', init);


// Info Question Mark
var Alert = new CustomAlert();

function CustomAlert(){
  this.render = function(){
      //Show Modal
      let popUpBox = document.getElementById('popUpBox');
      popUpBox.style.display = "block";
      let popUpOverlay = document.getElementById('popUpOverlay');
      popUpOverlay.style.display = "block";
      //Close Modal
      document.getElementById('closeModal').innerHTML = '<button onclick="Alert.ok()">OK</button>';
      popUpOverlay.addEventListener('click', this.ok);
  }
  
  this.ok = function(){
    document.getElementById('popUpBox').style.display = "none";
    document.getElementById('popUpOverlay').style.display = "none";
  }
}