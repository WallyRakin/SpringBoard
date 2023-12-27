def sum_up_diagonals(matrix):
    """Given a square matrix, return the sum of its diagonals."""
    # Get the number of rows (assuming the matrix is square)
    n = len(matrix)

    # Initialize variables to store the sums of the two diagonals
    diagonal1_sum = 0
    diagonal2_sum = 0

    # Iterate through the matrix to calculate the sums of the diagonals
    for i in range(n):
        diagonal1_sum += matrix[i][i]  # Top-left to bottom-right diagonal
        # Bottom-left to top-right diagonal
        diagonal2_sum += matrix[i][n - 1 - i]

    # Return the sum of the two diagonals
    return diagonal1_sum + diagonal2_sum
