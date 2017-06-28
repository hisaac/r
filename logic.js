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

(function init(){
	while (!gameEnd) {
		checkWinner();
		checkPlaysFirst();
		playRound();
	}
})();

function playRound() {
	checkGeneral();

	if (p1.cardPlayed.name === p2.cardPlayed.name) {
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
	}
}

//-------------------------------- Card Logic --------------------------------//

function jesterPlayed() {
	if (p2.cardPlayed.name === "Wizard") {
		addScore(p2);
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
	if (p2.cardPlayed.name !== "Wizard") {
		p2.playsFirst = true;
	}

	if (p2.cardPlayed.name === "Princess") {
		addScore(p1);
	} else {
		addScore(p2);
	}
}

function assassinPlayed() {
	if (p2.cardPlayed.strength > p1.cardPlayed.strength) {
		addScore(p1);
	} else {
		addScore(p2);
	}
}

function ministerPlayed() {
	if (p1.cardPlayed.strength > p2.cardPlayed.strength) {
		addScore(p1);
		addScore(p1);
	} else {
		addScore(p2);
	}
}

function wizardPlayed() {
	if (p1.cardPlayed.strength > p2.cardPlayed.strength) {
		addScore(p1);
	} else {
		addScore(p2);
	}
}

function generalPlayed() {
	if (p2.cardPlayed.name !== "Wizard") {
		p1.generalPlayed = true;
	}

	if (p1.cardPlayed.strength > p2.cardPlayed.strength) {
		addScore(p1);
	} else {
		addScore(p2);
	}
}

function princePlayed() {
	if (p2.cardPlayed.name === "Princess") {
		p2.winner === true;
	} else {
		addScore(p1);
	}
}

//-------------------------------- Utilities ---------------------------------//

function addScore(player) {
	player.score += roundWorth;
	roundWorth = 1;
}

function checkPlaysFirst() {}

function checkWinner() {
	if (p1.score >= 4) {
		alert('Player 1 wins!');
		gameEnd = true;
	} else if (p2.score >= 4) {
		alert('Player 2 wins!');
		gameEnd = true;
	}
}

function checkGeneral() {
	if (p1.generalPlayed) {
		p1.cardPlayed.strength += 2;
	}

	if (p2.generalPlayed) {
		p2.cardPlayed.strength += 2;
	}
}
