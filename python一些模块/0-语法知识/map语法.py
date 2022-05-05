#!/usr/bin/env python
# coding=utf-8
#@Information:
#@Author       : 反转旋木
#@Date         : 2022-02-14 16:51:12
#@FilePath     : \Python-notebook\语法测试\map语法.py
#@Email        : 291384521@qq.com
#@LastEditTime : 2022-02-14 17:17:57


"""
第一个参数 function 以参数序列中的每一个元素调用 
function 函数，返回包含每次 function 函数返回值的新列表
"""

def square(x) :            # 计算平方数
    return x ** 2
list1 =list(map(square,[1,2,3,4]))
print(list1)

list2=list(map(lambda x: x ** 2, [1, 2, 3, 4, 5]))
print(list2)
log="9266f3b3---LmeSzinc---2022-02-12 22:48:42 +0800---Add: Receive META rewards (#863)"
#将字符串变成列表
logs = log.split('\n')
print(logs)
logs = list(map(lambda log: tuple(log.split('---')), logs))
print(logs[0])