#!/usr/bin/env python
# coding=utf-8
#@Information:
#@Author       : 反转旋木
#@Date         : 2022-02-10 16:16:49
#@FilePath     : \Python-notebook\git自动更新模块\deploy\config.py
#@Email        : 291384521@qq.com
#@LastEditTime : 2022-02-10 16:38:44


import copy

from git自动更新模块.deploy.utils import *


class ExecutionError(Exception):
    pass