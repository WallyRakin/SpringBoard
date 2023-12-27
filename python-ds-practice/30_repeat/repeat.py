def repeat(phrase, num):
    """Return phrase, repeated num times."""
    if isinstance(num, int) and num >= 0:
        return phrase * num
    else:
        return None
