'''
*args就是就是传递一个可变参数列表给函数实参，这个参数列表的数目未知，
甚至长度可以为0。下面这段代码演示了如何使用args
**kwargs则是将一个可变的关键字参数的字典传给函数实参 
'''
#要不加就不加
def test1(a,b,*args,**kwargs):
    print(a)
    print(b)
    print(args)
    print(kwargs)
    test2(a, b, args,kwargs)

def test2(a, b, args,kwargs):
    print(a)
    print(b)
    print(args)
    print(kwargs)

test1(11, 22, 33, 44, 55, 66,name="laowang",age=18)


def test3(a,b,*args,**kwargs):
    print(a)
    print(b)
    print(args)
    print(kwargs)
    # test4(a, b, args, kwargs)  # 相当于传递test4(11, 22, (33, 44, 55, 66), {"name":"laowang", "age":18})
    # test4(a, b, *args, kwargs)  # 相当于传递test4(11, 22, 33, 44, 55, 66, {"name":"laowang", "age":18})
    test2(a, b, *args, **kwargs)  # 相当于传递test4(11, 22, 33, 44, 55, 66, name="laowang", age=18)

def test4(a, b, *args,**kwargs):
    print(a)
    print(b)
    print(args)
    print(kwargs)





# def test1(a,b,*args,**kwargs):
#     print(a)
#     print(b)
#     print(args)
#     print(kwargs)
# def test2(a, b, *args, **kwargs):
#     print(a)
#     print(b)
#     print(args)
#     print(kwargs)
#     test1(a, b,args,kwargs) 
#     #会打印出test2(11, 22, (33, 44, 55, 66), {"name":"laowang", "age":18})