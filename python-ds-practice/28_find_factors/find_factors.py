def find_factors(num):
    """Find factors of num, in increasing order."""
    factors = []  # Initialize a list to store factors

    # Iterate through numbers from 1 to num
    for i in range(1, num + 1):
        # Check if i evenly divides num (i is a factor of num)
        if num % i == 0:
            factors.append(i)  # Add i to the list of factors

    return factors
