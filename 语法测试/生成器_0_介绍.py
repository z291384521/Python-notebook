#在python的函数（function）定义中，
#只要出现了yield表达式（Yield expression），那么事实上定义的是一个generator function

def gen_generator():
    yield 1


def gen_value():
    return 1
# if __name__ == '__main__':
#     ret = gen_generator()
#     print(ret, type(ret))
#     # <generator object gen_generator at 0x02645648> <type 'generator'>
#     ret = gen_value()
#     print(ret, type(ret))
#     # 1


#generator实例
# 遵循迭代器（iterator）协议，迭代器协议需要实现__iter__、next接口
# 能过多次进入、多次返回，能够暂停函数体中代码的执行

def gen_example():
    print("1st yield")
    yield "first yield"
    print("between yields")
    yield "second yield"
    print("no yield anymore")

#直接调用gen_example
gen_example()
#不会调用方法


gen = gen_example()
#第一次调用next
next(gen)
next(gen)
# next(gen)
#next(gen)#抛出异常 因为下一个没有了

#因为for语句能自动捕获StopIteration异常，
# 所以generator（本质上是任何iterator）
# 较为常用的方法是在循环中使
for e in gen_example():
    print(e)
"""
所以迭代器与方法区别如下


　　（1）function每次都是从第一行开始运行，而generator从上一次yield开始的地方运行

　　（2）function调用一次返回一个（一组）值，而generator可以多次返回

　　（3）function可以被无数次重复调用，而一个generator实例在yield最后一个值 或者return之后就不能继续调用了
"""

#send

def MyGenerator():
    value = yield 1
    yield value
    return None
"""
运行过程，
用next启动了生成器gen，知道到yield 1时返回1。

然后我们再用gen的内部方法send进入gen，而且还带回来一个值“I am Value”。
这时候，继续执行yield 1后的代码“value=”，把带回来的值“I am Value”赋给value。
直到遇到yield value，把value返回。

"""

# gen = MyGenerator()
# print(next(gen))
# print(gen.send("I am Value"))
#第一次调用必须send(NONE)启动    或者，第一次要用next启动
gen=MyGenerator()
print(gen.send(None))
# print(gen.send(3))    TypeError: can't send non-None value to a just-started generator