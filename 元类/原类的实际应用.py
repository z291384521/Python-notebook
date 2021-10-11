#现在希望能 FOO.BAR调用里面的值
#对类的修饰用 原类的方式 自定义元类



def upper_attr(class_name, class_parents, class_attr):

    #遍历属性字典，把不是__开头的属性名字变为大写
    new_attr = {}
    for name,value in class_attr.items():
        #Python startswith() 方法用于检查字符串是否是以指定子字符串开头，
        #如果是则返回 True，否则返回 False。如果参数 beg 和 end 指定值，则在指定范围内检查。
        print(name)
        #为啥会打印 __module__ __qualname__
        if not name.startswith("__"):
            #对参数进行
            new_attr[name.upper()] = value

    #调用type来创建一个类
    return type(class_name, class_parents, new_attr)

#如果写了metaclass=upper_attr 就会使用upper_attr来创建Foo类
#他会将Foo传递给class_name 
#object传递给class_parents
#bar = 'bip' bar1 = "11111"等一切属性给class_attr这个
class Foo(object, metaclass=upper_attr):
    bar = 'bip'
    bar1 = "11111"
    def test():
        print("11111")
f = Foo()
