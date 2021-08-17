def test1(a,b,*args,**kwargs):
    print(a)
    print(b)
    print(args)
    print(kwargs)

def test2(a, b, *args, **kwargs):
    print(a)
    print(b)
    print(args)
    print(kwargs)
    test1(a, b, args, kwargs) 
    #会打印出test2(11, 22, (33, 44, 55, 66), {"name":"laowang", "age":18})


def test3(a,b,args,kwargs):
    print(a)
    print(b)
    print(args)
    print(kwargs)

test3(11, 22, 33, 44, 55, 66, name="laowang", age=18)