a=1000
def A():
    pass
class B():
    pass
C = B()
#所有的东西都是对象
#默认加载的模块叫做内嵌模块
#返回一个字典 里面有什么觉得以后能用什么
print(globals())
#所以不允许出现相同名字
#动态创建类第一种方式
class Test1:
    num = 1100
    num2 = 200

Test2 = type("Test2",(),{"num":100,"num2":200})
# print(help(Test1))
# print(help(Test2))

#有继承 方法咋办
class Test111(Test1):
    pass
# help(Test111)
#types的继承如何写
Test22= type("Test22",(Test2,),{})
# help(Test22)
#type添加方法
#实例方法
def test_1(self):
    print("实例方法。。。。。")
#类方法
@classmethod
def test_2(self):
    print("-----这是类方法-----")
#静态方法
@staticmethod
def test_3():
    print("这是静态方法")

TEST44 = type("TEST4",(),{"test_1":test_1,"test_2":test_2,"test_3":test_3})
Test4 = TEST44()
Test4.test_1()
Test4.test_2()
Test4.test_3()
#查看类的原始
class T(object):
    pass
t = T()
#原始祖宗 type创建
print(t.__class__)
print(t.__class__.__class__)
print(t.__class__.__class__.__class__)
