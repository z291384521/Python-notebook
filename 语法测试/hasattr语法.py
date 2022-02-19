#!/usr/bin/env python
# coding=utf-8
#@Information:
#@Author       : 反转旋木
#@Date         : 2021-12-20 17:37:13
#@FilePath     : \Python-notebook\语法测试\hasattr语法.py
#@Email        : 291384521@qq.com
#@LastEditTime : 2022-02-18 16:20:12


# 查看该属性是否存在
#hasattr




class Coordinate:
    x = 10
    y = -5
    z = 0

a=Coordinate
print(hasattr(a, 'x'))
print(hasattr(a, 'y'))
print(hasattr(a, 'z'))
print(hasattr(a, 'no'))  # 没有该属性