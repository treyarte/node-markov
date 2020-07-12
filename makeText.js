/** Command-line tool to generate Markov text. */

const fs = require('fs');
const axios = require('axios');
const { MarkovMachine } = require('./markov');

function makeGenText(text) {
  let mm = new MarkovMachine(text);

  console.log(mm.makeText());
}

function makeText() {
  const argv = process.argv;
  const option = argv[2];

  if (option === 'file') {
    readFile(argv[3]);
  } else if (option === 'url') {
    readWeb(argv[3]);
  } else {
    console.log('Error: Not a valid option');
  }
}

function readFile(path) {
  fs.readFile(path, 'utf8', (error, data) => {
    if (error) {
      console.error(error);
      process.exit(1);
    } else {
      makeGenText(data);
    }
  });
}

async function readWeb(path) {
  try {
    const resp = await axios.get(path);
    makeGenText(resp.data);
  } catch (error) {
    console.error(
      `Error fetching ${path}: \n\t Error: Request failed with status code 404`
    );
    process.exit(1);
  }
}

module.exports = {
  makeText: makeText,
};

makeText();
