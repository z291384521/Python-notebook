#如何判断一个对象是否可以迭代
#from collections import Iterable
#isinstance([], Iterable)
from collections import Iterator
from collections import Iterable
import time
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
        return ClassIterator(self)
        pass
class ClassIterator():
    def __init__(self,obj):
        self.obj = obj
        self.current_num = 0
    def __iter__(self):
        pass
    def __next__(self):
        if self.current_num < len(self.obj.names):
            ret = self.obj.names[self.current_num]
            self.current_num += 1
            return ret
        else:
            raise StopIteration
classmate = Classmate()
classmate.add("老王")
classmate.add("王二")
classmate.add("张三")

#检查是不是迭代器

print(isinstance(classmate, Iterable))

for name in classmate:
    '''
    for temp in xxxx_obj:
        pass
    运行逻辑
    1.判断×xxx_obj是否是可以迭代
    2.在第1步成立的前提现，调用iter函数得到xxxx_obj对象的_iter_方法的返回值
    3._iter_方法的返回值是一个迭代器
    4.调用next方法
    '''
    print(name)
    time.sleep(1)
#报错
# returned non-iterator of type 'NoneType' 没有返回值