class TOM:
    #这是类属性调用建议类名.count 不要用对象名.count
    counte=0
    def __init__(self,name) -> None:
        self.name = name
        TOM.counte += 1
        pass
    #下面定义了一个类方法
    @classmethod
    def info(cls):
        print("正在调用类方法",cls)
    @staticmethod
    def info2(cls):
     print("正在调用类方法",cls)
