#!/usr/bin/env python
# coding=utf-8
#@Information:
#@Author       : 反转旋木
#@Date         : 2022-02-15 12:12:51
#@FilePath     : \Python-notebook\语法测试\retry重试模块装饰器.py
#@Email        : 291384521@qq.com
#@LastEditTime : 2022-02-15 14:53:50
#很简单pip install retry




#def retry(exceptions=Exception, tries=-1, delay=0, max_delay=None, backoff=1, jitter=0, logger=logging_logger):    
"""
    Returns a retry decorator.
    :param exceptions: an exception or a tuple of exceptions to catch. default: Exception.
    :param tries: the maximum number of attempts. default: -1 (infinite).
    :param delay: initial delay between attempts. default: 0.
    :param max_delay: the maximum value of delay. default: None (no limit).
    :param backoff: multiplier applied to delay between attempts. default: 1 (no backoff).
    :param jitter: extra seconds added to delay between attempts. default: 0.
                   fixed if a number, random if a range tuple (min, max)
    :param logger: logger.warning(fmt, error, delay) will be called on failed attempts.
                   default: retry.logging_logger. if None, logging is disabled.
    :returns: a retry decorator.

    Return a retry decorator.
    ：param exceptions：捕获异常或异常元组。 默认：Exception。
    ：param tries：Exception最大尝试次数。 默认值：-1（无限）。
    ：param delay：尝试之间的初始延迟。 默认值：0。
    ：param max_delay：延迟的最大值。 默认值：无（无限制）。
    ：param backoff：乘法器应用于尝试之间的延迟。 默认值：1（无退避）。
    ：param jitter：额外的秒数添加到尝试之间的延迟。 默认值：0。
               如果数字固定，则随机如果范围元组（最小值，最大值）
    ：param logger：logger.warning（fmt，error，delay）将在失败尝试中调用。
                    默认值：retry.logging_logger。 如果无，则记录被禁用。
    返回一个重装装饰器
"""

import time
from retry import retry
#是个方法 不是装饰器
from retry.api import retry_call
import requests

@retry()
def make_trouble():
    '''Retry until succeed'''
    print ('retrying...')
    raise

@retry(ValueError, delay=1, jitter=1)
def make_trouble():
    '''Retry on ValueError, sleep 1, 2, 3, 4, ... seconds between attempts.'''
    print (1, int(time.time()))
    raise ValueError('e')



def make_trouble(service, info=None):
    if not info:
        info = ''
    print ('retry..., service: {},  info: {}'.format(service, info))
    r = requests.get(service + info)
    print(r.text)
    raise Exception('info')
 
def what_is_my_ip(approach=None):
    if approach == "optimistic":
        tries = 1
    elif approach == "conservative":
        tries = 3
    else:
        # skeptical
        tries = -1
    result = retry_call(make_trouble, fargs=["http://ipinfo.io/"], fkwargs={"info": "ip"}, tries=tries)
    print(result)



if __name__ == '__main__':
    # import logging
    # logging.basicConfig()
    # make_trouble()
    what_is_my_ip("conservative")
