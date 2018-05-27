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

// declaring variable of matchedCards
let matchedCards = document.getElementsByClassName("match");

// array-list that holds all of the stars
const stars = document.querySelectorAll(".stars .fa-star");

// moves counter incremented after the 2nd click
let moves = 0;

// game timer
let timer;
let minutes = document.querySelector("#minutes");
let seconds = document.querySelector("#seconds");


// @description Shuffle function from http://stackoverflow.com/a/2450976
// @param {array}
// @returns shuffledarray
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
// @description function to start a new play by shuffling cards' suits
function startGame() {

	for (var i = 0; i < stars.length; i++) {
		stars[i].classList.remove("hidden_stars");
	}

	moves = 0;
	document.querySelector(".moves").innerHTML = moves;

	clicked_cards = [];

	clearInterval(timer);
	minutes.innerHTML = 0;
	seconds.innerHTML = 0;

	let shuffledDeck = shuffle(cardsArray);
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

		congratulations();
		
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

// @description congratulations when all cards match, show modal and moves, time and rating
function congratulations() {

	if (matchedCards.length == 16) {

		let starRating = document.querySelectorAll(".fa-star:not(.hidden_stars)").length;

		clearInterval(timer);
		finalTime = minutes.innerHTML + " mins " + seconds.innerHTML + " secs";

		let span = document.createElement("span");
		span.innerHTML = "Time to complete: <b>" + finalTime + "</b><br>With <b>" + moves + "</b> moves<br>Rate: <b>" + starRating + "</b> ⭐<br><br>👏👏👏👏👏👏";
		
		swal({
			title: '🎉🎉 Good job! You WON! 🎉🎉',
			icon: "success",
			content: span,
			button: 'Replay'
		}).then(() => {
			startGame();
		});

	};
	
}


/* 
*  Restart button CLICK LISTENER
*  After the user click on the restart btn, startGame will be fired.
*  startGame() will shuffle the cards.
*  moves counter back to 0 and uploaded the DOM.
*/
restart.addEventListener('click', () => {

	// To prevent a missclick we provide an alert. *** Thx to Sweet Alert https://sweetalert.js.org
	swal("Are you sure you want to start a new game?", {
		buttons: ["Oh noooo!", "Yes :("],
	}).then((willDelete) => {
		if (willDelete) {
			startGame();
		} else {
			swal("Keep going!");
		}
	});

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
// @description shuffles cards when page is refreshed / loads
window.onload = startGame();


// @description change tab icon at page-load
(function () {
	var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
	link.type = 'image/x-icon';
	link.rel = 'shortcut icon';
	link.href = '../img/favicon.ico';
	document.getElementsByTagName('head')[0].appendChild(link);
})();
