import typing
# 两种方式都是用于类型检查
# typing.TypeVar
# typing.overload
# overload仅仅是给检查工具用的
T = typing.TypeVar('T', str, int)


def foo(name: T) -> str:
    return f"hello {name}"

# 如果输入的类型不对，PyCharm中会提示：
# Expected type 'T', got 'float' instead
print(foo(20.1))

#写了以后多一种参数选择 但是最后还是会调用原来的方法里面的返回值


# 如果没有这个定义，参数传入字符串的时候会有提示
@typing.overload
def get_page(page: str) -> int:
    pass


# 一定要定义一个没有装饰器的函数
def get_page(page: int) -> int:
    return page


print(type(get_page('12')))