import concurrent.futures
import requests
import madison
import time

# Define a function that makes an API call and returns a boolean result
def make_api_call(cl):
    return madison.check_class_status(cl)

def classes_to_api(class_dict):
    batch_size = 3

    # List of API URLs
    classes = []
    bools = []

    for c in class_dict:
        classes.append(c)
        bools.append(class_dict[c])

    print(classes)
    print(bools)
    results = []

    # Determine the number of batches
    num_batches = (len(classes) - 1) // batch_size + 1

    with concurrent.futures.ThreadPoolExecutor() as executor:
        for i in range(num_batches):
            # Classes for the current batch
            batch_classes = classes[i * batch_size : (i + 1) * batch_size]
            batch_bools = bools[i * batch_size : (i + 1) * batch_size]

            # Submitting futures API for each batch
            future_to_url = {executor.submit(make_api_call, cl): cl for cl in batch_classes}

            # Waiting for the current batch
            for future in concurrent.futures.as_completed(future_to_url):
                url = future_to_url[future]
                try:
                    result = future.result()
                except Exception as e:
                    print(f"An error occurred while calling {url}: {e}")
                else:
                    results.append(result)

            # Introduce a delay of 1 second between batches
            if i < num_batches - 1:
                time.sleep(1)

    new_dict = {}
    for r in results:
        new_dict[r[1]] = r[0]

    return new_dict
