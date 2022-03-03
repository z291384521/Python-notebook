'''
自动切换任务的模块gevent
greenlet遇到IO(指的是input output 输入输出，比如网络、文件操作等)操作时，
比如访问网络，就自动切换到其他的greenlet，等到IO操作完成，再在适当的时候切换回来继续执行。

由于IO操作非常耗时，经常使程序处于等待状态，
有了gevent为我们自动切换协程，就保证总有greenlet在运行，而不是等待IO
安装
pip3 install gevent
'''
import gevent
def f1(n):
    for i in range(n):
        print(gevent.getcurrent(), i)
        # time.sleep(0.5)
        gevent.sleep(5)

def f2(n):
    for i in range(n):
        print(gevent.getcurrent(), i)
        # time.sleep(0.5)
        gevent.sleep(5)

def f3(n):
    for i in range(n):
        print(gevent.getcurrent(), i)
        # time.sleep(0.5)
        gevent.sleep(5)
print("----1---")
g1 = gevent.spawn(f1, 5)
print("----2---")
g2 = gevent.spawn(f2, 5)
print("----3---")
g3 = gevent.spawn(f3, 5)
print("----4---")
g1.join()
g2.join()
g3.join()
