def triple_and_filter(nums):
    """Return new list of tripled nums for those nums divisible by 4."""
    # Use list comprehension to filter and triple the numbers
    result = [num * 3 for num in nums if num % 4 == 0]

    return result


# Test cases
print(triple_and_filter([1, 2, 3, 4]))    # Output: [12]
print(triple_and_filter([6, 8, 10, 12]))  # Output: [24, 36]
print(triple_and_filter([1, 2]))          # Output: []
