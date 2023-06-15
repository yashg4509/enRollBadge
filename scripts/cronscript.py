import time
import subprocess

while True:
    # Execute your script using subprocess
    subprocess.run(["python3", "class_status_checker.py"])

    # Wait for 7 minutes
    time.sleep(7 * 60)
