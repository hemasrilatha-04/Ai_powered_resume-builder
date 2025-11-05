import os
import subprocess
import sys

print("=== FIXING EVERYTHING ===")

# Run commands
commands = [
    [sys.executable, "manage.py", "makemigrations"],
    [sys.executable, "manage.py", "migrate"],
    [sys.executable, "manage.py", "runserver"]
]

for cmd in commands:
    print(f"Running: {' '.join(cmd)}")
    try:
        result = subprocess.run(cmd, check=True)
    except subprocess.CalledProcessError as e:
        print(f"Error: {e}")
        break