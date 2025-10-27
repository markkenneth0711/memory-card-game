const userMoves = document.getElementById('userMoves');
const cardGrid = document.getElementById('cardGrid');

const cardDeck = [
  { id: 1, value: '🍎', matched: false },
  { id: 2, value: '🍎', matched: false },
  { id: 3, value: '🍌', matched: false },
  { id: 4, value: '🍌', matched: false },
  { id: 5, value: '🍇', matched: false },
  { id: 6, value: '🍇', matched: false },
  { id: 7, value: '🍊', matched: false },
  { id: 8, value: '🍊', matched: false },
  { id: 9, value: '🍓', matched: false },
  { id: 10, value: '🍓', matched: false },
  { id: 11, value: '🍍', matched: false },
  { id: 12, value: '🍍', matched: false },
  { id: 13, value: '🍉', matched: false },
  { id: 14, value: '🍉', matched: false },
  { id: 15, value: '🥝', matched: false },
  { id: 16, value: '🥝', matched: false }
];

const totalPairs = 8;
let moves = 0;
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchesFound = 0;

// Fisher-Yates shuffle
function shuffle(array){
    for (let i = array.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; 
    }
    return array;
}

// Shuffle the deck
shuffle(cardDeck);

function renderCards(){
    cardGrid.innerHTML = "";
    cardDeck.forEach(function(card){
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.id = card.id;
        cardElement.dataset.value = card.value;
        cardElement.textContent = '';
        cardElement.addEventListener('click', handleCardClick);
        cardGrid.appendChild(cardElement);
    });
}

renderCards();

function handleCardClick(e){
    const clickedCard = e.target;

    if (lockBoard || clickedCard === firstCard || clickedCard.classList.contains('flipped')) {
        return;
    }

    clickedCard.textContent = clickedCard.dataset.value;
    clickedCard.classList.add('flipped');

    if(!firstCard){
        firstCard = clickedCard;
        return;
    }

    secondCard = clickedCard;
    moves++;
    userMoves.textContent = `Moves: ${moves}`;

    lockBoard = true;
    checkForMatch();
}

function checkForMatch(){
    const isMatch = firstCard.dataset.value === secondCard.dataset.value;
    if (isMatch){
        disableCards();
    } else {
        unflipCards();
    }
}

function disableCards(){
    firstCard.removeEventListener('click', handleCardClick);
    secondCard.removeEventListener('click', handleCardClick);
    matchesFound++;

    resetTurn();

    if(matchesFound === totalPairs) {
        userMoves.textContent = `🎉 You won in ${moves} moves!`;
    }
}

function unflipCards(){
    setTimeout(function(){
        firstCard.textContent = '';
        secondCard.textContent = '';

        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetTurn();

    }, 750);
}

function resetTurn(){
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

function restartGame(){
    moves = 0;
    matchesFound = 0;
    userMoves.textContent = 'Moves: 0';
    shuffle(cardDeck);
    renderCards();
    [firstCard, secondCard, lockBoard] = [null, null, false];
}