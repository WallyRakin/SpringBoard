function sortedFrequency(arr, num) {
    const first = findFirst(arr, num);
    if (first === -1) return -1;
    const last = findLast(arr, num);
    return last - first + 1;
}

function findFirst(arr, num) {
    let low = 0, high = arr.length - 1, result = -1;
    while (low <= high) {
        let mid = Math.floor((low + high) / 2);
        if (arr[mid] === num) {
            result = mid;
            high = mid - 1;
        } else if (arr[mid] < num) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    return result;
}

function findLast(arr, num) {
    let low = 0, high = arr.length - 1, result = -1;
    while (low <= high) {
        let mid = Math.floor((low + high) / 2);
        if (arr[mid] === num) {
            result = mid;
            low = mid + 1;
        } else if (arr[mid] < num) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    return result;
}

module.exports = sortedFrequency;
