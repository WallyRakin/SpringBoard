def find_greater_numbers(nums):
    """Return the number of times a number is followed by a greater number."""
    count = 0  # Initialize a counter

    # Iterate through the elements in nums using two nested loops
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            # Compare the current element with the elements that follow it
            if nums[i] < nums[j]:
                count += 1  # Increment the counter if a greater number is found

    return count
