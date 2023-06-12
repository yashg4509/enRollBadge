import concurrent.futures
import requests, madison

# Define a function that makes an API call and returns a boolean result  
def make_api_call(cl):
    return madison.check_class_status(cl)

def classes_to_api(dict):
    # List of API URLs
    classes = []
    bools = []

    for c in dict:
        classes.append(c)
        bools.append(dict[c])

    print(classes)
    print(bools)
    results = []

    # Create a ThreadPoolExecutor
    with concurrent.futures.ThreadPoolExecutor() as executor:
        # Submit each API URL to the executor
        future_to_url = {executor.submit(make_api_call, cl): cl for cl in classes}

        # Wait for all the futures to complete
        concurrent.futures.wait(future_to_url)

        # Process the results
        for future in future_to_url:
            url = future_to_url[future]
            try:
                result = future.result()
            except Exception as e:
                print(f"An error occurred while calling {url}: {e}")
            else:
                results.append(result)

        # Print the results
            # print(results)


    new_dict = {}
    for index, c in enumerate(classes):
        new_dict[c] = results[index]

    return new_dict






















