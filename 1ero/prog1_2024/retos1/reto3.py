def print_times():
    hours = 12
    minutes = 0
    period = "am"

    for _ in range(96):
        print(f"{hours}:{minutes:02d} {period}")
        minutes += 15
        if minutes == 60:
            minutes = 0
            hours += 1
            if hours == 12:
                period = "pm" if period == "am" else "am"
            elif hours == 13:
                hours = 1

print_times()