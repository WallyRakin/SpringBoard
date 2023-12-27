def number_compare(a, b):
    """Report on whether a > b, b > a, or b == a."""
    if a > b:
        return 'First is greater'
    elif a < b:
        return 'Second is greater'
    else:
        return 'Numbers are equal'


# Test cases
print(number_compare(1, 1))    # Output: 'Numbers are equal'
print(number_compare(-1, 1))   # Output: 'Second is greater'
print(number_compare(1, -2))   # Output: 'First is greater'
