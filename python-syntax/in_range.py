def in_range(nums, lowest, highest):
    """Print numbers inside range."""

    # Iterate through the list and check if each number is within the range
    for num in nums:
        if lowest <= num <= highest:
            print(f"{num} fits")


in_range([10, 20, 30, 40, 50], 15, 30)
