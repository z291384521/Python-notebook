# 父类构造的参数无法改写
# 暂时没有办法
# 2021年6月27日 23:30:50
# 但是只有构造方法则不会调用父类
#如下方法改写
from multiprocessing.forkserver import main


# class A(object):
#     def __init__(self,a):
#             self.nameaa = 'aa'
#             self.a=a
#     def funca(self):
#             print('function a %s,%s' % self.nameaa,self.a)
# class B(A):
#     def __init__(self, a,b):
#         super(B,self).__init__(a)
#         self.b =b
#         print("111")
#         print(b)
    
# def main():
#     t=B(1,2)

class Father(object):
    def __init__(self, name):
        self.name=name
        print ( "name: %s" %( self.name))
    def getName(self):
        return 'Father ' + self.name
 
class Son(Father):
    def __init__(self,name,play):
        #super(Son, self).__init__(name)
        self.play =play
        print ("hi")
        print("play: %s" %( self.play))
        self.name =  name
    def getName(self):
        return 'Son '+self.name
 
if __name__=='__main__':
    son=Son('runoob',"王者荣耀")
   # print ( son.getName() )