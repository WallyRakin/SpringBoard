function unroll(square) {
    if (square.length === 0 || square[0].length === 0) {
        return [];
    }

    const result = [];
    let startRow = 0;
    let endRow = square.length - 1;
    let startCol = 0;
    let endCol = square[0].length - 1;

    while (startRow <= endRow && startCol <= endCol) {
        // Traverse from left to right
        for (let col = startCol; col <= endCol; col++) {
            result.push(square[startRow][col]);
        }
        startRow++;

        // Traverse downwards
        for (let row = startRow; row <= endRow; row++) {
            result.push(square[row][endCol]);
        }
        endCol--;

        if (startRow <= endRow) {
            // Traverse from right to left
            for (let col = endCol; col >= startCol; col--) {
                result.push(square[endRow][col]);
            }
            endRow--;
        }

        if (startCol <= endCol) {
            // Traverse upwards
            for (let row = endRow; row >= startRow; row--) {
                result.push(square[row][startCol]);
            }
            startCol++;
        }
    }

    return result;
}


module.exports = unroll;