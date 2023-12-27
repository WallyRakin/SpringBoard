def titleize(phrase):
    """Return phrase in title case (each word capitalized)."""
    # Split the phrase into words
    words = phrase.split()

    # Capitalize the first letter of each word and join them back together
    titleized_phrase = ' '.join([word.capitalize() for word in words])

    return titleized_phrase
