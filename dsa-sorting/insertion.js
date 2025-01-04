/**
 * insertionSort sorts an array of numbers in ascending order using the Insertion Sort algorithm.
 *
 * @param {number[]} arr - The array of numbers to sort.
 * @returns {number[]} - A new array containing the sorted numbers.
 */
function insertionSort(arr) {
    // Create a copy of the array to avoid mutating the original array
    let sortedArr = [...arr];

    for (let i = 1; i < sortedArr.length; i++) {
        let current = sortedArr[i];
        let j = i - 1;

        // Shift elements of sortedArr[0..i-1], that are greater than current, to one position ahead
        while (j >= 0 && sortedArr[j] > current) {
            sortedArr[j + 1] = sortedArr[j];
            j--;
        }

        // Insert the current element at its correct position
        sortedArr[j + 1] = current;
    }

    return sortedArr;
}

module.exports = insertionSort;
