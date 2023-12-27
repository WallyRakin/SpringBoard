def partition(lst, fn):
    """Partition lst by predicate."""
    a = []  # Initialize the list for items that pass the fn test
    b = []  # Initialize the list for items that fail the fn test

    for item in lst:
        if fn(item):
            a.append(item)
        else:
            b.append(item)

    return [a, b]

# Test cases


def is_even(num):
    return num % 2 == 0


def is_string(el):
    return isinstance(el, str)


print(partition([1, 2, 3, 4], is_even))        # Output: [[2, 4], [1, 3]]
# Output: [['hi', 'bye'], [None, 6]]
print(partition(["hi", None, 6, "bye"], is_string))
