def last_element(lst):
    """Return last item in list (None if list is empty)."""
    if not lst:  # Check if the list is empty
        return None
    else:
        return lst[-1]


# Test cases
print(last_element([1, 2, 3]))  # Output: 3
print(last_element([]) is None)  # Output: True
