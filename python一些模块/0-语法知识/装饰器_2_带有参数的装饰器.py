# @decorator(x,y,z)
# def func():...
# func = decorator(x,y,z)(func)
# 先定义一个带有参数的外层函数，它是外在的函数装饰器，
# 这个函数内包含了真正的装饰器函数，
# 而这个内部的函数装饰器的内部又包含了被装饰的函数封装


from functools import wraps


def out_decorator(x, y, z):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            #调用的值是@out_decorator("xx", "yy", "zz") 而不是 被修饰的
            #*args, **kwargs才是被修饰的
            print(x)
            print(y)
            print(z)
            return func(*args, **kwargs)

        return wrapper

    return decorator


# @out_decorator("xx", "yy", "zz")
# def addNum(x, y):
#     return x + y


# print(addNum(2, 3))


from functools import wraps, partial


def decorator(func=None, x=1, y=2, z=3):
    if func is None:
        return partial(decorator, x=x, y=y, z=z)

    @wraps(func)
    def wrapper(*args, **kwargs):
        print("x: ", x)
        print("y: ", y)
        print("z: ", z)
        return func(*args, **kwargs)
    return wrapper

@decorator()
def addNum(a, b):
    return a + b

print(decorator())

