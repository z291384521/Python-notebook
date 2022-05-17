"""
zame为全局方法 每次导入
from  set魔法方法测试 import Fun  

就会被执行
想要修改只能Fun.zame = "xxxxx"

而不是通过修改
super().__setattr__("zame", 1234)

可以用
hasattr检测 
hasattr(self,"zame")
注意双引号


=====================================
在执行self.xxxx=xxx都会执行__setattr__
没有赋值之前会报错
"""


class Fun:
    zame = "XXXiu"
    def __init__(self):
        self.name = "Liu"
        self.age = 12
        self.male = True
        self.config= {}
    def test(self) :
        self.test=1258
        print(hasattr(self,"zame"))
    def __setattr__(self, key, value):
        print("*"*50)
        print("setting:{},  with:{}".format(key, value))
        print("current __dict__ : {}".format(self.__dict__))
        print(Fun.zame)
        # 属性注册

        self.__dict__[key] = value
        super().__setattr__("zame", 1234)
        print(Fun.zame)
