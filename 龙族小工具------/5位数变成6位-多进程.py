import os
import multiprocessing
import time
def run_pro(name):
        print("------打印传入的值 %s pid=%d ------" % (name,os.getpid()))
        time.sleep(1)
        print("1111111")
def main():
    po = multiprocessing.Pool(2)
    for num in range(0,5):
        po.apply_async(run_pro, args=(num,))
    po.close()
    po.join()
if __name__ == "__main__":
    main()
