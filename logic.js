'use strict';
let allCards = import ('./cards');
const GENERAL_SCORE_MODIFIER = 2; // for adding strength to the next card because of the General
let roundWorth = 1; // how many points go to the victor of the round
let gameEnd = false;

let p1 = {
	cards: allCards,
	score: 0,
	winner: false,
	generalPlayed: false,
	cardPlayed: null,
	playsFirst: false
}

let p2 = {
	cards: allCards,
	score: 0,
	winner: false,
	generalPlayed: false,
	cardPlayed: null,
	playsFirst: false
}

function init(){
	while (!gameEnd) {
		checkWinner();
		playRound();
	}
}

function playRound() {
	if ((p1.cardPlayed === p2.cardPlayed) ||
	    (p1.cardPlayed.name === "Jester" && p2.cardPlayed.name !== "Wizard") ||
	    (p2.cardPlayed.name === "Jester" && p1.cardPlayed.name !== "Wizard")) {
		roundWorth ++
	} else {
		switch(p1.cardPlayed.name){
			case "Jester":
				jesterPlayed();
				break;

			case "Princess":
				princessPlayed();
				break;

			case "Spy":
				spyPlayed();
				break;

			case "Assassin":
				assassinPlayed();
				break;

			case "Minister":
				ministerPlayed();
				break;

			case "Wizard":
				wizardPlayed();
				break;

			case "General":
				generalPlayed();
				break;

			case "Prince":
				princePlayed();
				break;
		}

		checkWinner();
	}
}

//-------------------------------- Card Logic --------------------------------//

function jesterPlayed() {
	if (p2.cardPlayed.name === "Wizard") {
		p2.score++;
	} else {
		roundWorth++;
	}
}

function princessPlayed() {
	if (p2.cardPlayed.name === "Prince") {
		p1.winner = true;
	} else {
		addScore(p2);
	}
}

function spyPlayed() {
	if (p2.cardPlayed.name === "Jester") {
		roundWorth++;
		return;
	} else if (p2.cardPlayed.name !== "Wizard") {
		p2.playsFirst = true;
	}

	if (p2.cardPlayed.name === "Princess") {
		addScore(p1);
	} else {
		addScore(p2);
	}
}

//-------------------------------- Utilities ---------------------------------//

function addScore(player) {
	player.score += roundWorth;
	roundWorth = 1;
}

function checkWinner() {
	if (p1.score >= 4) {
		alert('Player 1 wins!');
		gameEnd = true;
	} else if (p2.score >= 4) {
		alert('Player 2 wins!');
		gameEnd = true;
	}
}
