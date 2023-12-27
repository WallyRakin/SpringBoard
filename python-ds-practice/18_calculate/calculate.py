def calculate(operation, a, b, make_int=False, message='The result is'):
    """Perform operation on a + b, (possibly truncating) & returning with message."""

    # Perform the specified operation
    if operation == 'add':
        result = a + b
    elif operation == 'subtract':
        result = a - b
    elif operation == 'multiply':
        result = a * b
    elif operation == 'divide':
        if b == 0:
            return None  # Avoid division by zero
        result = a / b
    else:
        return None  # Invalid operation

    # Truncate to an integer if make_int is True
    if make_int:
        result = int(result)

    # Construct the message with the result
    return f'{message} {result}'


# Test cases
# Output: 'The result is 6.5'
print(calculate('add', 2.5, 4))
# Output: 'The result is 2'
print(calculate('subtract', 4, 1.5, make_int=True))
# Output: 'The result is 3.0'
print(calculate('multiply', 1.5, 2))
print(calculate('divide', 10, 4, message='I got'))     # Output: 'I got 2.5'
# Output: None (Invalid operation)
print(calculate('foo', 2, 3))
