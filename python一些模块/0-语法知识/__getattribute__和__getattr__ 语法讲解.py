# class TestMain:
#     def __init__(self):
#         print('TestMain:__init__')
#         self.a = 1
 
#     def __getattr__(self, item):
#         print('TestMain:__getattr__')
#         return 2
 
# if __name__ == '__main__':
#     t = TestMain()
#     print(t.a)
#     print(t.b)

#结果

"""
TestMain:__init__
1
TestMain:__getattr__
2
"""

"""
我们仍然访问了一个本来不存在的t.b，为什么这里没有报错呢，
因为我们定义了__getattr__函数，而且让它直接返回了2，
也就是说，如果定义了这个函数后，访问不存在的属性，
会自动调用这个函数作为返回值。
"""

# class TestMain:
#     def __init__(self):
#         print('TestMain:__init__')
#         self.a = 1
 
#     def __getattr__(self, item):
#         print('TestMain:__getattr__')
#         return 2
 
#     def __getattribute__(self, item):
#         print('TestMain:__getattribute__')
#         return 3
 
# if __name__ == '__main__':
#     t = TestMain()
#     print(t.a)
#     print(t.b)
'''
TestMain:__init__
TestMain:__getattribute__
3
TestMain:__getattribute__
3
'''
'''
可以看到，无论是访问存在的t.a还是不存在的t.b，
都访问到了__getattribute__这个函数，
也就是说，只要定义了这个函数，
那么属性的访问，都会走到这个函数里面。
'''

class TestMain:
    def __init__(self):
        print('TestMain:__init__')
        self.a = 1
 
    def __getattr__(self, item):
        print('TestMain:__getattr__')
        return 2
 
    def __getattribute__(self, item):
        print('TestMain:__getattribute__')
        if item == 'c':
            raise AttributeError
        return 3
 
if __name__ == '__main__':
    t = TestMain()
    print(t.a)
    print(t.b)
    print(t.c)
'''
TestMain:__init__
TestMain:__getattribute__
3
TestMain:__getattribute__
3
TestMain:__getattribute__
TestMain:__getattr__
2
'''

'''
也就是说，如果__getattribute__抛出了AttributeError异常，
那么会继续访问__getattr__函数的。
'''


# 如果定义了__getattribute__，
# 那么无论访问什么属性，都是通过这个函数获取，包括方法，
# t.f()这种也是访问的这个函数，此时这个函数应该放回一个方法，
# 如果像例子中，仍然返回一个数字，
# 你会获得一个TypeError: 'int' object is not callable错误


# 只要定义了__getattribute__方法，
# 不管你访问一个存在的还是不存在的属性，都由这个方法返回，
# 比如访问t.a，虽然a存在，但是只要定义了这个访问，
# 那么就不是访问最开始的a了

# 如果__getattribute__抛出了AttributeError异常，
# 并且定了了__getattr__函数，那么会调用__getattr__这个函数，
# 不论这个属性到底是不是存在


# 也就是说属性访问的一个大致优先级是：__getattribute__ > __getattr__ > __dict__