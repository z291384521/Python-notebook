# 文章地址
# https://www.geeksforgeeks.org/python-different-ways-to-kill-a-thread/?


# Python program showing
# how to kill threads
# using set/reset stop
# flag


import threading
import time


def run():
    '''
    第一种方式
    只要设置了全局变量 stop_threads，目标函数 run() 就会结束，并且可以使用 t1.join()
    杀死线程 t1。但是由于某些原因，人们可能会避免使用全局变量。对于这些情况，可以传递函数对象以提供类似的功能
    :return:
    '''
    while True:
        print('thread running')
        global stop_threads
        if stop_threads:
            break


# stop_threads = False
# t1 = threading.Thread(target=run)
# t1.start()
# time.sleep(1)
# stop_threads = True
# t1.join()
# print('thread killed')


# Python program killing
# threads using stop
# flag

import threading
import time


def run(stop):
    '''
    上面代码中传入的函数对象总是返回局部变量stop_threads的值。
    这个值在函数 run() 中被检查，
    一旦 stop_threads 被重置，run() 函数就会结束并且线程可以被杀死。
    :param stop:
    :return:
    '''
    while True:
        print('thread running')
        if stop():
            break


# def main():
# 	stop_threads = False
# 	t1 = threading.Thread(target=run, args=(lambda: stop_threads,))
# 	t1.start()
# 	time.sleep(1)
# 	stop_threads = True
# 	t1.join()
# 	print('thread killed')
# main()


# 直接调用如下方法 Alas代码学习中
import ctypes


class Thread(threading.Thread):

    # https://www.geeksforgeeks.org/python-different-ways-to-kill-a-thread/
    def __init__(self, target=..., *args, **kwargs):
        threading.Thread.__init__(self, target=target, *args, **kwargs)

    def _get_id(self):
        # returns id of the respective thread
        if hasattr(self, '_thread_id'):
            return self._thread_id
        for thd_id, thread in threading._active.items():
            if thread is self:
                return thd_id

    def stop(self):
        thread_id = self._get_id()
        res = ctypes.pythonapi.PyThreadState_SetAsyncExc(thread_id,
                                                         ctypes.py_object(SystemExit))
        if res > 1:
            ctypes.pythonapi.PyThreadState_SetAsyncExc(thread_id, 0)
            print('Exception raise failure')
