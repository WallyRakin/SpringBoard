def weekday_name(day_of_week):
    """Return name of weekday."""
    if day_of_week == 1:
        return 'Sunday'
    elif day_of_week == 2:
        return 'Monday'
    elif day_of_week == 3:
        return 'Tuesday'
    elif day_of_week == 4:
        return 'Wednesday'
    elif day_of_week == 5:
        return 'Thursday'
    elif day_of_week == 6:
        return 'Friday'
    elif day_of_week == 7:
        return 'Saturday'
    else:
        return None


# Test cases
print(weekday_name(1))  # Output: 'Sunday'
print(weekday_name(7))  # Output: 'Saturday'
print(weekday_name(9))  # Output: None
print(weekday_name(0))  # Output: None
