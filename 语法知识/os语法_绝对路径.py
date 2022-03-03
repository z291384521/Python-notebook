#!/usr/bin/env python
# coding=utf-8
#@Information:
#@Author       : 反转旋木
#@Date         : 2022-02-11 10:27:03
#@FilePath     : \Python-notebook\语法测试\os语法_绝对路径.py
#@Email        : 291384521@qq.com
#@LastEditTime : 2022-02-11 10:28:09




import os
#当前目录绝对路径
print(os.path.abspath("."))
#上级目录的绝对路径
print(os.path.abspath(".."))