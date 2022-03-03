"""
实际上是在调用wrapper(3, 4)来构造对象，
所以会执行wrapper里的__init__。但类装饰器最终的目标是为了扩展类cls，
所以在wrapper里必须得构造出cls的对象。
上面采取的方式是通过cls()来构造cls对象，
并放在wrapper对象的一个属性wrapped中。
"""
def decorator(cls):
    class wrapper():
        def __init__(self, *args, **kwargs):
            self.wrapped = cls(*args, **kwargs)

        def __getattr__(self, name):
            return getattr(self.wrapped, name)
    return wrapper

@decorator
class cls():
    def __init__(self, x, y):
        self.attrx = x
        self.attry = y
    def method(self):
        return self.attrx, self.attry

c = cls(3, 4)
print(c.attrx)
print(c.attry)
print(c.method())