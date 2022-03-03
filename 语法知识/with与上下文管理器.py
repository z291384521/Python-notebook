#普通版
def m1():
    f = open("output.txt", "w")
    f.write("python之禅")
    f.close()
#进阶版
def m2():
    f = open("output.txt", "w")
    try:
        f.write("python之禅")
    except IOError:
        print("oops error")
    finally:
        f.close()
#高级版
def m3():
    with open("output.txt", "r") as f:
        f.write("Python之禅")

class File():
    '''
    任何实现了 __enter__() 和 __exit__() 方法的对象都可称之为上下文管理器，
    上下文管理器对象可以使用 with 关键字。
    显然，文件（file）对象也实现了上下文管理器。
    '''
    def __init__(self, filename, mode):
        self.filename = filename
        self.mode = mode

    def __enter__(self):
        print("entering")
        self.f = open(self.filename, self.mode)
        return self.f

    def __exit__(self, *args):
        print("will exit")
        self.f.close()
with File('out.txt', 'w') as f:
    print("writing")
    f.write('hello, python')