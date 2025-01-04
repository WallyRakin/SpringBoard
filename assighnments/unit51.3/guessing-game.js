// guessing-game.js

function guessingGame() {
    const target = Math.floor(Math.random() * 100); // Generates a number between 0 and 99
    let attempts = 0;
    let isOver = false;

    return function guess(number) {
        if (isOver) {
            return "The game is over, you already won!";
        }

        attempts += 1;

        if (number < target) {
            return `${number} is too low!`;
        } else if (number > target) {
            return `${number} is too high!`;
        } else {
            isOver = true;
            return `You win! You found ${number} in ${attempts} guesses.`;
        }
    };
}

module.exports = { guessingGame };
