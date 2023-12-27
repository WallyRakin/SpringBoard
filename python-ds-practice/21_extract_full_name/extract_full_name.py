def extract_full_names(people):
    """Return list of names, extracting from first+last keys in people dicts."""
    full_names = [f"{person['first']} {person['last']}" for person in people]
    return full_names

# Define the list of dictionaries
names = [
    {'first': 'Ada', 'last': 'Lovelace'},
    {'first': 'Grace', 'last': 'Hopper'},
]

# Call the function
result = extract_full_names(names)
print(result)  # Output: ['Ada Lovelace', 'Grace Hopper']
