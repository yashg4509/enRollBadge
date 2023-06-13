import concurrent.futures
import requests, madison

# Define a function that makes an API call and returns a boolean result  
def make_api_call(cl):
    return madison.check_class_status(cl)

def classes_to_api(class_dict):
    batch_size = 15

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
            
            # classes for current batch
            batch_classes = classes[i*batch_size:(i+1)*batch_size]
            batch_bools = bools[i*batch_size:(i+1)*batch_size]

            # submitting futures API for each batch
            future_to_url = {executor.submit(make_api_call, cl): cl for cl in batch_classes}

            # waiting for the current batch
            for future in concurrent.futures.as_completed(future_to_url):
                url = future_to_url[future]
                try:
                    result = future.result()
                except Exception as e:
                    print(f"An error occurred while calling {url}: {e}")
                else:
                    results.append(result)

    new_dict = {}
    for index, c in enumerate(classes):
        new_dict[c] = results[index]

    return new_dict






















