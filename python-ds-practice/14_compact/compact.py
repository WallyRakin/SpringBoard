def compact(lst):
    """Return a copy of lst with non-true elements removed."""
    return [item for item in lst if item]


# Test case
result = compact([0, 1, 2, '', [], False, (), None, 'All done'])
print(result)  # Output: [1, 2, 'All done']
