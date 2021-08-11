#一种用起来像是使用的实例属性一样的特殊属性，可以对应于某个方法
'''
property属性的定义和调用要注意一下几点：
定义时，在实例方法的基础上添加 @property 装饰器；并且仅有一个self参数
调用时，无需括号
'''
#region经典类，具有一种@property装饰器
class Foo:
 def func(self):
  print("调用了func方法")   
  pass
 @property
 def prop(self):
  print("调用了prop方法")

foo_obj = Foo()
foo_obj.func()  # 调用实例方法
foo_obj.prop  # 调用property属性
#endregion
'''
经典类中的属性只有一种访问方式，其对应被 @property 修饰的方法
新式类中的属性有三种访问方式，并分别对应了三个被@property、@方法名.setter、@方法名.deleter修饰的方法
'''
#region新式类，具有三种@property装饰器
class Goods:
    """python3中默认继承object类
        以python2、3执行此程序的结果不同，因为只有在python3中才有@xxx.setter  @xxx.deleter
    """
    @property
    def price(self):
        print('@property')
    @price.setter
    def price(self, value):
        print('@price.setter')
    @price.deleter
    def price(self):
        print("@price.deleter")
# ############### 调用 ###############
obj = Goods()
obj.price          # 自动执行 @property 修饰的 price 方法，并获取方法的返回值
obj.price = 123    # 自动执行 @price.setter 修饰的 price 方法，并将  123 赋值给方法的参数
del obj.price      # 自动执行 @price.deleter 修饰的 price 方法
#endregion

#类属性方式，创建值为property对象的类属性
class Foo1:
    def get_bar(self):
        return 'laowang'
    BAR = property(get_bar)
    obj = Foo()
    reuslt = obj.BAR  # 自动调用get_bar方法，并获取方法的返回值
    print(reuslt)
#property方法中有个四个参数

#coding=utf-8
class Foo(object):
    def get_bar(self):
        print("getter...")
        return 'laowang'

    def set_bar(self, value): 
        """必须两个参数"""
        print("setter...")
        return 'set value' + value

    def del_bar(self):
        print("deleter...")
        return 'laowang'

    BAR = property(get_bar, set_bar, del_bar, "description...")

obj = Foo()

obj.BAR  # 自动调用第一个参数中定义的方法：get_bar
obj.BAR = "alex"  # 自动调用第二个参数中定义的方法：set_bar方法，并将“alex”当作参数传入
desc = Foo.BAR.__doc__  # 自动获取第四个参数中设置的值：description...
print(desc)
del obj.BAR  # 自动调用第三个参数中定义的方法：del_bar方法