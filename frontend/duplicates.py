import json 

# Read the JSON file
with open('frontend/test2.json', 'r') as file:
    data = json.load(file)

# Create a new list for unique entries
unique_data = []

# Iterate over the original data and remove duplicates
for entry in data:
    if entry not in unique_data:
        unique_data.append(entry)

# Write the updated data to a new JSON file
with open('frontend/my-app/src/dashboard/components/unique_classes.json', 'w') as file:
    json.dump(unique_data, file, indent=4)
