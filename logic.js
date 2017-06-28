(function(){
'use strict';

//----------------------------- Global Variables -----------------------------//

const ALL_CARDS = {
	jester: {
		name: "Jester",
		strength: 0,
		ability: "This round is a draw and carried over to the next."
	},
	princess: {
		name: "Princess",
		strength: 1,
		ability: "If your opponent played the Prince, you win the game."
	},
	spy: {
		name: "Spy",
		strength: 2,
		ability: "Next round, your opponent reveals their card first."
	},
	assassin: {
		name: "Assassin",
		strength: 3,
		ability: "The lowest strength card wins."
	},
	minister: {
		name: "Minister",
		strength: 4,
		ability: "Winning with this card counts as 2 victories."
	},
	wizard: {
		name: "Wizard",
		strength: 5,
		ability: "Cancels the special power of your opponent's card."
	},
	general: {
		name: "General",
		strength: 6,
		ability: "Your next card gets +2 strength."
	},
	prince: {
		name: "Prince",
		strength: 7,
		ability: "You win the round."
	}
};

let roundWorth = 1;
let gameEnd = false;

let p1 = {
	cards: ALL_CARDS,
	score: 0,
	winner: false,
	generalPlayed: false,
	cardPlayed: {},
	playsFirst: false
};

let p2 = {
	cards: ALL_CARDS,
	score: 0,
	winner: false,
	generalPlayed: false,
	cardPlayed: {},
	playsFirst: false
};

//------------------------------ Game Functions ------------------------------//

function init() {
	let p1Card = document.querySelector('input[name="p1CardPlayed"]:checked').value;
	let p2Card = document.querySelector('input[name="p2CardPlayed"]:checked').value;

	p1.cardPlayed = p1.cards[p1Card];
	p2.cardPlayed = p2.cards[p2Card];

	if (!gameEnd) {
		checkWinner();
		checkPlaysFirst();
		playRound();
	} else if (gameEnd && p1.winner) {
		alert('Player 1 wins!');
	} else if (gameEnd && p2.winner) {
		alert('Player 2 wins!');
	}

	document.getElementById('p1Form').reset();
	document.getElementById('p2Form').reset();
}

function playRound() {
	checkGeneral();

	if (p1.cardPlayed.name === p2.cardPlayed.name) {
		roundWorth++;
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
		p2.winner = true;
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

})();
