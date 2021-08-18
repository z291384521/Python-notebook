def test1():
    print("--- in test1 func----")
# 调用函数
test1()
# 引用函数
#明确一点 test 与ret相等
ret = test1
print(id(ret))
print(id(test1))
#通过引用调用函数
ret()
#=================什么是闭包
# 定义一个函数
def test(number):

    # 在函数内部再定义一个函数，并且这个函数用到了外边函数的变量，那么将这个函数以及用到的一些变量称之为闭包
    def test_in(number_in):
        print("in test_in 函数, number_in is %d" % number_in)
        return number+number_in
    # 其实这里返回的就是闭包的结果
    return test_in
# 给test函数赋值，这个20就是给参数number
ret = test(20)
# 注意这里的100其实给参数number_in
print(ret(100))
#注 意这里的200其实给参数number_in
print(ret(200))
#案例y=a*x+b a b要可变
#方案一
def f(a,b,x):
    return a*x+b
#方案二 缺省参数
def f1(x,a=1,b=1):
    return a*x+b
#方案三 面向对象垃圾版
class tool:
    def __init__(self,a,b):
        self.a =a
        self.b =b
def f2(obj,x):
    return obj.a*x+obj.b
t1 = tool(2,3)
print(f2(t1,2))
#面向对象牛逼版
class tool1:
    def __init__(self,a,b):
        self.a =a
        self.b =b
    def __call__(self, x) :
        return print(self.a*x+self.b)
t2 = tool1(2,3)
t2(5)
#方案四 闭包放处理
def fun1(a,b):
    def fun2(x):
        return x*a+b
    return fun2
Y1 = fun1(2,1)
print(Y1(1))
print(Y1(2))
Y2 = fun1(3,1)
print(Y2(1))
print(Y2(2))