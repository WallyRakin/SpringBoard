import random


class WordFinder:
    """Word Finder: finds random words from a dictionary."""

    def __init__(self, path):
        """Read dictionary and reports back number of words read."""
        self.words = self.read_words(path)
        print(f"{len(self.words)} words read")

    def read_words(self, path):
        """Read file to get list of words, stripping trailing newline characters."""
        with open(path) as file:
            return [line.strip() for line in file]

    def random(self):
        """Return a random word from the dictionary."""
        return random.choice(self.words)


class SpecialWordFinder(WordFinder):
    """Special Word Finder: skips over blank lines and comments."""

    def read_words(self, path):
        """Read file and return list of words, ignoring comments and blank lines."""
        with open(path) as file:
            return [line.strip() for line in file if line.strip() and not line.startswith('#')]
