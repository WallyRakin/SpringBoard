def capitalize(phrase):
    """Capitalize first letter of first word of phrase."""
    if not phrase:
        return phrase  # Return the input string if it's empty

    # Capitalize the first letter and concatenate it with the rest of the phrase
    return phrase[0].capitalize() + phrase[1:]


# Test cases
print(capitalize('python'))          # Output: 'Python'
print(capitalize('only first word'))  # Output: 'Only first word'
