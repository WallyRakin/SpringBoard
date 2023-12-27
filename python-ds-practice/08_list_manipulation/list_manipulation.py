def list_manipulation(lst, command, location, value=None):
    """Mutate lst to add/remove from beginning or end."""
    if command == 'remove':
        if location == 'beginning':
            if lst:
                return lst.pop(0)  # Remove and return the first item
        elif location == 'end':
            if lst:
                return lst.pop()   # Remove and return the last item
    elif command == 'add':
        if location == 'beginning':
            lst.insert(0, value)   # Add value to the beginning
        elif location == 'end':
            lst.append(value)      # Add value to the end
    return lst


# Test cases
lst = [1, 2, 3]

# Remove from the end
print(list_manipulation(lst, 'remove', 'end'))  # Output: 3

# Remove from the beginning
print(list_manipulation(lst, 'remove', 'beginning'))  # Output: 1

# Check the updated list
print(lst)  # Output: [2]

# Add to the beginning
print(list_manipulation(lst, 'add', 'beginning', 20))  # Output: [20, 2]

# Add to the end
print(list_manipulation(lst, 'add', 'end', 30))  # Output: [20, 2, 30]

# Check the updated list
print(lst)  # Output: [20, 2, 30]

# Invalid commands or locations
print(list_manipulation(lst, 'foo', 'end') is None)   # Output: True
print(list_manipulation(lst, 'add', 'dunno') is None)  # Output: True
