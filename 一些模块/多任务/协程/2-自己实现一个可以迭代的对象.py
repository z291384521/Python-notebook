from collections import Iterable
import time


#创建一个函数 来实现迭代
class Classmate:
    def __init__(self):
        self.names = list()
        self.current_num = 0

    def add(self, name):
        self.names.append(name)

    #安装个迭代器
    def __iter__(self):
        """返回一个迭代器"""
        return self

    def __next__(self):
        if self.current_num < len(self.names):
            ret = self.names[self.current_num]
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
    print(name)
    time.sleep(1)
#报错
# returned non-iterator of type 'NoneType' 没有返回值