'use strict';

// Defining the Dom Elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNem = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Start Conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;

// Functionality for Rolling The Dice
btnRoll.addEventListener('click', function() {
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
    console.log(currentScore);
  } else {
    document.getElementById(`score--${activePlayer}`).textContent = 0;
    // Swwiching player
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
  }
});

btnHold.addEventListener('click', function() {
  console.log(currentScore);
  // Add current score to active player
  scores[activePlayer] += currentScore;
  console.log(scores[activePlayer]);
  document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

  // Check if => 100
  if(scores[activePlayer] >= 20) {
    diceEl.classList.add('hidden');
    document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
  } else {
    // Switching player
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
  }
});