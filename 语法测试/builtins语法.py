#!/usr/bin/env python
# coding=utf-8
#@Information:
#@Author       : 反转旋木
#@Date         : 2022-02-18 10:57:38
#@FilePath     : \Python-notebook\语法测试\builtins语法.py
#@Email        : 291384521@qq.com
#@LastEditTime : 2022-02-18 10:59:43


"""
该模块提供对Python的所有“内置”标识符的直接访问；例如，builtins.open 是内置函数的全名 open() 

大多数应用程序通常不会显式访问此模块，但在提供与内置值同名的对象的模块中可能很有用，但其中还需要内置该名称。例如，
在一个想要实现 open() 函数的模块中，它包装了内置的 open() ，这个模块可以直接使用:
"""

#
import builtins


backup = builtins.print