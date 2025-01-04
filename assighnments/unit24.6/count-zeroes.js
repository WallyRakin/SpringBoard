function countZeroes(arr) {
    let count = 0;
    for (let num of arr) {
        if (num === 0) count++;
    }
    return count;
}

module.exports = countZeroes;
