class SerialGenerator:
    """Machine to create unique incrementing serial numbers.

    Initialize with a starting number, and each call to generate() returns the next sequential number.
    The reset() method resets the number back to the original start number.

    >>> serial = SerialGenerator(start=100)
    >>> serial.generate()
    100
    >>> serial.generate()
    101
    >>> serial.generate()
    102
    >>> serial.reset()
    >>> serial.generate()
    100
    """

    def __init__(self, start):
        """Initialize the serial number generator with the given start number."""
        self.start = start
        self.current = start

    def generate(self):
        """Return the next sequential number."""
        current_number = self.current
        self.current += 1
        return current_number

    def reset(self):
        """Reset the number back to the original start number."""
        self.current = self.start

# Example usage:
# serial = SerialGenerator(start=100)
# print(serial.generate())  # 100
# print(serial.generate())  # 101
# print(serial.generate())  # 102
# serial.reset()
# print(serial.generate())  # 100
