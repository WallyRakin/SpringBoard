def is_odd_string(word):
    """Is the sum of the character-positions odd?"""
    # Initialize a variable to store the sum of character positions
    position_sum = 0

    # Iterate through the characters in the word
    for char in word:
        # Convert the character to its character position using ord()
        # 'a' maps to 1, 'b' maps to 2, and so on...
        position = ord(char.lower()) - ord('a') + 1

        # Add the character position to the sum
        position_sum += position

    # Check if the sum of character positions is odd
    return position_sum % 2 == 1
