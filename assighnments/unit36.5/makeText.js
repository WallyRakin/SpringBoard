/** Command-line tool to generate Markov text. */

// makeText.js

const fs = require('fs');
const axios = require('axios');
const MarkovMachine = require('./markov');

function readFile(path) {
    return fs.promises.readFile(path, 'utf8');
}

async function readURL(url) {
    const response = await axios.get(url);
    return response.data;
}

async function getText(source, type) {
    if (type === 'file') {
        return await readFile(source);
    } else if (type === 'url') {
        return await readURL(source);
    } else {
        throw new Error("Invalid type. Use 'file' or 'url'.");
    }
}

async function main() {
    const args = process.argv.slice(2);

    if (args.length < 2) {
        console.error('Usage: node makeText.js <file|url> <path>');
        process.exit(1);
    }

    const [type, source] = args;

    try {
        const text = await getText(source, type);
        const mm = new MarkovMachine(text);
        const generatedText = mm.makeText();
        console.log(generatedText);
    } catch (err) {
        console.error(`Error: ${err.message}`);
        process.exit(1);
    }
}

main();
