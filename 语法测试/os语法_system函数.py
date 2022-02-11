#!/usr/bin/env python
# coding=utf-8
#@Information:
#@Author       : 反转旋木
#@Date         : 2022-02-11 12:17:56
#@FilePath     : \Python-notebook\语法测试\os语法_system函数.py
#@Email        : 291384521@qq.com
#@LastEditTime : 2022-02-11 12:20:22


import os

#system函数可以将字符串转化成命令在服务器上运行；
#其原理是每一条system函数执行时，
#其会创建一个子进程在系统上执行命令行，子进程的执行结果无法影响主进程；
#上述原理会导致当需要执行多条命令行的时候可能得不到预期的结果；

os.system("calc")   # 调用操作系统的计算器
os.system("cmd")    # 调用操作系统的cmd
os.system('mstsc')  # 调用远程桌面连接