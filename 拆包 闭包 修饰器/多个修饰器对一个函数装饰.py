def add_qx(func):
    print("-------开始装换修饰1------")
    def call_func(*args,**kwargs):
        print("-----权限验证1")
        return func(*args,**kwargs)
    return call_func

def add_xx(func):
    print("-------开始装换修饰xxxx------")
    def call_func(*args,**kwargs):
        print("-----权限验证xxxxx")
        return func(*args,**kwargs)
    return call_func

@add_qx
@add_xx
def test1():
    print("-------test1------")
test1()