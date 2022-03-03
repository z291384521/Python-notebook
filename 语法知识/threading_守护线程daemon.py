#!/usr/bin/env python
# coding=utf-8
#@Information:
#@Author       : 反转旋木
#@Date         : 2022-02-19 15:22:02
#@FilePath     : \Python-notebook\语法测试\threading_守护线程daemon.py
#@Email        : 291384521@qq.com
#@LastEditTime : 2022-02-21 10:59:51

"""
官方注解
守护线程在程序关闭时会突然关闭。
他们的资源（例如已经打开的文档，数据库事务等等）
可能没有被正确释放。如果你想你的线程正常停止，
设置他们成为非守护模式并且使用合适的信号机制
"""


"""
有一种线程，它是在后台运行的，它的任务是为其他线程提供服务，这种线程被称为“后台线程（Daemon Thread）”，又称为“守护线程”或“精灵线程”。
Python 解释器的垃圾回收线程就是典型的后台线程。
后台线程有一个特征，如果所有的前台线程都死亡了，那么后台线程会自动死亡。
后台线程有一个特征，如果所有的前台线程都死亡了，那么后台线程会自动死亡。
后台线程有一个特征，如果所有的前台线程都死亡了，那么后台线程会自动死亡。
"""


import threading
def action(max):
    for i in range(max):
        print(threading.current_thread().name + "  " + str(i))
t = threading.Thread(target=action, args=(100,), name='后台线程')        
# 将此线程设置成后台线程
# 也可在创建Thread对象时通过daemon参数将其设为后台线程
t.daemon = True
# 启动后台线程
t.start()
for i in range(10):
    print(threading.current_thread().name + "  " + str(i))
# -----程序执行到此处，前台线程（主线程）结束------
# 后台线程也应该随之结束

#上面程序中先将 t 线程设置成后台线程（第 10 行代码），然后启动该线程