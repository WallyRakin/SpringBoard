function merge(arr1, arr2) {
    let merged = [];
    let i = 0; // Pointer for arr1
    let j = 0; // Pointer for arr2

    // Iterate through both arrays and merge them in sorted order
    while (i < arr1.length && j < arr2.length) {
        if (arr1[i] < arr2[j]) {
            merged.push(arr1[i]);
            i++;
        } else {
            merged.push(arr2[j]);
            j++;
        }
    }

    // If there are remaining elements in arr1, add them to merged
    while (i < arr1.length) {
        merged.push(arr1[i]);
        i++;
    }

    // If there are remaining elements in arr2, add them to merged
    while (j < arr2.length) {
        merged.push(arr2[j]);
        j++;
    }

    return merged;
}

function mergeSort(arr) {
    // Base case: arrays with fewer than 2 elements are already sorted
    if (arr.length < 2) {
        return arr;
    }

    // Split the array into two halves
    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);

    // Recursively sort both halves
    const sortedLeft = mergeSort(left);
    const sortedRight = mergeSort(right);

    // Merge the sorted halves
    return merge(sortedLeft, sortedRight);
}

module.exports = { merge, mergeSort };
