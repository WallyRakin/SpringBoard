def truncate(phrase, n):
    """Return truncated-at-n-chars version of  phrase."""
    if len(phrase) <= n:
        return phrase
    elif n < 3:
        return 'Truncation must be at least 3 characters.'
    else:
        return phrase[:n-3] + '...'
