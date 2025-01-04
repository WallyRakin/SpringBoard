/**
 * pivot accepts an array, starting index, and ending index.
 * It selects the first element as the pivot, rearranges the array
 * so that all elements less than the pivot are on its left,
 * and all elements greater than or equal to the pivot are on its right.
 * It returns the final index of the pivot.
 *
 * @param {number[]} arr - The array to pivot.
 * @param {number} [start=0] - The starting index for the pivot.
 * @param {number} [end=arr.length - 1] - The ending index for the pivot.
 * @returns {number} - The index where the pivot element is finally placed.
 */
function pivot(arr, start = 0, end = arr.length - 1) {
    let pivot = arr[start];
    let swapIdx = start;

    for (let i = start + 1; i <= end; i++) {
        if (arr[i] < pivot) {
            swapIdx++;
            // Swap elements
            [arr[i], arr[swapIdx]] = [arr[swapIdx], arr[i]];
        }
    }
    // Swap pivot with the element at swapIdx
    [arr[start], arr[swapIdx]] = [arr[swapIdx], arr[start]];
    return swapIdx;
}

/**
 * quickSort accepts an array and sorts it in ascending order using the Quick Sort algorithm.
 *
 * @param {number[]} arr - The array to sort.
 * @param {number} [left=0] - The starting index for the sort.
 * @param {number} [right=arr.length - 1] - The ending index for the sort.
 * @returns {number[]} - The sorted array.
 */
function quickSort(arr, left = 0, right = arr.length - 1) {
    if (left < right) {
        // Partition the array and get the pivot index
        let pivotIndex = pivot(arr, left, right);
        // Recursively sort the left subarray
        quickSort(arr, left, pivotIndex - 1);
        // Recursively sort the right subarray
        quickSort(arr, pivotIndex + 1, right);
    }
    return arr;
}

module.exports = { pivot, quickSort };
