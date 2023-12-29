// Include Axios via a script tag in HTML for browser environments
// <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

// NumbersAPI Requests using async & await
async function fetchNumberApi() {
    try {
        const response = await axios.get('http://numbersapi.com/7?json');
        console.log(response.data.number);
    } catch (error) {
        console.error(error);
    }
}
fetchNumberApi();

async function fetchRangeNumbers() {
    try {
        const response = await axios.get('http://numbersapi.com/9..12?json');
        Object.keys(response.data).forEach(num => {
            console.log(num, response.data[num]);
        });
    } catch (error) {
        console.error(error);
    }
}
fetchRangeNumbers();

const favoritesArray = [];

// Add number 7 to favoritesArray four times using async & await
async function addToFavorites() {
    try {
        for (let i = 0; i < 4; i++) {
            const response = await axios.get('http://numbersapi.com/7?json');
            favoritesArray.push(response.data.number);
        }
    } catch (error) {
        console.error(error);
    }
}
addToFavorites();

// Deck of Cards API Requests using async & await
async function drawCard() {
    try {
        const response = await axios.get('https://deckofcardsapi.com/api/deck/new/draw/?count=1');
        console.log(`${response.data.cards[0].value} of ${response.data.cards[0].suit}`);
    } catch (error) {
        console.error(error);
    }
}
drawCard();

// Store the deck_id for later use using async & await
async function getDeckId() {
    try {
        const response = await axios.get('https://deckofcardsapi.com/api/deck/new/draw/?count=1');
        console.log(`${response.data.cards[0].value} of ${response.data.cards[0].suit}`);
        return response.data.deck_id;
    } catch (error) {
        console.error(error);
    }
}

let deckIdPromise = getDeckId();

// Using the stored deck_id to draw another card using async & await
async function drawAnotherCard() {
    try {
        const deck_id = await deckIdPromise;
        const response = await axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`);
        console.log(`${response.data.cards[0].value} of ${response.data.cards[0].suit}`);
    } catch (error) {
        console.error(error);
    }
}
drawAnotherCard();

// DOM Manipulation and Event Handling for browser environments
const deck = document.getElementById('deck');
const btn = document.getElementById('btn');

deckIdPromise = 'new';

btn.addEventListener('click', async function handleClick(e) {
    try {
        const response = await axios.get(`https://deckofcardsapi.com/api/deck/${deckIdPromise}/draw/?count=1`);
        if (deckIdPromise === 'new') {
            deckIdPromise = response.data.deck_id;
        } else if (response.data.remaining <= 0) {
            e.target.remove();
        }
        const li = document.createElement('li');
        li.innerText = `${response.data.cards[0].value} of ${response.data.cards[0].suit}`;
        deck.append(li);
    } catch (error) {
        console.error(error);
    }
});
