'''
在一个函数中对全局变量进行修改的时候，到底是否需要使用global进行说明
要看是否对全局变量的执行指向进行了修改，
如果修改了执行，即让全局变量指向了一个新的地方，那么必须使用global
如果，仅仅是修改了指向的空间中的数据，此时不用必须使用global

'''
#region 什么时候加golbe
num=100
num2=[11,22]
nub3=[77,88]
def test1():
    # num=200打印为100
    global num 
    num = 200

def test2():
    num2.append(33)


print("nub(%s), nub2(%s)"%(num,num2))
test1()
test2()
print("nub(%s), nub2(%s)"%(num,num2))
#endregion

