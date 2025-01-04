/**
 * selectionSort sorts an array of numbers in ascending order using the Selection Sort algorithm.
 *
 * @param {number[]} arr - The array of numbers to sort.
 * @returns {number[]} - A new array containing the sorted numbers.
 */
function selectionSort(arr) {
    // Create a copy of the array to avoid mutating the original array
    let sortedArr = [...arr];
    let len = sortedArr.length;

    for (let i = 0; i < len; i++) {
        // Assume the current index contains the smallest number
        let smallestIndex = i;

        // Iterate through the unsorted portion to find the smallest number
        for (let j = i + 1; j < len; j++) {
            if (sortedArr[j] < sortedArr[smallestIndex]) {
                smallestIndex = j;
            }
        }

        // If a smaller number is found, swap it with the current index
        if (smallestIndex !== i) {
            [sortedArr[i], sortedArr[smallestIndex]] = [sortedArr[smallestIndex], sortedArr[i]];
        }
    }

    return sortedArr;
}

module.exports = selectionSort;
