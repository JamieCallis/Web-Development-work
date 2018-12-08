/*
 * Create a list that holds all of your cards
 */
var cards = ['fa-diamond', 'fa-diamond',
    'fa-paper-plane-o', 'fa-paper-plane-o',
    'fa-anchor', 'fa-anchor',
    'fa-bolt', 'fa-bolt',
    'fa-cube', 'fa-cube',
    'fa-leaf', 'fa-leaf',
    'fa-bicycle', 'fa-bicycle',
    'fa-bomb', 'fa-bomb'
];

/**
 * @description generates the HTML cards
 * @param {string} card - card information
 * @return returns a string of the generated HTML card
 */
function generateCard(card) {
    return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
}


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/* variables */

// move variables
const moveCounter = document.getElementsByClassName('moves');
let matchCount = 0;
let moveCount = 0;

// timer variables
const timer = document.getElementsByClassName('timer');
let gameTimer = null;

let timerIsActive = true;
let hour = 0;
let min = 0;
let sec = 0;

// card variables
let allCards = [];
let openCards = [];

// restart variables
const restartButton = document.getElementsByClassName("fa-repeat");

// start variables
const starCheckValues = [16, 25];
let stars = document.querySelectorAll('.fa-star');

//congratulations variables
const congratulationsOverlay = document.querySelectorAll('.congratulations-overlay');
const congratulationsContainer = document.querySelectorAll(".congratulations");

/* functions definitions */


/**
 * @description initialise a new instance of the memory game
 */
function initGame() {
    let deck = document.querySelector('.deck');
    let cardHTML = shuffle(cards).map(function(card) {
        return generateCard(card);
    });
    deck.innerHTML = cardHTML.join('');

    createCardEventListeners();
    createRestartButtonEventListner();
    gameTimer = setInterval(incrementTime, 1000);

}

initGame();

/**
 * @description restart the memory game
 */
function restartGame() {
    clearCongratulations();
    resetTimer();
    resetDeck();
    resetMoveCounter();
    resetStars();
    closeCongratulations();
    openCards = [];
    initGame();
}

/**
 * @description stops the game timer from running.
 */
function stopTimer() {
    clearInterval(gameTimer);
    gameTimer = null;
}
/**
 * @description reset the timer
 */
function resetTimer() {
    stopTimer();

    timer[0].innerHTML = formatTime(0, 0, 0);

    hour = 0;
    min = 0;
    sec = 0;
}

/**
 * @description clear all the cards from the deck
 */
function resetDeck() {
    const deck = document.getElementsByClassName('deck');
    deck[0].innerHTML = "";
}

/**
 * @description resets the move counter interface, and the move counter variable
 */
function resetMoveCounter() {
    moveCounter[0].innerHTML = 0;
    moveCount = 0;
}

/**
 * @description reset the stars make sure that all the stars are full
 */
function resetStars() {
    stars.forEach(function(star) {
        if (star.classList.contains('fa-star-o')) {
            star.classList.remove('fa-star-o');
            star.classList.add('fa-star');
        }

    });
}

/**
 * @description increment the counter, and update the game clock
 */
function incrementTime() {
    if (sec == 59) {
        if (min == 59) {
            hour++;
            min = 0;
        } else {
            min++;
        }
        sec = 0;
    } else {
        sec++;
    }

    timer[0].innerHTML = formatTime(hour, min, sec);
}

/**
 * @description creates a formatedd time string
 * @param {number} hour - hour time
 * @param {number} min - minute time
 * @param {number} sec - second time
 * @return return a formated time string
 */
function formatTime(hour, min, sec) {
    let hourString = "";
    let minString = "";
    let secString = "";

    if (hour < 10) {
        hourString = "0" + hour;
    } else {
        hourString = hour;
    }

    if (min < 10) {
        minString = "0" + min;
    } else {
        minString = min;
    }

    if (sec < 10) {
        secString = "0" + sec;
    } else {
        secString = sec;
    }

    return hourString + ":" + minString + ":" + secString;
}

