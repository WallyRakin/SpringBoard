def frequency(lst, search_term):
    """Return frequency of term in lst."""
    return lst.count(search_term)


# Test cases
print(frequency([1, 4, 3, 4, 4], 4))  # Output: 3
print(frequency([1, 4, 3], 7))        # Output: 0
