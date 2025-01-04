function findRotationCount(arr) {
    let low = 0, high = arr.length - 1;
    if (arr[low] <= arr[high]) return 0;
    while (low <= high) {
        let mid = Math.floor((low + high) / 2);
        let next = (mid + 1) % arr.length;
        let prev = (mid - 1 + arr.length) % arr.length;
        if (arr[mid] <= arr[next] && arr[mid] <= arr[prev]) {
            return mid;
        }
        if (arr[mid] <= arr[high]) {
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    return 0;
}

module.exports = findRotationCount;
