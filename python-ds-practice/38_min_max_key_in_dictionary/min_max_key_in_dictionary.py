def min_max_keys(d):
    """Return tuple (min-keys, max-keys) in d."""
    # Use the min and max functions to find the minimum and maximum keys
    min_key = min(d.keys())
    max_key = max(d.keys())

    # Return the result as a tuple
    return (min_key, max_key)
