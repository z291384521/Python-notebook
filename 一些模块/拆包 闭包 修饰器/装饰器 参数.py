def set_func(func):
    def call_func(num):
        print("----认证步骤1-----")
        print("----认证步骤2-----")
        print(num)
        func(num)
    return call_func


@set_func
def test1(num):
    print("-----test1------%d" % num)
test1(100)
