const unroll = require("../unroll");

describe("unroll", function () {
    it("should correctly unroll a 4x4 matrix", function () {
        const square = [
            [1, 2, 3, 4],
            [5, 6, 7, 8],
            [9, 10, 11, 12],
            [13, 14, 15, 16]
        ];
        expect(unroll(square)).toEqual([1, 2, 3, 4, 8, 12, 16, 15, 14, 13, 9, 5, 6, 7, 11, 10]);
    });

    it("should correctly unroll a 3x3 matrix", function () {
        const smallerSquare = [
            ["a", "b", "c"],
            ["d", "e", "f"],
            ["g", "h", "i"]
        ];
        expect(unroll(smallerSquare)).toEqual(["a", "b", "c", "f", "i", "h", "g", "d", "e"]);
    });

    it("should handle a single element matrix", function () {
        const singleElement = [[42]];
        expect(unroll(singleElement)).toEqual([42]);
    });

    it("should handle a 2x2 matrix", function () {
        const twoByTwo = [
            [1, 2],
            [4, 3]
        ];
        expect(unroll(twoByTwo)).toEqual([1, 2, 3, 4]);
    });

    it("should return an empty array for an empty matrix", function () {
        const emptySquare = [];
        expect(unroll(emptySquare)).toEqual([]);
    });

    it("should correctly unroll a 5x5 matrix", function () {
        const oddSquare = [
            [1, 2, 3, 4, 5],
            [16, 17, 18, 19, 6],
            [15, 24, 25, 20, 7],
            [14, 23, 22, 21, 8],
            [13, 12, 11, 10, 9]
        ];
        expect(unroll(oddSquare)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]);
    });
});
