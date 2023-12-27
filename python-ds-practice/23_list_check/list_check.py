def list_check(lst):
    """Are all items in lst a list?"""
    # Iterate through the elements in the lst
    for item in lst:
        # Check if the element is a list using isinstance
        if not isinstance(item, list):
            # If it's not a list, return False
            return False

    # If all elements are lists, return True
    return True
