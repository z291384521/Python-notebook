#!/usr/bin/env python
# coding=utf-8
#@Information:
#@Author       : 反转旋木
#@Date         : 2022-03-03 19:41:26
#@FilePath     : \Python-notebook\一些模块\adbutils\用法.py
#@Email        : 291384521@qq.com
#@LastEditTime : 2022-03-03 19:55:05
import adbutils

adb = adbutils.AdbClient(host="127.0.0.1", port=5037)
#adb链接信息会出现
print(adb.devices())
#[AdbDevice(serial=127.0.0.1:62001), AdbDevice(serial=127.0.0.1:62025)]
from adbutils import adb
for d in adb.devices():
    print(d.serial)
# 如果只有一个设备连接，不需要提供串行
# 如果连接了多个设备，将引发RuntimeError错误
d = adb.device(serial="127.0.0.1:62025")
d = adb.device()