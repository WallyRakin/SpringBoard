def two_list_dictionary(keys, values):
    """Given keys and values, make a dictionary of those."""
    # Use zip to pair keys and values, with a default value of None for extra keys
    return {key: value for key, value in zip(keys, values + [None] * max(0, len(keys) - len(values)))}
