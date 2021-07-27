import copy
#通俗的理解是：拷贝了引用，并没有拷贝内容
a =[11,22]
b = a
a1=id(a)
a2=id(b) 
c = copy.copy(a)
a3 = id(c)
print(a1,a2,a3)
