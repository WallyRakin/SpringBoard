def sum_nums(nums):
    """Given a list of numbers, return the sum of those numbers."""

    total = 0  # Initialize a variable to store the sum

    # Iterate through the list and add each number to the total
    for num in nums:
        total += num

    return total


result = sum_nums([1, 2, 3, 4])
print("sum_nums returned", result)
