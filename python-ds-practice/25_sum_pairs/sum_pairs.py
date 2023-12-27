def sum_pairs(nums, goal):
    """Return tuple of first pair of nums that sum to goal."""
    seen = {}  # Create a dictionary to store seen values

    for num in nums:
        diff = goal - num
        if diff in seen:
            # If the difference is in the dictionary, return the pair
            return (diff, num)
        else:
            # Otherwise, add the current number to the dictionary
            seen[num] = True

    # If no pair is found, return an empty tuple
    return ()
