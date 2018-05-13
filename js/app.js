/*
 * array-list that holds all of the cards
 */

var cards = document.querySelectorAll(".deck .card");
let cardsArray = Array.from(cards);
console.log(cardsArray.length);

// var cards = [
//     {
//         name: "diamond",
//         id: 1
//     },
//     {
//         name: "paper-plane-o",
//         id: 2
//     },
//     {
//         name: "anchor",
//         id: 3
//     },
//     {
//         name: "bolt",
//         id: 4
//     },
//     {
//         name: "cube",
//         id: 5
//     },
//     {
//         name: "leaf",
//         id: 6
//     },
//     {
//         name: "bicycle",
//         id: 7
//     },
//     {
//         name: "bomb",
//         id: 8
//     }
// ];



/*  --  */

// var el = document.querySelector(".deck");
// var el = document.querySelector(".deck .card");

// console.log(el);
// console.log(typeof el);

//let card = document.getElementsByClassName("card");
//let cards = [...card];

/*  --  */



/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    // console.log("array1");
    // console.log(array);
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    // console.log("array2");
    // console.log(array);
    console.log("array.length");
    console.log(array.length);
    return array;
}


// deck of all cards in game
const deck = document.querySelector(".deck");

function startGame() {
    var shuffledCards = shuffle(cardsArray);
    for (var i = 0; i < shuffledCards.length; i++) {
        [].forEach.call(shuffledCards, function (item) {
            deck.appendChild(item);
            //console.log(item);
        });
    }
}



window.onload = startGame();

// console.log("EL SHUFFLE:");
// console.log(cards);

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
