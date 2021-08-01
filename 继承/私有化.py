'''
xx: 公有变量
_x: 单前置下划线,私有化属性或方法，from somemodule import *禁止导入,类对象和子类可以访问
__xx：双前置下划线,避免与子类中的属性命名冲突，无法在外部直接访问(名字重整所以访问不到)
__xx__:双前后下划线,用户名字空间的魔法对象或属性。例如:__init__ , __ 不要自己发明这样的名字
xx_:单后置下划线,用于避免与Python关键词的冲突
'''
age1 =18
_age =18
class Person(object):
    def __init__(self, name, age, taste):
        self.name = name
        self._age = age 
        self.__taste = taste
    
    def showperson(self):
        print(self.name)
        print(self._age)
        print(self.__taste)
    
    def dowork(self):
        self._work()
        self.__away()    
    
    def _work(self):
        print('my _work')

    def __away(self):
        print('my __away')

