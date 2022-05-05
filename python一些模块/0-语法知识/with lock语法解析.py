# Lock
# 实现原始锁对象的类。
# 一旦一个线程获得一个锁，
# 会阻塞随后尝试获得锁的线程，
# 直到它被释放；任何线程都可以释放它。
# acquire
# 可以阻塞或非阻塞地获得锁。
# release()
# 释放一个锁
import threading

mutex = threading.Lock()

with mutex:
    pass
    # do something...
# with表示自动打开自动释放锁
mutex.acquire()
try:
    pass
    # do something...
finally:
    mutex.release()
