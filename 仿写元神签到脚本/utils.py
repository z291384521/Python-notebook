# -*- coding: utf-8 -*-
# @Time    : 2021/12/10 14:49
# @Author  : ZRQ
# @Email   : 291384521@qq.com
# @File    : utils.py
# @Software: PyCharm

import logging
import os

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s %(levelname)s %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S')
log = logger = logging
#os.path.abspath() 当前目录路径f
_localedir = os.path.join(os.path.abspath(os.path.dirname(__file__)), 'locale')