/**
 * getDigit extracts the digit at a specific place value from a number.
 *
 * @param {number} num - The number from which to extract the digit.
 * @param {number} i - The place value index (0 for units, 1 for tens, etc.).
 * @returns {number} - The digit at the specified place value.
 */
function getDigit(num, i) {
    return Math.floor(Math.abs(num) / Math.pow(10, i)) % 10;
}

/**
 * digitCount returns the number of digits in a number.
 *
 * @param {number} num - The number whose digits are to be counted.
 * @returns {number} - The count of digits in the number.
 */
function digitCount(num) {
    if (num === 0) return 1;
    return Math.floor(Math.log10(Math.abs(num))) + 1;
}

/**
 * mostDigits finds the maximum number of digits among an array of numbers.
 *
 * @param {number[]} arr - The array of numbers.
 * @returns {number} - The highest digit count found in the array.
 */
function mostDigits(arr) {
    let maxDigits = 0;
    for (let num of arr) {
        maxDigits = Math.max(maxDigits, digitCount(num));
    }
    return maxDigits;
}

/**
 * radixSort sorts an array of numbers in ascending order using the Radix Sort algorithm.
 *
 * @param {number[]} arr - The array of numbers to sort.
 * @returns {number[]} - A new array containing the sorted numbers.
 */
function radixSort(arr) {
    if (!Array.isArray(arr)) throw new TypeError("Input must be an array.");
    if (arr.length === 0) return [];

    // Create a copy of the array to avoid mutating the original array
    let sortedArr = [...arr];

    let maxDigitCount = mostDigits(sortedArr);
    for (let k = 0; k < maxDigitCount; k++) {
        // Initialize buckets for each digit (0 to 9)
        let digitBuckets = Array.from({ length: 10 }, () => []);

        // Place each number in the corresponding bucket based on the current digit
        for (let num of sortedArr) {
            let digit = getDigit(num, k);
            digitBuckets[digit].push(num);
        }

        // Flatten the buckets back into the sortedArr
        sortedArr = [].concat(...digitBuckets);
    }

    return sortedArr;
}

module.exports = { getDigit, digitCount, mostDigits, radixSort };
