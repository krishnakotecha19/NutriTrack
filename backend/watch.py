import time
import os
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
import subprocess

class Watcher:
    def __init__(self, path_to_watch):
        self.path_to_watch = path_to_watch
        self.observer = Observer()

    def run(self):
        event_handler = Handler()
        self.observer.schedule(event_handler, self.path_to_watch, recursive=True)
        self.observer.start()
        try:
            while True:
                time.sleep(1)
        except KeyboardInterrupt:
            self.observer.stop()
        self.observer.join()

class Handler(FileSystemEventHandler):
    def on_modified(self, event):
        if event.src_path.endswith('.py'):  # Trigger restart for Python files
            print(f"Change detected in {event.src_path}, restarting server...")
            subprocess.run(["python", "manage.py", "runserver"])

if __name__ == "__main__":
    path = os.getcwd()  # Current directory
    watcher = Watcher(path)
    watcher.run()
