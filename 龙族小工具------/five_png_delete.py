import logging
import os
import sys
import multiprocessing
from multiprocessing import Process, Pool
import  time
import mul_process_package

def remove_png(file_name, root_path):
    name_f = file_name.split('.')[0]
    type_f = file_name.split('.')[1]
    if (str.isdigit(name_f) and len(name_f)==5):
        i = name_f+'.'+type_f
        fileslowerpath =os.path.join(root_path, i)
        print('当前进程:%s pid:%d' % (multiprocessing.current_process().name,
                                  multiprocessing.current_process().pid))
        print(fileslowerpath)

        os.remove(fileslowerpath)


def mkdir(path):
    # 去除首位空格
    path = path.strip()
    # 去除尾部 \ 符号
    path = path.rstrip("\\")

    # 判断路径是否存在
    # 存在     True
    # 不存在   False
    isExists = os.path.exists(path)

    # 判断结果
    if not isExists:
        os.makedirs(path)
        return True

def ini_log(logger,ospath):
    # 第一步，创建一个logger
    logger = logging.getLogger()
    # Log等级总开关
    logger.setLevel(logging.INFO)
    # 第二步，创建一个handler，用于写入日志文件
    rq = time.strftime('%Y%m%d%H%M', time.localtime(time.time()))
    # os.getcwd() 方法用于返回当前工作目录。
    # os.path.dirname去掉文件名，返回目录
    log_path = ospath + '\\Logs\\'
    mkdir(log_path)
    print(log_path)
    log_name = log_path + rq + '.log'
    logfile = log_name
    # 创建日志对比
    fh = logging.FileHandler(logfile, mode='w', encoding='utf-8')
    # 这个就是输出到控制台的流
    ch = logging.StreamHandler()
    ch.setLevel(logging.INFO)  # 输出到console的log等级的开关
    # 第三步，定义handler的输出格式
    formatter = logging.Formatter("%(asctime)s - %(filename)s[line:%(lineno)d] - %(levelname)s: %(message)s")
    fh.setFormatter(formatter)
    ch.setFormatter(formatter)
    logger.addHandler(ch)
    # 第四步，将logger添加到handler里面
    logger.addHandler(fh)



if __name__ == '__main__':
    multiprocessing.freeze_support()
    logger = None

    path = input('要改变的位置 没有选择为当前文件夹下面')
    #如果不输入当前目录
    if len(path) == 0 :
        path=os.path.dirname(sys.executable)
    ini_log(logger,os.path.dirname(sys.executable))
    print("要改变的目录为 %s" % path)
    #输入要开启的进程

    pool_num=input('请输入开启的进程池')

    pool_num = int(pool_num)
    po=Pool(pool_num)
    for root, dirs, files in os.walk(path):
        for f in files:
            po.apply_async(remove_png, args=(f, root,))

    po.close()  # 关闭进程池，防止将任何其他任务提交到池中。需要在join之前调用，否则会报ValueError: Pool is still running错误
    po.join()    # 等待进程池中的所有进程执行完毕
    print("-----end-----")