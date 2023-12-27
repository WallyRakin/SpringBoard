def two_oldest_ages(ages):
    """Return two distinct oldest ages as a tuple (second-oldest, oldest)."""
    # Create a set to remove duplicates and convert it to a list
    unique_ages = list(set(ages))

    # Sort the unique ages in descending order
    sorted_ages = sorted(unique_ages, reverse=True)

    # Return the first two elements as a tuple
    return (sorted_ages[1], sorted_ages[0])
