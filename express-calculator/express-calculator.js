const express = require('express');
const app = express();


app.use(express.json());

// Route for calculating the mean
app.get('/mean', (req, res) => {
    if (!req.query.nums) {
        return res.status(400).json({ error: 'Nums are required.' });
    }
    const nums = req.query.nums.split(',').map(Number);
    if (nums.some(isNaN)) {
        return res.status(400).json({ error: 'Invalid request.' });
    }
    const mean = calculateMean(nums);
    res.json({ operation: 'mean', value: mean });
});

// Route for calculating the median
app.get('/median', (req, res) => {
    if (!req.query.nums) {
        return res.status(400).json({ error: 'Nums are required.' });
    }
    const nums = req.query.nums.split(',').map(Number);
    if (nums.some(isNaN)) {
        return res.status(400).json({ error: 'Invalid request.' });
    }
    const median = calculateMedian(nums);
    res.json({ operation: 'median', value: median });
});

// Route for calculating the mode
app.get('/mode', (req, res) => {
    if (!req.query.nums) {
        return res.status(400).json({ error: 'Nums are required.' });
    }
    const nums = req.query.nums.split(',').map(Number);
    if (nums.some(isNaN)) {
        return res.status(400).json({ error: 'Invalid request.' });
    }
    const mode = calculateMode(nums);
    res.json({ operation: 'mode', value: mode });
});



const calculateMean = (numbers) => numbers.reduce((acc, curr) => acc + curr, 0) / numbers.length;

const calculateMedian = (numbers) => {
    const sorted = numbers.slice().sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
};

const calculateMode = (numbers) => {
    const frequency = {};
    let maxFreq = 0;
    let modes = [];
    for (let num of numbers) {
        if (frequency[num]) {
            frequency[num]++;
        } else {
            frequency[num] = 1;
        }
        if (frequency[num] > maxFreq) {
            maxFreq = frequency[num];
            modes = [num];
        } else if (frequency[num] === maxFreq) {
            modes.push(num);
        }
    }
    return modes;
};

// app.listen(port, () => {
//     console.log(`Server started on port 3000`);
// });

module.exports = app;