def find_the_duplicate(nums):
    """Find duplicate number in nums."""
    # Create a dictionary to store the frequency of each number
    num_freq = {}

    # Iterate through the numbers in nums
    for num in nums:
        # If the number is already in the dictionary, it's a duplicate
        if num in num_freq:
            return num
        # Otherwise, add it to the dictionary with a frequency of 1
        num_freq[num] = 1

    # If no duplicate is found, return None
    return None
