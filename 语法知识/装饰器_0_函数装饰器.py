# @funcA
# def funcB():
# 可以简单理解为funcB = funcA(funcB)
# 将函数funcB作为函数funcA的参数，funcA会重新返回另一个可调用的对象(比如函数)并赋值给funcB。
def set_func(func):
    def call_func():
        print("----认证步骤1-----")
        print("----认证步骤2-----")
        func()

    # 返回的是方法体不能是调用方法 test1 = set_func(test1)
    return call_func


def test1():
    print("test1")


test1 = set_func(test1)
test1()


@set_func
def test2():
    print("test2")


test2()

# def funcA(F):
#     ...
#     ...
#         return zzzz
#     return Callable

# funcA要想作为函数装饰器，需要接收函数作为参数，并且返回另一个可调用对象(如函数)。例如：


# 前面的装饰器代码逻辑上没有什么问题，但是却存在隐藏的问题：函数的元数据信息丢了
import time
from functools import wraps


def timecount(func):
    #加上装饰器就会保留原来的注释
    """
    @wraps(func)
    def wrapper(*args, **kwargs):...
    wrapper = wraps(func)(wrapper)
    :param func:
    :return:
    """
    @wraps(func)
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(func.__name__, end - start)
        return result

    return wrapper
