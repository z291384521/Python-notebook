class FatBoy(object):
    pass
#type为claa类型
print(type(FatBoy))
#用TYPE创建类为
Test2 =type("Test2",(),{})
print(Test2)
FatBoy = type("FatBoss",(),{})
help(FatBoy)

'''
增加属性
'''
FatBoss = type('FatBoss',(),{'hobby':"胖子老板卖槟榔"})
print(FatBoss.hobby)
help(FatBoss)
'''
继承
'''
#第二个参数元组是用来填写继承的父类名称
FatBossGril = type("FatBossGril",(FatBoss,),{})
print(FatBossGril.hobby)
print(FatBossGril.__mro__)
"""
带方法类
"""
def sell(self):
    print(self.hobby)
FatBossGril = type('FatBossGril',(FatBoss,),{'sell':sell})
fatbossgril = FatBossGril()
fatbossgril.sell()
"""
静态方法
"""
@staticmethod
def static_method():
    print("static method...")

FatBossGril = type('FatBossGril',(FatBoss,),{'sell':sell,'static_method':static_method})
FatBossGril.static_method
FatBossGril.static_method()
"""
设置类方法
"""
@classmethod
def class_method(cls):
    print(cls.hobby)
FatBossGril = type('FatBossGril',(FatBoss,),{'sell':sell,'static_method':static_method,'class_method':class_method})
FatBossGril.class_method()

# 元类就是用来创建这些类（对象）的，元类就是类的类
# 类的祖宗
'''
你可以通过检查class属性来看到这一点。Python中所有的东西，
注意，我是指所有的东西——都是对象。这包括整数、字符串、函数以及类。
它们全部都是对象，而且它们都是从一个类创建而来，这个类就是type

'''

# __metaclass__属性
#上面已经知道了如何使用type这个元类来创建类，那么如何创建自己的元类呢？？
#此情此景需要用到__metaclass__属性。
'''
FatBossGril中有__metaclass__这个属性吗？如果有，那么Python会通过__metaclass__创建一个名字为FatBossGril的类(对象)
如果Python没有找到__metaclass__，它会继续在FatBoss（父类）中寻找__metaclass__属性，并尝试做和前面同样的操作。
如果Python在任何父类中都找不到__metaclass__，它就会在模块层次中去寻找__metaclass__，并尝试做同样的操作。
如果还是找不到__metaclass__,Python就会用内置的type来创建这个类对象。

作者：Devops海洋的渔夫
链接：https://www.jianshu.com/p/c1ca0b9c777d
来源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
'''






'''
方法返回类例子
'''

# def upper_attr(class_name, class_parents, class_attr):

#     # class_name 会保存类的名字 Foo
#     # class_parents 会保存类的父类 object
#     # class_attr 会以字典的方式保存所有的类属性

#     # 遍历属性字典，把不是__开头的属性名字变为大写
#     new_attr = {}
#     print("="*30)
#     for name, value in class_attr.items():
#         print("name=%s and value=%s" % (name,value))  # 打印所有类属性出来
#         if not name.startswith("__"):
#             new_attr[name.upper()] = value
#             print("name.upper()=",name.upper())
#             print("value=",value)

#     # 调用type来创建一个类
#     return type(class_name, class_parents, new_attr)

# class Foo(object, metaclass=upper_attr): # python3 与 2的写法唯一区别
#     bar = 'bip'


# print("="*30)
# print("check Foo exist bar attr=",hasattr(Foo, 'bar'))
# print("check Foo exist BAR attr=",hasattr(Foo, 'BAR'))

# f = Foo()
# print("print f.BAR=",f.BAR)






class UpperAttrMetaClass(type):

    # __new__ 是在__init__之前被调用的特殊方法
    # __new__是用来创建对象并返回之的方法
    # 而__init__只是用来将传入的参数初始化给对象
    # 你很少用到__new__，除非你希望能够控制对象的创建
    # 这里，创建的对象是类，我们希望能够自定义它，所以我们这里改写__new__
    # 如果你希望的话，你也可以在__init__中做些事情
    # 还有一些高级的用法会涉及到改写__call__特殊方法，但是我们这里不用
    def __new__(cls, class_name, class_parents, class_attr):
        # 遍历属性字典，把不是__开头的属性名字变为大写
        new_attr = {}
        print("="*30)
        for name, value in class_attr.items():
            print("name=%s and value=%s" % (name,value))  # 打印所有类属性出来
            if not name.startswith("__"):
               new_attr[name.upper()] = value
               print("name.upper()=",name.upper())
               print("value=",value)
        
        # 调用type来创建一个类
        return type(class_name, class_parents, new_attr)

class Foo(object, metaclass=UpperAttrMetaClass):
    bar = 'bip'


print("="*30)
print("check Foo exist bar attr=",hasattr(Foo, 'bar'))
print("check Foo exist BAR attr=",hasattr(Foo, 'BAR'))

f = Foo()
print("print f.BAR=",f.BAR)
