
#简单实现一个自定义迭代模式
def frange(start, stop, increment):
    x = start
    while x < stop:
        yield x
        x += increment

for n in frange(0, 4, 0.5):
    print(n)
#直接将值给list
a=list(frange(0, 1, 0.125))
print(a)


