class A(object):
    bar = 1


a = A()
getattr(a, 'bar')  # 获取属性 bar 值
getattr(a, 'bar2')  # 属性 bar2 不存在，触发异常
getattr(a, 'bar2', 3)  # 属性 bar2 不存在，但设置了默认值
