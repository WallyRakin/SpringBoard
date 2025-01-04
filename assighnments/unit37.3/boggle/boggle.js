/**
 * Boggle word check.
 *
 * Given a 5x5 Boggle board, see if you can find a given word in it.
 *
 * In Boggle, you can start with any letter, then move in any NEWS direction.
 * You can continue to change directions, but you cannot use the exact same
 * tile twice.
 *
 * For example:
 *
 *     N C A N E
 *     O U I O P
 *     Z Q Z O N
 *     F A D P L
 *     E D E A Z
 *
 * In this grid, you could find `NOON` (start at the `N` in the top
 * row, head south, and turn east in the third row). You cannot find
 * the word `CANON` --- while you can find `CANO` by starting at the
 * top-left `C`, you can't re-use the exact same `N` tile on the
 * front row, and there's no other `N` you can reach.
 */

/**
 * Make a board from a string.
 *
 * For example:
 *
 *     const board = makeBoard(`N C A N E
 *                               O U I O P
 *                               Z Q Z O N
 *                               F A D P L
 *                               E D E A Z`);
 *
 *     console.log(board.length);   // 5
 *     console.log(board[0]);       // ['N', 'C', 'A', 'N', 'E']
 */
function makeBoard(boardString) {
  const letters = boardString.trim().split(/\s+/);

  if (letters.length !== 25) {
    throw new Error("Board must have exactly 25 letters.");
  }

  const board = [];
  for (let i = 0; i < 25; i += 5) {
    board.push(letters.slice(i, i + 5));
  }

  return board;
}

/**
 * Can the word be found in the board?
 *
 * @param {string[][]} board - 5x5 Boggle board.
 * @param {string} word - The word to search for.
 * @returns {boolean} - True if the word is found, otherwise false.
 */
function find(board, word) {
  const rows = board.length;
  const cols = board[0].length;


  function dfs(r, c, index, visited) {
    // If all characters are matched
    if (index === word.length) {
      return true;
    }

    // Check boundaries and current character match
    if (
      r < 0 ||
      r >= rows ||
      c < 0 ||
      c >= cols ||
      board[r][c] !== word[index] ||
      visited.has(`${r},${c}`)
    ) {
      return false;
    }

    // Mark the current cell as visited
    visited.add(`${r},${c}`);

    // Explore all four directions: North, East, West, South
    const directions = [
      [-1, 0], // North
      [0, 1],  // East
      [0, -1], // West
      [1, 0],  // South
    ];

    for (const [dr, dc] of directions) {
      const nr = r + dr;
      const nc = c + dc;
      if (dfs(nr, nc, index + 1, visited)) {
        return true;
      }
    }

    // Backtrack: unmark the current cell
    visited.delete(`${r},${c}`);
    return false;
  }

  // Iterate over every cell in the board as a starting point
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (board[r][c] === word[0]) {
        if (dfs(r, c, 0, new Set())) {
          return true;
        }
      }
    }
  }

  return false;
}

// EXAMPLE TEST

// Define the board as per the example
const board = makeBoard(`N C A N E
                          O U I O P
                          Z Q Z O N
                          F A D P L
                          E D E A Z`);

// Define the second board for the tricky test case
const board2 = makeBoard(`E D O S Z
                           N S O N R
                           O U O O P
                           Z Q Z O R
                           F A D P L`);

// Define the test cases
const testCases = [
  { board, word: "NOON", expected: true },
  { board, word: "NOPE", expected: true },
  { board, word: "CANON", expected: false },
  { board, word: "QUINE", expected: false },
  { board, word: "FADED", expected: true },
  { board: board2, word: "NOOOOS", expected: true },
];

/**
 * Runs all test cases and logs the results.
 */
function runTests() {
  let allPassed = true;
  for (const { board, word, expected } of testCases) {
    const result = find(board, word);
    const passed = result === expected;
    console.log(`find(board, "${word}") === ${expected}: ${passed ? "PASS" : "FAIL"}`);
    if (!passed) {
      allPassed = false;
    }
  }
  if (allPassed) {
    console.log("\n*** ALL TESTS PASSED; YOU FOUND SUCCESS! ***\n");
  } else {
    console.log("\n*** SOME TESTS FAILED. PLEASE REVIEW YOUR CODE. ***\n");
  }
}

// Run the tests
runTests();
