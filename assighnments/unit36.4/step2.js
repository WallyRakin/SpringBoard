const fs = require('fs');
const axios = require('axios');

function cat(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading ${path}:\n  ${err}`);
            process.exit(1);
        }
        console.log(data);
    });
}

async function webCat(url) {
    try {
        const response = await axios.get(url);
        console.log(response.data);
    } catch (err) {
        console.error(`Error fetching ${url}:\n  ${err}`);
        process.exit(1);
    }
}

const [, , arg] = process.argv;

if (!arg) {
    console.error('Usage: node step2.js <file-path|URL>');
    process.exit(1);
}

const isURL = /^https?:\/\/.+/.test(arg);

if (isURL) {
    webCat(arg);
} else {
    cat(arg);
}
