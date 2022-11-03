"use strict";

const score_0_el = document.getElementById("score--0");
const score_1_el = document.getElementById("score--1");
const curr_score_0 = document.getElementById("current--0");
const curr_score_1 = document.getElementById("current--1");

const dice = document.querySelector(".dice");
const btn_new = document.querySelector(".btn--new");
const btn_hold = document.querySelector(".btn--hold");
const btn_roll = document.querySelector(".btn--roll");

const player_0_el = document.querySelector(".player--0");
const player_1_el = document.querySelector(".player--1");

const scores = [0, 0];
let curr_score = 0;
let active_player = 0;
let playing = true;

score_0_el.textContent = 0;
score_1_el.textContent = 0;

dice.classList.add("hidden");

function next_player() {
  curr_score = 0;
  document.getElementById(`current--${active_player}`).textContent = 0;
  active_player = active_player === 0 ? 1 : 0;
  player_0_el.classList.toggle("player--active");
  player_1_el.classList.toggle("player--active");
}

btn_roll.addEventListener("click", function () {
  if (playing) {
    let number = Math.trunc(Math.random() * 6 + 1);
    dice.classList.remove("hidden");
    dice.src = `dice-${number}.png`;
    if (number !== 1) {
      curr_score += number;
      document.getElementById(`current--${active_player}`).textContent =
        curr_score;
    } else {
      next_player();
    }
  }
});

btn_hold.addEventListener("click", function () {
  if (playing) {
    scores[active_player] += curr_score;
    console.log(scores[active_player]);
    document.getElementById(`score--${active_player}`).textContent =
      scores[active_player];

    if (scores[active_player] >= 20) {
      playing = false;
      dice.classList.add("hidden");
      document
        .querySelector(`.player--${active_player}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${active_player}`)
        .classList.remove("player--active");
    } else {
      next_player();
    }
  }
});

btn_new.addEventListener("click", function () {
  window.location.reload();
});
