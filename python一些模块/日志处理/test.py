# -*- coding: utf-8 -*-
# @Time    : 2021/12/10 15:58
# @Author  : ZRQ
# @Email   : 291384521@qq.com
# @File    : test.py
# @Software: PyCharm
# 引入logging模块
import logging
# 如果设置了日志级别为NOTSET,那么这里可以采取debug、info的级别的内容也可以显示在控制台上了
logging.basicConfig(level=logging.NOTSET)
# 将信息打印到控制台上
logging.debug(u"苍井空")
logging.info(u"麻生希")
logging.warning(u"小泽玛利亚")
logging.error(u"桃谷绘里香")
logging.critical(u"泷泽萝拉")
#会发现只显示info下面的是因为级别关系
# 级别排序:CRITICAL > ERROR > WARNING > INFO > DEBUG
"""
debug : 打印全部的日志,详细的信息,通常只出现在诊断问题上
info : 打印info,warning,error,critical级别的日志,确认一切按预期运行
warning : 打印warning,error,critical级别的日志,一个迹象表明,一些意想不到的事情发生了,
或表明一些问题在不久的将来(例如。磁盘空间低”),这个软件还能按预期工作
error : 打印error,critical级别的日志,更严重的问题,软件没能执行一些功能
critical : 打印critical级别,一个严重的错误,这表明程序本身可能无法继续运行
"""
