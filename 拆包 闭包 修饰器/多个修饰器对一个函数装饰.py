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
#test1()
#y一个小案例
def set_func_1(func):
	def call_func():
		# "<h1>haha</h1>"
		return "<h1>" + func() + "</h1>"
	return call_func

def set_func_2(func):
	def call_func():
		return "<td>" + func() + "</td>"
	return call_func


@set_func_1
@set_func_2
def get_str():
	return "haha"

print(get_str())