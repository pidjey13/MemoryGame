/* VARIABLES */


// deck of all cards in game
// ==> used for a single evt listener
const deck = document.querySelector('.deck');

// restart button
const restart = document.querySelector('.restart');

// array-list that holds all of the cards and convert the object into Array
const cards = document.querySelectorAll('.deck .card');
let cardsArray = Array.from(cards);

// array of clicked cards
// ==> used to check for a match
let clicked_cards = [];

// list of all cards that have 'match' class
let matchedCards = document.getElementsByClassName('match');

// array-list that holds all of the stars
const stars = document.querySelectorAll('.stars .fa-star');

// moves counter incremented after the 2nd click
let moves = 0;

// game timer
let timer;
let minutes = document.querySelector('#minutes');
let seconds = document.querySelector('#seconds');

// new Game panel with swal (Sweet Alert)
let swal_NewGame = () => {
	swal({
		title: '🎲 New Game started! 🎲',
		icon: 'success',
		button: false,
		text: 'Good Luck 🍀'
	})
};


/* FUNCTIONS */


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

// Function that starts a new game will shuffle the deck of cards
// by shuffling cards' suits
function startGame() {

	let shuffledDeck = shuffle(cardsArray);
	let outer = '';

	const reconstructHTML = () => {
		shuffledDeck.forEach(card => {
			outer += card.outerHTML;
		});
		
		deck.innerHTML = outer;
	};
	
	reconstructHTML(shuffledDeck);

	// Reset my stars rating
	for (var i = 0; i < stars.length; i++) {
		stars[i].classList.remove('hidden_stars');
	}

	// Reset my moves counter
	moves = 0;
	document.querySelector('.moves').innerHTML = moves;

	// Reset my array of clicked cards
	clicked_cards = [];

	// Reset my timer
	clearInterval(timer);
	minutes.innerHTML = 0;
	seconds.innerHTML = 0;

}

// Function that checks if icon-classes have a match.
// It will be called only after a 2nd click.
function check_suit() {
	/* 
	*  Statement that checks:
	*  - if there is a match on the cards' suit,
	*  	 and if it's the case:
	*		 - adds 'match' CSS class to both cards clicked;
	*		 - checks with congratulations() if the game is finished;
	*		 - removes 'open' & 'show' CSS classes;
	*		 - resets the array of clicked cards;
	*
	*  - else, it:
	*    - adds 'wrong' CSS class to both cards clicked;
	*		 - removes 'open', 'show', 'wrong', 'disabled' CSS classes;
	*/
	if (clicked_cards[0].innerHTML == clicked_cards[1].innerHTML) {
		
		clicked_cards[0].classList.add('match');
		clicked_cards[1].classList.add('match');

		congratulations();
		
		clicked_cards[0].classList.remove('open', 'show');
		clicked_cards[1].classList.remove('open', 'show');
		
		// I re-initialize my clicked_cards array which contains
		// cards' icon-classes -- String format.
		clicked_cards = [];
		
	} else {
		clicked_cards[0].classList.add('wrong');
		clicked_cards[1].classList.add('wrong');
		
		// I set a timeout in order to show CSS classes animations
		setTimeout(() => {
			clicked_cards[0].classList.remove('open', 'show', 'wrong', 'disabled');
			clicked_cards[1].classList.remove('open', 'show', 'wrong', 'disabled');

			// I re-initialize my clicked_cards array which contains
			// cards' icon-classes -- String format.
			clicked_cards = [];
		}, 500);

	}
}

// Function to start the game timer
function startTimer() {
	let sec = 0;
	let min = 0;

	// I set the interval and I check if I have to increase
	// minutes and then I display the result on the DOM
	timer = setInterval(() => {
		if (sec == 59) {
			min += 1;
			sec = -1;
		}

		minutes.innerHTML = min;
		seconds.innerHTML = ++sec;
	}, 1000);
}

