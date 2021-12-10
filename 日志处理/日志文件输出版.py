# -*- coding: utf-8 -*-
# @Time    : 2021/12/10 16:13
# @Author  : ZRQ
# @Email   : 291384521@qq.com
# @File    : 日志文件输出版.py
# @Software: PyCharm
'''
日志文件
Logging.Formatter：
这个类配置了日志的格式，在里面自定义设置日期和时间，输出日志的时候将会按照设置的格式显示内容。
Logging.Logger：Logger是Logging模块的主体，进行以下三项工作：
1. 为程序提供记录日志的接口
2. 判断日志所处级别，并判断是否要过滤
3. 根据其日志级别将该条日志分发给不同handler
常用函数有：
Logger.addFilter() 添加一个Filter,过滤作用
Logging.Handler：Handler基于日志级别对日志进行分发，如设置为WARNING级别的Handler只会处理WARNING及以上级别的日志。
常用函数有：
setLevel() 设置级别
setFormatter() 设置Formatter
format常用格式说明
%(levelno)s: 打印日志级别的数值
%(levelname)s: 打印日志级别名称
%(pathname)s: 打印当前执行程序的路径，其实就是sys.argv[0]
%(filename)s: 打印当前执行程序名
%(funcName)s: 打印日志的当前函数
%(lineno)d: 打印日志的当前行号
%(asctime)s: 打印日志的时间
%(thread)d: 打印线程ID
%(threadName)s: 打印线程名称
%(process)d: 打印进程ID
%(message)s: 打印日志信息
'''
import logging
import os.path
import time
#第一步，创建一个logger
logger = logging.getLogger()
# Log等级总开关
logger.setLevel(logging.INFO)
#第二步，创建一个handler，用于写入日志文件

rq = time.strftime('%Y%m%d%H%M', time.localtime(time.time()))
#os.getcwd() 方法用于返回当前工作目录。
#os.path.dirname去掉文件名，返回目录
log_path = os.path.dirname(os.getcwd()) + '\\Logs\\'
log_name = log_path + rq + '.log'
logfile = log_name
#创建日志对比
fh = logging.FileHandler(logfile, mode='w',encoding='utf-8')
#这个就是输出到控制台的流
ch = logging.StreamHandler()
ch.setLevel(logging.WARNING)  # 输出到console的log等级的开关
# 第三步，定义handler的输出格式
formatter = logging.Formatter("%(asctime)s - %(filename)s[line:%(lineno)d] - %(levelname)s: %(message)s")
fh.setFormatter(formatter)
ch.setFormatter(formatter)
logger.addHandler(ch)
# 第四步，将logger添加到handler里面
logger.addHandler(fh)
# 日志
logger.debug('this is a logger debug message')
logger.info('this is a logger info message')
logger.warning('this is a logger warning message')
logger.error('this is a logger error message')
logger.critical('this is a logger critical message')