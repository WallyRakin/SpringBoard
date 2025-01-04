"""Print each square on a new line.

A simple square will only be one line::

    >>> dump(0)
    0

    >>> dump(1)
    1

A split square will use four lines::

    >>> dump([0, 1, 0, 1])
    0
    1
    0
    1

A nested split square will use one line per square::

    >>> dump([0, 0, 0, [1, 1, 1, 1]])
    0
    0
    0
    1
    1
    1
    1

Of course, these can nested deeply and still work::

    >>> dump([0, 0, 0, [1, 1, 1, [0, 0, 0, [1, 1, 1, 1]]]])
    0
    0
    0
    1
    1
    1
    0
    0
    0
    1
    1
    1
    1
"""


def dump(s):
    """Print each square on a new line."""
    if isinstance(s, int):
        # Base case: simple square must be 0 or 1
        if s in (0, 1):
            print(s)
        else:
            raise ValueError(
                f"Invalid simple square value: {s}. Must be 0 or 1.")
    elif isinstance(s, list):
        # Split square must contain exactly four parts
        if len(s) != 4:
            raise ValueError(
                f"Split square must contain exactly four parts, got {len(s)} parts.")
        # Recursively print each part
        for part in s:
            dump(part)
    else:
        # If s is neither int nor list, it's invalid
        raise TypeError(f"Invalid type: {type(s)}. Expected int or list.")


if __name__ == "__main__":
    import doctest
    # Run the doctests
    if doctest.testmod().failed == 0:
        print("\n*** ALL TESTS PASS; NICE JOB!\n")
