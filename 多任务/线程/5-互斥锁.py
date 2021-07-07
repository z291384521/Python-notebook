import threading
import time
'''
锁的好处：
确保了某段关键代码只能由一个线程从头到尾完整地执行
锁的坏处：
阻止了多线程并发执行，包含锁的某段代码实际上只能以单线程模式执行，效率就大大地下降了
由于可以存在多个锁，不同的线程持有不同的锁，并试图获取对方持有的锁时，可能会造成死锁
'''
#再全局中 声明互斥锁 
# # 创建锁
mutex = threading.Lock()
# # 锁定
# mutex.acquire()
# # 释放
# mutex.release()

g_num = 0
def test(count):
    global g_num
    #mutex.acquire() 此处循环执行以后才执行下个循环
    for i in range(count):
        #循环互相进行
        mutex.acquire() 
        g_num += 1
        mutex.release()

    print("-----in test g_num=%d=----" % g_num)
    #mutex.release()


def test1(count):
    global g_num
    #mutex.acquire() 此处循环执行以后才执行下个循环
    for i in range(count):
        #循环互相进行
        mutex.acquire()
        g_num += 1
        mutex.release()
    print("-----in test1 g_num=%d=----" % g_num)
    #mutex.release()

def main():
    thread1=threading.Thread(target=test,args=(1000000,))
    thread2=threading.Thread(target=test1,args=(1000000,))
    thread1.start()
    thread2.start()
    thread1.join()
    thread2.join()
    print("-----in global g_num=%d=----" % g_num)

if __name__ == "__main__":
    main()
'''
结果是这样的
打印第一句 是1000000 test加完了 828556是 test1加的
-----in test1 g_num=1828556----
-----in test2 g_num=2000000=----
-----in main Thread g_num = 2000000---
'''