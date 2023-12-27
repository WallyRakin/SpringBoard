def multiply_even_numbers(nums):
    """Multiply the even numbers."""
    product = 1  # Initialize the product to 1

    # Iterate through the numbers in the list
    for num in nums:
        if num % 2 == 0:  # Check if the number is even
            product *= num  # Multiply by the even number

    # Return the product or 1 if no even numbers found
    return product if product != 1 else 1


# Test cases
print(multiply_even_numbers([2, 3, 4, 5, 6]))  # Output: 48
print(multiply_even_numbers([3, 4, 5]))        # Output: 4
print(multiply_even_numbers([1, 3, 5]))        # Output: 1
