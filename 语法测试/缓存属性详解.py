#!/usr/bin/env python
# coding=utf-8
#@Information:
#@Author       : 反转旋木
#@Date         : 2022-02-10 16:31:30
#@FilePath     : \Python-notebook\语法测试\缓存属性详解.py
#@Email        : 291384521@qq.com
#@LastEditTime : 2022-02-10 16:31:31


# cached_property　缓存属性
class cached_property(object):
    """
    Decorator that converts a method with a single self argument into a
    property cached on the instance.
    Optional ``name`` argument allows you to make cached properties of other
    methods. (e.g.  url = cached_property(get_absolute_url, name='url') )
    """
    def __init__(self, func, name=None):
        # print(f'f: {id(func)}')
        self.func = func
        self.__doc__ = getattr(func, '__doc__')
        self.name = name or func.__name__
 
    def __get__(self, instance, type=None):
        # print(f'self func: {id(self.func)}')
        # print(f'instance: {id(instance)}')
        if instance is None:
            return self
        res = instance.__dict__[self.name] = self.func(instance)
        return res
 
 
class F00():
    @cached_property
    def test(self):
        # cached_property 将会把每个实例的属性存储到实例的__dict__中, 实例获取属性时, 将会优先从__dict__中获取，则不会再次调用方法内部的过程
        print(f'运行test方法内部过程')
        return 3
    
    @property
    def t(self):
        print('运行t方法内部过程')
        return 44
 
 
f = F00()
print(f.test)  # 第一次将会调用test方法内部过程
print(f.test)  # 再次调用将直接从实例中的__dict__中直接获取，不会再次调用方法内部过程
print(f.t)     # 调用方法内部过程取值
print(f.t)     # 调用方法内部过程取值
 
# 结果输出
# 运行test方法内部过程
# 3
# 3
# 运行t方法内部过程
# 44
# 运行t方法内部过程
# 44