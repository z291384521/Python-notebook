"""
__setattr__()在属性赋值时被调用，并且将值存储到实例字典中，这个字典应该是self的__dict__属性
"""


class Fun:
    def __init__(self):
        self.name = "Liu"
        self.age = 12
        self.male = True

    def __setattr__(self, key, value):
        print("*" * 50)
        print("setting:{},  with:{}".format(key, value))
        print("current __dict__ : {}".format(self.__dict__))
        # 属性注册
        self.__dict__[key] = value


# fun = Fun()


class A(object):
    def __init__(self, value):
        print("into __init__")
        self.value = value

    def __setattr__(self, name, value):
        print("into __setattr__")
        if value == 10:
            print("from __init__")
        print(name, value)
        super.__setattr__(self, name, value)


a = A(10)
# into __init__
# into __setattr__
# from __init__
# 10
a.value1 = 100
# into __setattr__
print(a.value1)
# 100
