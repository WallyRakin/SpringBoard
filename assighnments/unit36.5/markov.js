// markov.js

class MarkovMachine {
  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  makeChains() {
    this.chains = {};
    for (let i = 0; i < this.words.length; i++) {
      let word = this.words[i];
      let nextWord = this.words[i + 1] || null;
      if (!this.chains[word]) {
        this.chains[word] = [];
      }
      this.chains[word].push(nextWord);
    }
  }

  makeText(numWords = 100) {
    let words = [];
    let keys = Object.keys(this.chains);
    let currentWord = keys[Math.floor(Math.random() * keys.length)];

    while (words.length < numWords && currentWord !== null) {
      words.push(currentWord);
      let nextWords = this.chains[currentWord];
      currentWord = nextWords[Math.floor(Math.random() * nextWords.length)];
    }

    return words.join(' ');
  }
}

module.exports = MarkovMachine;
