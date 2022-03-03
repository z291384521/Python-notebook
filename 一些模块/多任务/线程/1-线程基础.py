import time
import threading
def sing():
   for i in range(5): 
        print("唱歌")
        time.sleep(1)

def dance():
   for i in range(5): 
        print("跳舞")
        time.sleep(1)

def main():
    t1 = threading.Thread(target=sing)
    t2 = threading.Thread(target=dance)
    #start创建完了线程
    #当调用Thread的时候，不会创建线程
    #当调用Thread创建出来的实例对象的start方法地时候
    #才会创建线程以及让这个线程开始运行

    t1.start()
    time.sleep(1)
    print("---1---")

    t2.start()

    time.sleep(1)
    print("---2---")
    for i in range(5):
        #查询程序调用的线程数量
        print(threading.enumerate())
        time.sleep(1)

#线程执行的顺序没有
#保证先后顺序要用延迟执行操作
#主线程结束 子线程也结束了
if __name__ == "__main__":
    main()