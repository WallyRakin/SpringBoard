def same_frequency(num1, num2):
    """Do these nums have the same frequencies of digits?"""
    # Convert the numbers to strings
    num1_str = str(num1)
    num2_str = str(num2)

    # Check if the lengths of the two strings are different
    if len(num1_str) != len(num2_str):
        return False

    # Create dictionaries to count the frequency of each digit in both numbers
    num1_freq = {}
    num2_freq = {}

    # Count the frequency of digits in num1
    for digit in num1_str:
        num1_freq[digit] = num1_freq.get(digit, 0) + 1

    # Count the frequency of digits in num2
    for digit in num2_str:
        num2_freq[digit] = num2_freq.get(digit, 0) + 1

    # Compare the dictionaries
    return num1_freq == num2_freq
