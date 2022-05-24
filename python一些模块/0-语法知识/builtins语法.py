#!/usr/bin/env python
# coding=utf-8
#@Information:
#@Author       : 反转旋木
#@Date         : 2022-02-18 10:57:38
#@FilePath     : \Python-notebook\语法测试\builtins语法.py
#@Email        : 291384521@qq.com
#@LastEditTime : 2022-02-18 10:59:43


"""
builtins 用法与__builtins__

"""

#####################
# builtins 用法
#####################
import builtins

backup = builtins.print
backup("这其实print")

def test():
    print('--test--')
    
builtins.__dict__['new_test'] = test

test()
new_test()
# test 只能在该模块中使用，而new_test可以在本程序中的其它任何一个模块中使用(如果不导入)，因为test函数已经放到内建模块中了。



"""
__builtins__ 同时存在于python2和Python3,并且功能相同。它就是对内建模块一个引用.
在主模块__main__中: __builtins__是对内建模块本身的引用，即__builtins__完全等价于builtins，二者完全是一个东西，不分彼此.此时，__builtins__的类型是模块类型。
在非__main__模块中：__builtins__仅是对builtins.__dict__的引用，而非builtins本身。它在任何地方都可见。此时__builtins__的类型是字典。

作者：whit_py
链接：https://www.jianshu.com/p/c9cf8a864668
来源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
"""


def printTest():
 print(__builtins__ is builtins)
 print(__builtins__ is builtins.__dict__)
 print(type(__builtins__))

printTest()