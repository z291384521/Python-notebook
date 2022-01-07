"""
函数被装饰后，如何再去访问未被装饰状态下的这个函数？
@wraps还有一个重要的特性，
可以通过被装饰对象的__wrapped__属性来直接访问被装饰对象

@decorator1
@decorator2
@decorator3
def f():...

当访问f.__wrapped__()的时候，只有decorator1被解除，剩余的所有装饰器仍然有效。
"""

from functools import wraps


def decorator1(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        print("in decorator1")
        return func(*args, **kwargs)

    return wrapper


def decorator2(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        print("in decorator2")
        return func(*args, **kwargs)

    return wrapper


def decorator3(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        print("in decorator3")
        return func(*args, **kwargs)

    return wrapper


@decorator1
@decorator2
@decorator3
def addNum(x, y):
    return x + y


print(addNum(2, 3))
print(addNum.__wrapped__(2, 3))
