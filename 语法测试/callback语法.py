# Python program to illustrate
# callable()
# a test function
def Geek():
    return 5

# 如果对象看起来是可调用的，则返回True。
# 如果对象不可调用，则返回False。

# an object is created of Geek()
let = Geek
print(callable(let))
# a test variable
num = 5 * 5
print(callable(num))

#类以及实现了 __call__ 方法的类实例, 它都返回 True
class Geek:
	def __call__(self):
		print('Hello GeeksforGeeks')

# Suggests that the Geek class is callable
print(callable(Geek))

# This proves that class is callable
GeekObject = Geek()
GeekObject()


