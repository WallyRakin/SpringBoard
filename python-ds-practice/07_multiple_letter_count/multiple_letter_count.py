def multiple_letter_count(phrase):
    """Return dict of {ltr: frequency} from phrase."""
    # Initialize an empty dictionary to store letter frequencies
    letter_count = {}

    # Iterate through each character in the phrase
    for char in phrase:
        # Use the get() method to increment the count for the character
        letter_count[char] = letter_count.get(char, 0) + 1

    return letter_count


# Test cases
print(multiple_letter_count('yay'))   # Output: {'y': 2, 'a': 1}
print(multiple_letter_count('Yay'))   # Output: {'Y': 1, 'a': 1, 'y': 1}
