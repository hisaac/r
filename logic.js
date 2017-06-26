'use strict';

let allCards = import('./cards');
const GENERAL_SCORE_MODIFIER = 2; // for adding strength to the next card because of the General
let pointsOnHold = 0; // how many points go to the victor of the round

let player1 = {
	cards: allCards,
	score: 0,
	winner: false,
	generalPlayed: false,
	cardPlayed: null
}

let player2 = {
	cards: allCards,
	score: 0,
	winner: false,
	generalPlayed: false,
	cardPlayed: null
}

function cardsPlayed(p1Card, p2Card){
	if(p1Card === p2Card){
		pointsOnHold++;
	}
}
