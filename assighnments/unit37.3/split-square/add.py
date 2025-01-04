"""Produce new square adding two input squares.

Two simple squares can be added::

    >>> s1 = 0
    >>> s2 = 1

    >>> add(s1, s2)
    1

A simple square and a split square can be added::

    >>> s1 = 0
    >>> s2 = [1, 0, 1, 0]

    >>> add(s1, s2)
    [1, 0, 1, 0]

Two split squares can be added::

    >>> s1 = [0, 0, 0, 1]
    >>> s2 = [0, 1, 0, 1]

    >>> add(s1, s2)
    [0, 1, 0, 1]

Nested squares can be added::

    >>> s1 = [0, [1, 1, 1, [0, 0, 0, 0]], [0, 0, 0, 0], 1]
    >>> s2 = [1, [1, 0, 1, [0, 0, 1, 1]], [1, 0, 1, 0], 1]

    >>> add(s1, s2)
    [1, [1, 1, 1, [0, 0, 1, 1]], [1, 0, 1, 0], 1]

Unevenly-nested squares can be added::

    >>> s1 = [0, [1, 1, 1, 0           ], [0, 0, 0, 0], 1]
    >>> s2 = [1, [1, 0, 1, [0, 0, 1, 1]], [1, 0, 1, 0], 1]

    >>> add(s1, s2)
    [1, [1, 1, 1, [0, 0, 1, 1]], [1, 0, 1, 0], 1]

    >>> s1 = [0, [1, 1, 1, 1                      ], [0, 0, 0, 0], 1]
    >>> s2 = [1, [1, 0, 1, [0, [0, 0, 0, 0], 1, 1]], [1, 0, 1, 0], 1]

    >>> add(s1, s2)
    [1, [1, 1, 1, [1, [1, 1, 1, 1], 1, 1]], [1, 0, 1, 0], 1]
"""


def add(s1, s2):
    """Produce new split square adding two input squares."""
    # Helper function to perform addition
    def add_helper(a, b):
        # Both are simple squares
        if isinstance(a, int) and isinstance(b, int):
            if a not in (0, 1) or b not in (0, 1):
                raise ValueError("Simple squares must be 0 or 1.")
            return max(a, b)

        # One is simple, the other is a list
        elif isinstance(a, int) and isinstance(b, list):
            if a not in (0, 1):
                raise ValueError("Simple squares must be 0 or 1.")
            # Treat the simple square as [a, a, a, a] and add element-wise
            return [add_helper(a, part) for part in b]

        elif isinstance(b, int) and isinstance(a, list):
            if b not in (0, 1):
                raise ValueError("Simple squares must be 0 or 1.")
            # Treat the simple square as [b, b, b, b] and add element-wise
            return [add_helper(part, b) for part in a]

        # Both are lists
        elif isinstance(a, list) and isinstance(b, list):
            if len(a) != 4 or len(b) != 4:
                raise ValueError(
                    "Split squares must contain exactly four parts.")
            return [add_helper(a[i], b[i]) for i in range(4)]

        else:
            raise TypeError("Invalid input types. Expected int or list.")

    return add_helper(s1, s2)


if __name__ == "__main__":
    import doctest
    # Run the doctests
    result = doctest.testmod()
    if result.failed == 0:
        print("\n*** ALL TESTS PASS; YOU'RE A RECURSION WIZARD!\n")
