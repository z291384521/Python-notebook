import os
import multiprocessing
import sys

'''
q   传入队列 用来做进度条效果
file_name   传入file文件名字
root_path   root根目录下面
'''
def rename_file_fivetosix(q, file_name, root_path):
    """完成文件的复制"""
    name_f = file_name.split('.')[0]
    type_f = file_name.split('.')[1]
    #判断文件名是不是纯数字
    if(str.isdigit(name_f)):
        filespath = os.path.join(root_path, file_name)
        #5位数变成六位数
        i=name_f.zfill(6)+'.'+type_f
        fileslowerpath = os.path.join(root_path, i)
        print(fileslowerpath)
        os.rename(filespath,fileslowerpath)
    print("----in 子进程 pid=%d ,父进程的pid=%d---" % (os.getpid(), os.getppid()))
    #用来做进度条效果      
    # q.put(file_name)


def main():
    # 1. 选择要改变的位置
    path=input('要改变的位置 没有选择为当前文件夹下面')
    if len(path) == 0 :
        path=os.path.dirname(sys.executable)
    print("要改变的目录为 %s" % path)
    # 2. 开启的进程数量
    while True:
      pool_num=input('请输入开启的进程池')
      if pool_num.isdigit():break
    pool_num=int(pool_num)
    po = multiprocessing.Pool(pool_num)
    #3.创建队列
    q = multiprocessing.Manager().Queue()
    try:
        for root, dirs, files in os.walk(path):
            for f in files:
                po.apply_async(rename_file_fivetosix, args=(q,f,root))
        po.close()
        po.join()
    except Exception as err:
        print(err)


if __name__ == "__main__":
    main()