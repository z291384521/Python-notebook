#!/usr/bin/env python
# coding=utf-8
#@Information:
#@Author       : 反转旋木
#@Date         : 2022-02-25 15:43:59
#@FilePath     : \Python-notebook\alas任务管理\switch_test.py
#@Email        : 291384521@qq.com
#@LastEditTime : 2022-02-25 15:51:50


from telnetlib import STATUS
from tkinter import SW
from utils import Switch



class Test():
    
    def set_status(self, state: int) -> None:
        """
        Args:
            state (int): 
                1 (running)
                2 (not running)
                3 (warning, stop unexpectedly)
                4 (stop for update)
                0 (hide)
                -1 (*state not changed)
        """
        if state == -1:
            return

        if state == 1:
            print("运行中")
        elif state == 2:
            print("闲置的")
        elif state == 3:
            print("出错了")
        elif state == 4:
            print("更新")    
    state_switch = Switch(
        status=set_status
        
    )
        