// congratulations modal when all cards match, show modal and moves, time and rating
function congratulations() {

	if (matchedCards.length == 2) {

		// I select from the DOM the number of stars visibile when game is won
		let starRating = document.querySelectorAll('.fa-star:not(.hidden_stars)').length;

		// I stop the timer and I make a String out of the time displayed on the DOM
		clearInterval(timer);
		finalTime = minutes.innerHTML + ' mins ' + seconds.innerHTML + ' secs';

		// I create a span element that will be populated with all game data,
		// plus fancy stuff
		let span = document.createElement('span');
		span.innerHTML = 'Time to complete: <b>' + finalTime +
										 '</b><br>With <b>' + moves + '</b> moves<br>Rate: <b>' +
										 starRating + '</b> ⭐<br><br>👏👏👏👏👏👏';
		
		// That is Sweet Alert modal overlay *** Thx to Sweet Alert https://sweetalert.js.org
		// It then throws startGame() function to start a new game
		(() => {
			swal({
				closeOnClickOutside: false,
				closeOnEsc: false,
				title: '🎉🎉 Good job! You WON! 🎉🎉',
				icon: 'success',
				content: span,
				button: 'Replay'
			}).then(() => {
				startGame();
				swal_NewGame();
			});

			// Here I grab my overlay (genereted on the DOM only here!!!)
			// and I add a class for the bg-color
			let swalModal = document.querySelector('.swal-overlay');
			swalModal.classList.remove("restartOverlay");
			swalModal.classList.add("newGameOverlay");
		})();

	};
	
}


/* EVENT LISTENERS */


/* 
*  Restart button click listener.
*  After the user clicks on the restart btn, startGame() will be fired.
*/
restart.addEventListener('click', () => {

	// To prevent a missclick we provide an alert.
	// *** Thx to Sweet Alert https://sweetalert.js.org ***
	(() => {
		swal({
			title: 'Are you sure?',
			text: "Your progress will be Lost!",
			icon: 'warning',
			buttons: ['Oh noooo! 😱', 'Yes 😞']
		}).then((willDelete) => {
			if (willDelete) {
				startGame();
				swal_NewGame();
			} else {
				swal({
					title: 'Keep going! 💪',
					button: false,
					timer: 450
				});
			}
		});

		// Here I grab my overlay (genereted on the DOM only here!!!)
		// and I add a class for the bg-color
		let swalModal = document.querySelector('.swal-overlay');
		swalModal.classList.remove("newGameOverlay");
		swalModal.classList.add("restartOverlay");
	})();

});

/*
*  Deck click listener.
*  Add an evt listener on the deck - *** THANKS TO MIKE WALES FOR THE TIP ***
*/
deck.addEventListener('click', el => {
	
	/* 
	*  Check if the click has been made on a card or on cards' suit
	*  and then stores it into a variable which is going to be pushed
	*  later in order to be checked.
	*  'disabled', 'open' & 'show' CSS classes are added to the card.
	*/
	if (el.target.classList == 'card' || el.target.parentNode.classList == 'card') {

		let card;
		
		if (el.target.classList == 'card') {
			card = el.target;
		} else {
			card = el.target.parentNode;
		}

		// Now I add this CSS class in order to not having the
		// 2nd-click-on-the-same-card bug
		card.classList.add('disabled', 'open', 'show');

		clicked_cards.push(card);

		/* 
		 *  I check if 2nd click has been made.
		 *  Then with af if statement I start the timer (otherwise it
		 *  will be fired every 2 clicks) and I call check_suit function,
		 *  that will start here cause of the 2nd click.
		 *  That function will checks if icon-classes have a match.
		 */
		if (clicked_cards.length == 2) {

			// I increment moves on the DOM
			document.querySelector('.moves').innerHTML = moves += 1;
		
			// If statement on moves to control the start of the timer
			// and the decrementation of the stars
			if (moves == 1) {
				startTimer();
			} else if (moves == 11) {
				stars[2].classList.add('hidden_stars');
			} else if (moves == 16) {
				stars[1].classList.add('hidden_stars');
			} else if (moves == 22) {
				stars[0].classList.add('hidden_stars');
			}
			
			check_suit();
		
		}

	}
	
});


/* STARTING FUNCTION */


/*
*  IT'S TIME TO PLAY THE GAME (cit.) 😀
*
*  It shuffles cards when page is refreshed / loads
*/
window.onload = startGame();
