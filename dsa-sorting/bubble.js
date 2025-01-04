/**
 * bubbleSort sorts an array of numbers in ascending order using the Bubble Sort algorithm.
 *
 * @param {number[]} arr - The array of numbers to sort.
 * @returns {number[]} - A new array containing the sorted numbers.
 */
function bubbleSort(arr) {
    // Create a copy of the array to avoid mutating the original array
    let sortedArr = [...arr];
    let len = sortedArr.length;

    for (let i = 0; i < len; i++) {
        // Track if any swaps were made in this pass
        let swapped = false;

        for (let j = 0; j < len - 1 - i; j++) {
            if (sortedArr[j] > sortedArr[j + 1]) {
                // Swap elements using destructuring assignment
                [sortedArr[j], sortedArr[j + 1]] = [sortedArr[j + 1], sortedArr[j]];
                swapped = true;
            }
        }

        // If no swaps occurred, the array is already sorted
        if (!swapped) break;
    }

    return sortedArr;
}

module.exports = bubbleSort;
