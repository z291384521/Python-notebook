def set_func(func):
    print("-------开始装换修饰------")
    def call_func(*args,**kwargs):
        print("-----权限验证")
        print("-----权限验证2")
        return func(*args,**kwargs)
    return call_func

def test1(num,*args,**kwargs):
    print("-----test1-----%d" % num)
    print("-----test1-----",args)
    print("-----test1-----",kwargs)
    return "ok"

test1 = set_func(test1)
ret=test1(100)
print(ret)

@set_func
def test2(num,*args,**kwargs):
    print("-----test1-----%d" % num)
    print("-----test1-----",args)
    print("-----test1-----",kwargs)
    return "ok"

ret=test1(100)
print(ret)
