def single_letter_count(word, letter):
    """Count how many times letter appears in word (case-insensitively)."""
    # Convert both the word and the letter to lowercase to perform a case-insensitive search
    word = word.lower()
    letter = letter.lower()

    # Use the count method to count occurrences of the letter in the word
    return word.count(letter)


# Test cases
print(single_letter_count('Hello World', 'h'))    # Output: 1
print(single_letter_count('Hello World', 'z'))    # Output: 0
print(single_letter_count("Hello World", 'l'))    # Output: 3
