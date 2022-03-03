'''
装饰器(decorator)功能
引入日志
函数执行时间统计
执行函数前预备处理
执行函数后清理功能
权限校验等场景
缓存
'''
def set_func(func):
    def call_func():
        print("----认证步骤1-----")
        print("----认证步骤2-----")
        func()
    return call_func

def test1():
    print("test1")

ret = set_func(test1)
ret()
#这样写就可以覆盖写
test1 = set_func(test1)
test1()

#简单点的写法
@set_func
def test2():
    print("test2")
test2()