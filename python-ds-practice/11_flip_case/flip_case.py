def flip_case(phrase, to_swap):
    """Flip [to_swap] case each time it appears in phrase."""
    result = ""
    for char in phrase:
        if char.lower() == to_swap.lower():
            result += char.swapcase()  # Flip the case
        else:
            result += char
    return result


# Test cases
print(flip_case('Aaaahhh', 'a'))  # Output: 'aAAAhhh'
print(flip_case('Aaaahhh', 'A'))  # Output: 'aAAAhhh'
print(flip_case('Aaaahhh', 'h'))  # Output: 'AaaaHHH'
