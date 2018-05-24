// deck of all cards in game
const deck = document.querySelector(".deck");

// restart button
const restart = document.querySelector(".restart");

// array-list that holds all of the cards and convert the object into Array
var cards = document.querySelectorAll(".deck .card");
let cardsArray = Array.from(cards);

// counter for clicks
let counter = 0;

// array of cards' suit
let checkSuit = [];

// array of cards clicked
var clicked_cards = [];

// evt listener on the deck
deck.addEventListener('click', el => {

	//console.log(deck);
	//console.log("click");
	//console.log(el);
	//console.log(el.target);
	//console.log(el.target.classList);


	/* check if a - ONLY - covered card has been clicked.
	* will not work if the click happens on a already flipped one
	* because of a value == to "card + otherClass"
	*/

	let card_value = el.target.classList.value;
	let card_suit = el.target.childNodes[1].classList[1];

	if (card_value == "card") {
		// console.log("card");
		// console.log(card_suit);

		// I count the 1st click
		counter += 1;
		// console.log(counter);

		let card = el.target;
		
		card.classList.add("open", "show");
		// console.log(card);

		clicked_cards.push(card);
		// console.log(clicked_cards);
		console.log("clicked_cards length", clicked_cards.length);

		// I push the card suit to check it later if match or not
		checkSuit.push(card_suit);
		// console.log(checkSuit);

		// now I check if a 2nd click has been made
		if (counter > 1){
			// console.log(checkSuit);
			// console.log(checkSuit[1]);

			// reset the counter
			counter = 0;
			//console.log("counter resettato");
			//console.log("checkSuit.length", checkSuit.length);
			// console.log(typeof card);

			// and now the check on the card suit
			if (checkSuit[0] == checkSuit[1]) {
				// console.log("match");

				clicked_cards[0].classList.add("match");
				clicked_cards[1].classList.add("match");
				// card.classList.add("match");
				//console.log(clicked_cards);

			} else {

				// console.log(card);

				setTimeout( () =>  {
					//console.log("clicked_cards ", clicked_cards);
					clicked_cards[0].classList.remove("open", "show");
					clicked_cards[1].classList.remove("open", "show");
					//card.classList.remove("open", "show");
				}, 200);

			}

			// reset of my array of cards' suit
			checkSuit = [];

			// time to reset my clicked cards array.
			// without it, it won't work because of the other setTimeou into else
			setTimeout(() => {
				clicked_cards = [];
			}, 700);
			//clicked_cards = [];

		}

	} else {

		// console.log("NOPE");

	}

})



// START THE GAME
window.onload = startGame();

// restart button CLICK LISTENER
restart.addEventListener('click', () => {
	startGame();
});

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

	return array;
}

function startGame() {
	var shuffledDeck = shuffle(cardsArray);
	
	let outer = "";
	var reconstructHTML = () => {
		shuffledDeck.forEach(card => {
			outer += card.outerHTML;
			// this.addEventListener('click', function(){
			// 	console.log("click");
			// })
		});
	
		deck.innerHTML = outer;
	}

	reconstructHTML(shuffledDeck);
}



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