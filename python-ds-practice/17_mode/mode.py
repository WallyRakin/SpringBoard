def mode(nums):
    """Return most-common number in list."""
    # Initialize a dictionary to store counts of each number
    counts = {}

    # Iterate through the list and count occurrences of each number
    for num in nums:
        if num in counts:
            counts[num] += 1
        else:
            counts[num] = 1

    # Find the number with the highest count
    most_common = None
    max_count = 0
    for num, count in counts.items():
        if count > max_count:
            most_common = num
            max_count = count

    return most_common


# Test cases
print(mode([1, 2, 1]))           # Output: 1
print(mode([2, 2, 3, 3, 2]))     # Output: 2
