import json
#'frontend/my-app/src/components/ClassTable/Classes.json'
# Read the JSON file
with open('frontend/my-app/src/dashboard/components/Classes.json', 'r') as f:
    json_data = json.load(f)

# Extract the courseDesignation from each hit
course_designations = [hit['courseDesignation'] for hit in json_data['hits']]

# Create a list of dictionaries with the extracted courseDesignations
new_json_data = [{"name": course} for course in course_designations]

# Write the new JSON data to a file
with open('test2.json', 'w') as f:
    json.dump(new_json_data, f)