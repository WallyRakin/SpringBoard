def vowel_count(phrase):
    """Return frequency map of vowels, case-insensitive."""
    # Initialize a dictionary to store vowel counts
    vowel_counts = {}

    # Define a set of vowels (both lowercase and uppercase)
    vowels = "aeiouAEIOU"

    # Iterate through the characters in the phrase
    for char in phrase:
        # Check if the character is a vowel (case-insensitive)
        if char in vowels:
            # Convert the character to lowercase for consistency
            char = char.lower()
            # Update the vowel count in the dictionary
            vowel_counts[char] = vowel_counts.get(char, 0) + 1

    return vowel_counts
