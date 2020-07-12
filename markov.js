/** Textual markov chain generator */

class MarkovMachine {
  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter((c) => c !== '');
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    const chains = new Map();

    for (let i = 0; i < this.words.length; i++) {
      let next = this.words[i + 1] || null;
      if (chains.has(this.words[i])) {
        chains.get(this.words[i]).push(next);
      } else {
        chains.set(this.words[i], [next]);
      }
    }

    this.chains = chains;
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    let word = randomValue(this.words);
    let text = [word];

    for (let i = 0; i < numWords - 1; i++) {
      let chainsArr = this.chains.get(word);
      word = randomValue(chainsArr);
      if (word === null) break;
      text.push(word);
    }
    return text.join(' ');
  }
}

function randomValue(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

module.exports = {
  MarkovMachine: MarkovMachine,
};
