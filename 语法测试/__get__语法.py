"""
一个类只要实现了__get__，__set__，__delete__中任意一个方法，
我们就可以叫它描述器(descriptor)。

如果只定义了__get__我们叫非资料描述器(non-data descriptor)，

如果__set__，__delete__任意一个/或者同时出现，
我们叫资料描述器(data descriptor)。
"""


"""
拥有这个方法的类，应该(也可以说是必须)产生一个实例，
并且这个实例是另外一个类的类属性(注意一定是类属性，
通过self的方式产生就不属于__get__范畴了)。

简而言之就是 get走 类方法获取类方法时候

"""
class TestDes:
    def __get__(self, instance, owner):
        print(instance, owner)
        return 'TestDes:__get__'
 
class TestMain:
    des = TestDes()
 
if __name__ == '__main__':
    t = TestMain()
    print(t.des)
    print(TestMain.des)

'''
<__main__.TestMain object at 0x0000023496CA51C8> <class '__main__.TestMain'>
TestDes:__get__
None <class '__main__.TestMain'>
TestDes:__get__
'''

'''
TestDes定义了__get__方法，在TestMain中，
定义了一个类属性des，是TestDes的一个实例，
我们访问t.des或者TestMain.des的时候访问的就是访问了TestDes的__get__方法
'''

class TestDes:
    def __get__(self, instance, owner):
        print(instance, owner)
        return 'TestDes:__get__'
 
class TestMain:
    def __init__(self):
        self.des = TestDes()
 
if __name__ == '__main__':
    t = TestMain()
    print(t.des)

'''
<__main__.TestDes object at 0x0000023BEB905D48>
'''
#他不会走get方法 走的是实例方法

