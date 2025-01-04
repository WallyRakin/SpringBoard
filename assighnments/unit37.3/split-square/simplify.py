"""Simplify a split square:

A simple square is already simplified::

    >>> simplify(0)
    0

A split square containing four simple filled squares can be
simplified to a simple filled square::

    >>> simplify([1, 1, 1, 1])
    1

A split square containing four simple empty squares can be
simplified to a simple empty square::

    >>> simplify([0, 0, 0, 0])
    0

A split square containing mixed squares cannot be simplified::

    >>> simplify([1, 0, 1, 0])
    [1, 0, 1, 0]

These can be simplified even when nested::

    >>> simplify([1, 0, 1, [1, 1, 1, 1]])
    [1, 0, 1, 1]

Simplification should nest, so if we can simplify one split square
into a simple square and now an outer split square can be
simplified, it should::

    >>> simplify([1, 1, 1, [1, 1, 1, 1]])
    1

    >>> simplify([[1, 1, 1, 1], [1, 1, 1, 1], 1, 1])
    1

    >>> simplify([1, 0, [1, [0, 0, 0, 0], 1, [1, 1, 1, 1]], 1])
    [1, 0, [1, 0, 1, 1], 1]

Be careful that we don't "simplify" a set of matching mixed squares:

    >>> simplify([[1, 0, 0, 0], [1, 0, 0, 0], [1, 0, 0, 0], [1, 0, 0, 0]])
    [[1, 0, 0, 0], [1, 0, 0, 0], [1, 0, 0, 0], [1, 0, 0, 0]]
"""


def simplify(s):
    """Simplify a split square."""
    if isinstance(s, int):
        # Base case: simple square must be 0 or 1
        if s in (0, 1):
            return s
        else:
            raise ValueError(
                f"Invalid simple square value: {s}. Must be 0 or 1.")
    elif isinstance(s, list):
        # Split square must contain exactly four parts
        if len(s) != 4:
            raise ValueError(
                f"Split square must contain exactly four parts, got {len(s)} parts.")

        # Recursively simplify each part
        simplified_parts = []
        for part in s:
            simplified_part = simplify(part)
            simplified_parts.append(simplified_part)

        # Check if all simplified parts are the same simple square
        first_part = simplified_parts[0]
        if all(part == first_part for part in simplified_parts):
            # All parts are the same; simplify to that simple square
            return first_part
        else:
            # Cannot simplify further; return the list of simplified parts
            return simplified_parts
    else:
        # If s is neither int nor list, it's invalid
        raise TypeError(f"Invalid type: {type(s)}. Expected int or list.")


if __name__ == "__main__":
    import doctest
    # Run the doctests
    if doctest.testmod().failed == 0:
        print("\n*** ALL TESTS PASS; YOU MADE THAT SEEM SIMPLE!!\n")
