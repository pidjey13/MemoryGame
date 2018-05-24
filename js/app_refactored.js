// deck of all cards in game
// ==> used for a single evt listener
const deck = document.querySelector(".deck");

// array of cards clicked used to check a match
let clicked_cards = [];

// moves counter incremented after the 2nd click
let moves = 0;

// Function that checks if icon-classes have a match.
// It will be called only after a 2nd click.
function check_suit() {

	/* 
	*  Statement that check if there is a match on the cards' suit,
	*  and if this is the case, adds "match" CSS class,
	*  else "disabled" CSS class is removed in order to give cards that
	*  doesn't match back their "clickability".
	*/
	if (clicked_cards[0].innerHTML == clicked_cards[1].innerHTML) {

		clicked_cards[0].classList.add("match");
		clicked_cards[1].classList.add("match");

		clicked_cards[0].classList.remove("open", "show");
		clicked_cards[1].classList.remove("open", "show");

		// I re-initialize my clicked_cards array which contains
		// cards' icon-classes -- String format.
		clicked_cards = [];

	} else {

		setTimeout(() => {
			
			clicked_cards[0].classList.remove("open", "show");
			clicked_cards[1].classList.remove("open", "show");

			// I re-initialize my clicked_cards array which contains
			// cards' icon-classes -- String format.
			clicked_cards = [];

		}, 500);

		// clicked_cards[0].classList.remove("open", "show");
		// clicked_cards[1].classList.remove("open", "show");

		clicked_cards[0].classList.remove("disabled");
		clicked_cards[1].classList.remove("disabled");
	
	}
}



// Add an evt listener on the deck --- THANKS TO MIKE WALES FOR THE TIP
deck.addEventListener('click', el => {

	// Check if the click has been made on a card and then stores it into
	// a variable which is going to be pushed later in order to be checked
  if (el.target.classList == "card") {

		let card = el.target;
		
		// Now I add this CSS class in order to not having the
		// 2nd-click-on-the-same-card bug
		card.classList.add("disabled", "open", "show");

		clicked_cards.push(card);

		/* 
			*  Check if 2nd click has been made. Then I call the
			*  check_suit function that will start here cause of the 2nd click.
			*  That function will check if icon-classes have a match.
			*/
		if (clicked_cards.length == 2) {

			check_suit();

			document.querySelector(".moves").innerHTML = moves += 1;

		}

	}
	
});




/* --------------------------------------------- */




// // counter for clicks
// let counter = 0;

// // array of cards' suit
// let checkSuit = [];

// // array of cards clicked
// var clicked_cards = [];

// // evt listener on the deck
// deck.addEventListener('click', el => {

// 	//console.log(deck);
// 	//console.log("click");
// 	//console.log(el);
// 	//console.log(el.target);
// 	//console.log(el.target.classList);


// 	/* check if a - ONLY - covered card has been clicked.
// 	* will not work if the click happens on a already flipped one
// 	* because of a value == to "card + otherClass"
// 	*/

// 	let card_value = el.target.classList.value;
// 	let card_suit = el.target.childNodes[1].classList[1];

// 	if (card_value == "card") {
// 		// console.log("card");
// 		// console.log(card_suit);

// 		// I count the 1st click
// 		counter += 1;
// 		// console.log(counter);

// 		let card = el.target;
		
// 		card.classList.add("open", "show");
// 		// console.log(card);

// 		clicked_cards.push(card);
// 		// console.log(clicked_cards);
// 		//console.log("clicked_cards length", clicked_cards.length);

// 		// I push the card suit to check it later if match or not
// 		checkSuit.push(card_suit);
// 		// console.log(checkSuit);

// 		// now I check if a 2nd click has been made
// 		if (counter > 1){
// 			// console.log(checkSuit);
// 			// console.log(checkSuit[1]);

// 			// reset the counter
// 			counter = 0;
// 			//console.log("counter resettato");
// 			//console.log("checkSuit.length", checkSuit.length);
// 			// console.log(typeof card);

// 			// and now the check on the card suit
// 			if (checkSuit[0] == checkSuit[1]) {
// 				// console.log("match");

// 				clicked_cards[0].classList.add("match");
// 				clicked_cards[1].classList.add("match");
// 				// card.classList.add("match");
// 				//console.log(clicked_cards);

// 			} else {

// 				// console.log(card);

// 				setTimeout( () =>  {
// 					//console.log("clicked_cards ", clicked_cards);
// 					clicked_cards[0].classList.remove("open", "show");
// 					clicked_cards[1].classList.remove("open", "show");
// 					//card.classList.remove("open", "show");
// 				}, 200);

// 			}

// 			// reset of my array of cards' suit
// 			checkSuit = [];

// 			// time to reset my clicked cards array.
// 			// without it, it won't work because of the other setTimeou into else
// 			setTimeout(() => {
// 				clicked_cards = [];
// 			}, 700);
// 			//clicked_cards = [];

// 		}

// 	} else {

// 		// console.log("NOPE");

// 	}

// })




/* --------------------------------------------- */




// restart button
const restart = document.querySelector(".restart");

// array-list that holds all of the cards and convert the object into Array
var cards = document.querySelectorAll(".deck .card");
let cardsArray = Array.from(cards);


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
		});
	
		deck.innerHTML = outer;
	}

	reconstructHTML(shuffledDeck);
}