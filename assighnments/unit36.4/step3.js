const fs = require('fs');
const axios = require('axios');

function cat(path) {
    return fs.promises.readFile(path, 'utf8');
}

async function webCat(url) {
    const response = await axios.get(url);
    return response.data;
}

function writeToFile(filename, data) {
    return fs.promises.writeFile(filename, data, 'utf8');
}

function parseArgs() {
    const args = process.argv.slice(2);
    const result = {
        out: null,
        path: null
    };

    if (args[0] === '--out') {
        result.out = args[1];
        result.path = args[2];
    } else {
        result.path = args[0];
    }

    return result;
}

async function main() {
    const { out, path } = parseArgs();

    if (!path) {
        console.error('Usage: node step3.js [--out output-filename.txt] <file-path|URL>');
        process.exit(1);
    }

    const isURL = /^https?:\/\/.+/.test(path);

    try {
        let data;
        if (isURL) {
            data = await webCat(path);
        } else {
            data = await cat(path);
        }

        if (out) {
            await writeToFile(out, data);
        } else {
            console.log(data);
        }
    } catch (err) {
        if (out) {
            console.error(`Couldn't write ${out}:\n  ${err}`);
        } else {
            const action = isURL ? 'fetching' : 'reading';
            console.error(`Error ${action} ${path}:\n  ${err}`);
        }
        process.exit(1);
    }
}

main();
