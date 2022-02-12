#!/usr/bin/env python
# coding=utf-8
#@Information:
#@Author       : 反转旋木
#@Date         : 2022-02-12 11:20:35
#@FilePath     : \Python-notebook\语法测试\threading_event的使用.py
#@Email        : 291384521@qq.com
#@LastEditTime : 2022-02-12 12:12:11


#通过threading Event() 可以创建一个事件管理标志 该标志（event）默认为False
#说白了就是控制线程

# event.wait(timeout=None)阻塞线程直到内部变量为 true 。如果调用时内部标识为 true，将立即返回。否则将阻塞线程，直到调用 set() 

# event.set()：将event的标志设置为True，调用wait方法的所有线程将被唤醒；
# event.clear()：将event的标志设置为False，调用wait方法的所有线程将被阻塞；
# event.isSet()：判断event的标志是否为True。

from socket import timeout
import threading
from time import sleep

def test(n,event):
    while not event.isSet():
        print(f'Thread {n} is ready')
        sleep(1)  
    event.wait()
    while event.isSet():
        print(f'Thread {n} is running')
        sleep(1)

def main():
	event = threading.Event()
	for i in range(0, 2):
		th = threading.Thread(target=test, args=(i, event))
		th.start()
	sleep(3)
	print('----- event is set -----')
	event.set()
	sleep(3)
	print ('----- event is clear -----')
	event.clear()
 
if __name__ == '__main__':
    main()