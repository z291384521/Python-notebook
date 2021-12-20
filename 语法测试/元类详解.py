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

