#如何判断一个对象是否可以迭代
#from collections import Iterable
#isinstance([], Iterable)
from collections import Iterator
from collections import Iterable
from time import *
#创建一个函数 来实现迭代
class Classmate:
    def __init__(self):
     self.names = list()
    
    def add(self,name):
     self.names.append(name)
    
    #安装个迭代器
    def __iter__(self):
        """返回一个迭代器"""
        # 我们暂时忽略如何构造一个迭代器对象
        #看到报错创建返回值
        #return "这是一个返回值"（报错字符串不是字符串）
        return ClassIterator()
        pass
class ClassIterator():
    def __iter__(self):
        pass
    def __next__(self):
        pass
classmate = Classmate()
classmate.add("老王")
classmate.add("王二")
classmate.add("张三")

#检查是不是迭代器

print(isinstance(classmate, Iterable))

for name in classmate:
    print(name)
    time.sleep(1)
#报错
# returned non-iterator of type 'NoneType' 没有返回值