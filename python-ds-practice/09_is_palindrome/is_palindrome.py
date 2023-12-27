def is_palindrome(phrase):
    """Is phrase a palindrome?"""
    # Remove spaces and convert to lowercase
    phrase = phrase.replace(" ", "").lower()

    # Check if the cleaned phrase is equal to its reverse
    return phrase == phrase[::-1]


# Test cases
print(is_palindrome('tacocat'))   # Output: True
print(is_palindrome('noon'))      # Output: True
print(is_palindrome('robert'))    # Output: False
print(is_palindrome('taco cat'))  # Output: True
print(is_palindrome('Noon'))      # Output: True
