# lambda [arg1 [,arg2,.....argn]]:expression
# 匿名函数lambda：是指一类无需定义标识符（函数名）的函数或子程序。
# lambda 函数可以接收任意多个参数 (包括可选参数) 并且返回单个表达式的值

# 简单例子
add = lambda x, y: x + y
print(add(1, 2))
filter

# 进行处理
map(lambda x: x + 1, [1, 2, 3])  # [2, 3, 4]


def s(x):
    if x == 1:

        return "yes"

    else:

        return "no"


print(s(0))

print(s(1))

s = lambda x: "yes" if x == 1 else "no"

print(s(0))

print(s(1))
