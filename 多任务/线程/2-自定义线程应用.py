import threading
import time


class MyThread(threading.Thread):
    def run(name) -> None:
        for i in range(5):
            print(name)
            
            time.sleep(1)


if __name__ == "__main__":
    t = MyThread(name="1e")
    t.start()
