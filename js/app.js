// deck of all cards in game
const deck = document.querySelector(".deck");
// console.log(typeof deck);
// console.log(deck);

// array-list that holds all of the cards and convert the object into Array
var cards = document.querySelectorAll(".deck .card");
let cardsArray = Array.from(cards);
// console.log(cardsArray.length);

// var pippo = function() {
// 	cardsArray.forEach(card => {
// 		console.log(card.outerHTML);
// 	});
// }

// pippo();

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
	var currentIndex = array.length, temporaryValue, randomIndex;

	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
	// console.log("array.length");
	// console.log(array.length);
	return array;
}

function startGame() {

	var shuffledDeck = shuffle(cardsArray);
	// console.log(shuffledDeck);
	// console.log(typeof shuffledDeck);
	
	let outer = "";
	var reconstructHTML = function(){
		shuffledDeck.forEach(card => {
			// console.log(card.outerHTML);
			// console.log(typeof card.outerHTML);
			outer = outer + card.outerHTML;
		});
	
		deck.innerHTML = outer;
	}

	reconstructHTML(shuffledDeck);

	// Array.from(deck.children).forEach((card, index) => {
	// 	console.log(typeof deck);

	// 	var carta = card.outerHTML;
	// 	console.log(carta);
	// 	console.log(typeof carta);

	// 	deck.appendChild(carta);
	// 	// https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild
	// });

	// for (let card in shuffledDeck) {
	// 	// console.log(typeof deck);
	// 	// console.log(typeof shuffledDeck);
	// 	console.log(card);
	// 	// console.log(typeof card);
	// 	// console.log(card.outerHTML);

	// 	deck.appendChild(carta);
	// 	// https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild
	// }

}






























// function startGame() {
// 	var shuffledCards = shuffle(cardsArray);
// 	for (var i = 0; i < shuffledCards.length; i++) {
// 		[].forEach.call(shuffledCards, function (item) {
// 			deck.appendChild(item);
// 			// console.log(item);
// 			// console.log(array.length);
// 		});
// 	}
// }

// START THE GAME
window.onload = startGame();



/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */