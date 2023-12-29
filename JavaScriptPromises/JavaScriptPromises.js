// Include Axios via a script tag in HTML for browser environments
// <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>


// NumbersAPI Requests
axios.get('http://numbersapi.com/7?json')
    .then(response => { console.log(response.data.number); })
    .catch(error => { console.error(error); });

axios.get('http://numbersapi.com/9..12?json')
    .then(response => {
        Object.keys(response.data).forEach(num => {
            console.log(num, response.data[num]);
        });
    })
    .catch(error => { console.error(error); });

const favoritesArray = [];

// Add number 7 to favoritesArray four times
for (let i = 0; i < 4; i++) {
    axios.get('http://numbersapi.com/7?json')
        .then(response => { favoritesArray.push(response.data.number); })
        .catch(error => { console.error(error); });
}

// Deck of Cards API Requests
axios.get('https://deckofcardsapi.com/api/deck/new/draw/?count=1')
    .then(response => { console.log(`${response.data.cards[0].value} of ${response.data.cards[0].suit}`); })
    .catch(error => { console.error(error); });

// Store the deck_id for later use
let deckIdPromise = axios.get('https://deckofcardsapi.com/api/deck/new/draw/?count=1')
    .then(response => {
        console.log(`${response.data.cards[0].value} of ${response.data.cards[0].suit}`);
        return response.data.deck_id;
    })
    .catch(error => { console.error(error); });

// Using the stored deck_id to draw another card
deckIdPromise.then(deck_id => {
    axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`)
        .then(response => { console.log(`${response.data.cards[0].value} of ${response.data.cards[0].suit}`); })
        .catch(error => { console.error(error); });
});

// DOM Manipulation and Event Handling for browser environments
const deck = document.getElementById('deck');
const btn = document.getElementById('btn');

deckIdPromise = 'new'

btn.addEventListener('click', handleClick);

function handleClick(e) {
    axios.get(`https://deckofcardsapi.com/api/deck/${deckIdPromise}/draw/?count=1`)
        .then(response => {
            if (deckIdPromise === 'new') {
                deckIdPromise = response.data.deck_id;
            } else if (response.data.remaining <= 0) {
                e.target.remove();
            }
            const li = document.createElement('li');
            li.innerText = `${response.data.cards[0].value} of ${response.data.cards[0].suit}`;
            deck.append(li);
        })
        .catch(error => { console.error(error); });
}
