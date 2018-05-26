// deck of all cards in game
// ==> used for a single evt listener
const deck = document.querySelector(".deck");

// restart button
const restart = document.querySelector(".restart");

// array-list that holds all of the cards and convert the object into Array
const cards = document.querySelectorAll(".deck .card");
let cardsArray = Array.from(cards);

// array of cards clicked used to check for a match
let clicked_cards = [];

// moves counter incremented after the 2nd click
let moves = 0;

// array-list that holds all of the stars
const stars = document.querySelectorAll(".stars .fa-star");

// game timer
let second = 0;
let minute = 0;
let interval;
let timer = document.querySelector(".timer");


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

// function that will shuffle the deck of cards
// by shuffling cards' suits
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

// Function that checks if icon-classes have a match.
// It will be called only after a 2nd click.
function check_suit() {
	/* 
	*  Statement that checks if there is a match on the cards' suit,
	*  and if it's the case, adds "match" CSS class,
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
		
		clicked_cards[0].classList.remove("disabled");
		clicked_cards[1].classList.remove("disabled");
		
	}
}

// Function to start the game timer
function startTimer() {
	interval = setInterval(function () {
		timer.innerHTML = minute + " mins " + second + " secs";
		second++;
		
		if (second == 60) {
			minute++;
			second = 0;
		}
	}, 1000);
}


/* 
*  Restart button CLICK LISTENER
*  After the user click on the restart btn, startGame will be fired.
*  startGame() will shuffle the cards.
*  moves counter back to 0 and uploaded the DOM.
*/
restart.addEventListener('click', () => {
	
	stars[0].classList.remove("hidden_stars");
	stars[1].classList.remove("hidden_stars");
	stars[2].classList.remove("hidden_stars");

	moves = 0;
	document.querySelector(".moves").innerHTML = moves;

	clicked_cards = [];

	clearInterval(interval);
	second = 0;
	minute = 0;
	timer.innerHTML = minute + " mins " + second + " secs";

	startGame();

});

// Add an evt listener on the deck --- THANKS TO MIKE WALES FOR THE TIP
deck.addEventListener('click', el => {
	
	// Check if the click has been made on a card and then stores it into
	// a variable which is going to be pushed later in order to be checked
	if (el.target.classList == "card" || el.target.parentNode.classList == "card") {

		let card;
		
		if (el.target.classList == "card") {
			card = el.target;
		} else {
			card = el.target.parentNode;
		}

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

			document.querySelector(".moves").innerHTML = moves += 1;
		
			// if statement on moves to control the start of the timer
			// and the decrement of the stars
			if (moves == 1) {
				startTimer();
			} else if (moves == 11) {
				stars[2].classList.add("hidden_stars");
			} else if (moves == 16) {
				stars[1].classList.add("hidden_stars");
			} else if (moves == 22) {
				stars[0].classList.add("hidden_stars");
			}
			
			check_suit();
		
		}

	}
	
});


// IT'S TIME TO PLAY THE GAME (cit.)
window.onload = startGame();