/**
 * @description checks the move counter against the star value bounderies and
 * adjusts the stars accordingly
 */
function starChecker() {
    // moves is between 0 and equal too 13
    if ((moveCount > starCheckValues[0]) && (moveCount <= starCheckValues[1])) {
        hollowStarOut(stars[2]);
    } else if (moveCount > starCheckValues[1]) { // takes second star
        hollowStarOut(stars[1]);
    }
}

/**
 * @description changes the star from full to hollow
 * @param {object} card - card information
 */
function hollowStarOut(star) {
    star.classList.remove('fa-star');
    star.classList.add('fa-star-o');
}

/**
 * @description opens and flips the card
 * @param {object} card - card information
 */
function openCard(card) {
    card.classList.add('flipping', 'open', 'show');
}

/**
 * @description adds card to the open cards array
 * @param {object} card - card information
 */
function addToOpenCardList(card) {
    openCards.push(card);
}

/**
 * @description adds match, and matching to matched cards
 */
function cardsMatch() {
    openCards[0].classList.add('match', 'matching');
    openCards[1].classList.add('match', 'matching');
}

/**
 * @description incorrect cards animation, and flipping clean up.
 * 500ms delay to allow flipping animation
 */
function cardsIncorrect() {
    setTimeout(function() {}, 500);
    openCards[0].classList.add('incorrect', 'incorrectshake');
    openCards[1].classList.add('incorrect', 'incorrectshake');
    setTimeout(function() {
        openCards.forEach(function(card) {
            card.classList.remove('open', 'show', 'incorrect', 'incorrectshake', 'flipping');
        });

        openCards = [];
    }, 1500);
}

/**
 * @description increments the move counter, and updates user interface
 */
function incrementCounter() {
    moveCount++;
    moveCounter[0].innerHTML = moveCount;
    starChecker();
}

/**
 * @description increements the match counter
 */
function incrementMatchCounter() {
    matchCount++;
    congratulations();
}

/**
 * @description checks for completition of game and handles congratulations events
 */
function congratulations() {

    if (matchCount == 8) {
        stopTimer();
        populateCongratulations();
        createRestartButtonEventListner();
        openCongratulations();
    }
}

/**
 * @description grab interface and update congratulations
 */
function populateCongratulations() {
    let gamePanel = document.querySelectorAll('.game-panel');

    congratulationsContainer[0].innerHTML = '<h1>Congratulations!</h1>' + gamePanel[0].innerHTML;
}

/**
 * @description clears the html inside of congratulations
 */
function clearCongratulations() {
    congratulationsContainer[0].innerHTML = "";
}

/**
 * @description open the congratulations interface
 */
function openCongratulations() {
    congratulationsOverlay[0].classList.remove('hidden')
    congratulationsOverlay[0].classList.add('show');
}

/**
 * @description close the congratulations interface
 */
function closeCongratulations() {
    congratulationsOverlay[0].classList.remove('show')
    congratulationsOverlay[0].classList.add('hidden');
}

/**
 * @description checks if two cards match or not, and increments the counter
 */
function checkCards() {
    setTimeout(function() {
        if (openCards.length == 2) {
            if (openCards[0].dataset.card == openCards[1].dataset.card) {
                cardsMatch();
                incrementMatchCounter();
                openCards = [];
            } else {

                cardsIncorrect();
            }
            incrementCounter();
        }
    }, 500);

}

/* event listeners */



/**
 * @description generates cards event listeners
 */
function createCardEventListeners() {
    allCards = document.querySelectorAll('.card');

    allCards.forEach(function(card) {
        card.addEventListener('click', function(e) {
            // check if a card is already open, or matched don't run the code
            if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
                addToOpenCardList(card);

                if (openCards.length <= 2) {
                    openCard(card);
                }

                checkCards();

            }
        });
    });
}

/**
 * @description generates restart button event listener
 */
function createRestartButtonEventListner() {
    const restartButton = document.querySelectorAll(".fa-repeat");
    restartButton.forEach(function(reButton) {
        reButton.addEventListener("click", restartGame);
    });
}
