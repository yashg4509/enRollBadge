import concurrent.futures
import requests

# Define a function that makes an API call and returns a boolean result
def make_api_call(api_url):
    response = requests.get(api_url)
    # Perform some processing on the response and return a boolean result
    result = response.status_code == 200
    return result

# List of API URLs
api_urls = [
    'http://api1.example.com',
    'http://api2.example.com',
    'http://api3.example.com',
    # Add more API URLs as needed
]

# Create a ThreadPoolExecutor
with concurrent.futures.ThreadPoolExecutor() as executor:
    # Submit each API URL to the executor
    future_to_url = {executor.submit(make_api_call, url): url for url in api_urls}

    # Wait for all the futures to complete
    concurrent.futures.wait(future_to_url)

    # Process the results
    results = []
    for future in future_to_url:
        url = future_to_url[future]
        try:
            result = future.result()
        except Exception as e:
            print(f"An error occurred while calling {url}: {e}")
        else:
            results.append(result)

    # Print the results
    print(results)
