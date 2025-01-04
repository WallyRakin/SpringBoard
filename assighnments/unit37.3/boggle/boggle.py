def make_board(board_string):
    """Make a board from a string.

    For example::

        >>> board = make_board('''
        ... N C A N E
        ... O U I O P
        ... Z Q Z O N
        ... F A D P L
        ... E D E A Z
        ... ''')

            >>> len(board)
            5

            >>> board[0]
            ['N', 'C', 'A', 'N', 'E']
    """

    letters = board_string.split()

    board = [
        letters[0:5],
        letters[5:10],
        letters[10:15],
        letters[15:20],
        letters[20:25],
    ]

    return board


def find(board, word):
    """Can word be found in board?"""

    rows = len(board)
    cols = len(board[0]) if rows > 0 else 0

    def dfs(r, c, index, visited):
        # If all characters are matched
        if index == len(word):
            return True

        # Check boundaries and current character match
        if (
            r < 0
            or r >= rows
            or c < 0
            or c >= cols
            or board[r][c] != word[index]
            or (r, c) in visited
        ):
            return False

        # Mark the current cell as visited
        visited.add((r, c))

        # Explore all four directions: North, East, West, South
        directions = [(-1, 0), (0, 1), (0, -1), (1, 0)]
        for dr, dc in directions:
            nr, nc = r + dr, c + dc
            if dfs(nr, nc, index + 1, visited):
                return True

        # Backtrack: unmark the current cell
        visited.remove((r, c))
        return False

    # Iterate over every cell in the board as a starting point
    for r in range(rows):
        for c in range(cols):
            if board[r][c] == word[0]:
                if dfs(r, c, 0, set()):
                    return True

    return False


if __name__ == '__main__':
    import doctest

    # Define the board as per the example
    board = make_board('''
    N C A N E
    O U I O P
    Z Q Z O N
    F A D P L
    E D E A Z
    ''')

    board2 = make_board('''
    E D O S Z
    N S O N R
    O U O O P
    Z Q Z O R
    F A D P L
    ''')

    # Define the test cases
    def run_tests():
        assert find(board, "NOON") == True, "Test case 'NOON' failed"
        assert find(board, "NOPE") == True, "Test case 'NOPE' failed"
        assert find(board, "CANON") == False, "Test case 'CANON' failed"
        assert find(board, "QUINE") == False, "Test case 'QUINE' failed"
        assert find(board, "FADED") == True, "Test case 'FADED' failed"
        assert find(board2, "NOOOOS") == True, "Test case 'NOOOOS' failed"
        print("\n*** ALL TESTS PASSED; YOU FOUND SUCCESS! ***\n")

    run_tests()
