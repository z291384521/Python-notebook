'''
使用了yield关键字的函数不再是函数，而是生成器。（使用了yield的函数就是生成器）
yield关键字有两点作用：
保存当前运行状态（断点），然后暂停执行，即将生成器（函数）挂起
将yield关键字后面表达式的值作为返回值返回，此时可以理解为起到了return的作用
可以使用next()函数让生成器从断点处继续执行，即唤醒生成器（函数）
Python3中的生成器可以使用return返回最终运行的返回值，
而Python2中的生成器不允许使用return返回一个返回值
（即可以使用return从生成器中退出，但return后不能有任何表达式）。
'''
#列表表达式 改成（）
G = (x * 2 for x in range(5))
#打印generator
print(type(G))
#调用里面的元素需要
while True:
    try:
        e = next(G)
    except StopIteration:
        print("超过了")
        break
    except Exception:
        break

#生成器第二种写法   
def fib(n):
    current = 0 
    num1,num2 = 0,1
    while current < n:
        num = num1
        num1,num2 =num2 ,num1+num2
        current +=1
        print(num)
        yield num
    return 'done' 
F = fib(5)
#返回值为yield返回的值 print(num)
num1 =next(F)
#不能够写在第一位 不然会报错can't send non-None value to a just-started generator
print(num1)
F.send("111")
next(F)

'''
Traceback (most recent call last):
  File "i:/1-blhxatuohelp/Python-notebook/多任务/协程/4-生成器.py", line 32, in <module>
    next(F)
StopIteration: done
'''