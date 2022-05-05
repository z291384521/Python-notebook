#!/usr/bin/env python
# coding=utf-8
#@Information:
#@Author       : 反转旋木
#@Date         : 2022-02-12 12:14:50
#@FilePath     : \Python-notebook\语法测试\threading_event的waittime参数.py
#@Email        : 291384521@qq.com
#@LastEditTime : 2022-02-12 12:17:41


# encoding=utf8
import threading
 
 
def test1(n, event):
	print (f'Thread {n} is ready')
	event.wait(timeout=3)
	print(f'Thread {n} is runding')
 
def main():
	event = threading.Event()
	for i in range(0, 2):
		th = threading.Thread(target=test1, args=(i, event))
		th.start()
 
if __name__ == '__main__':
	main()


"""
Thread 0 is ready
Thread 1 is ready
(3秒后執行)
Thread 0 is runding
Thread 1 is runding


"""