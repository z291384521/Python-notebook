import copy
#通俗的理解是：拷贝了引用，并没有拷贝内容
# a =[11,22]
# b = a
# a1=id(a)
# a2=id(b) 
# c = copy.copy(a)
# a3 = id(c)
# print(a1,a2,a3)

a = [11,22]
b = [33,44]
c = [a,b]
d = c
e =copy.copy(c)
print(id(c))
print(id(d))
print("验证浅拷贝")
print(id(e))
print(id(a),id(b),id(e[0]),id(e[1]))
f =copy.deepcopy(c)
print("验证深拷贝")
print(id(f))
print(id(a),id(b),id(f[0]),id(f[1]))

#问题如果现在c增加[55,66] e会增加吗
#不会增加 因为通用
c.append([55,66])
print(e)
'''
如果copy.copy拷贝的是元组，那么它不会进行浅拷贝，仅仅是指向
原因:因为元组时不可变类型,那么意味着数据一定不能修改，因此用copy.copy的时候它会自动判断，如果是元组它就是指向了它
'''
'''
如果用copy.copy .copy.deepcopy对一个全部都是不可变关型的数据进行拷贝，那么它们结果相同，都是引用指向
如果拷贝的是一个拥有不可变类型的数据,即使元组时最顶层,那么deepcopy依然是深拷贝而copy.copy还是指向
'''