def sum_range(nums, start=0, end=None):
    """Return sum of numbers from start...end."""
    # If end is not provided or is greater than the length of nums, set it to the length of nums
    if end is None or end > len(nums):
        end = len(nums)

    # Use slicing to extract the portion of nums from start to end (inclusive)
    portion = nums[start:end+1]

    # Calculate the sum of the elements in the extracted portion
    result = sum(portion)

    return result
