const fs = require('fs');

function cat(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading ${path}:\n  ${err}`);
            process.exit(1);
        }
        console.log(data);
    });
}

const [, , path] = process.argv;

if (!path) {
    console.error('Usage: node step1.js <file-path>');
    process.exit(1);
}

cat(path);
