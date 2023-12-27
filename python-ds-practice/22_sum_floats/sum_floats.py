def sum_floats(nums):
    """Return sum of floating point numbers in nums."""
    # Initialize a variable to keep track of the sum of floats
    float_sum = 0.0

    # Iterate through the elements in the nums list
    for num in nums:
        # Check if the element is a float using isinstance
        if isinstance(num, float):
            # If it's a float, add it to the float_sum
            float_sum += num

    return float_sum
