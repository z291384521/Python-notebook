# -*- coding: utf-8 -*-
# @Time    : 2021/12/06 15:43
# @Author  : ZRQ
# @Email   : 291384521@qq.com
# @File    : selenium_面向对象爬取.py.py
# @Software: PyCharm




from selenium import webdriver
import time
class Douyu(object):
    def __init__(self):
        self.url = 'https://www.douyu.com/directory/all'
        self.driver = webdriver.Chrome()

    def parse_data(self):
        pass
    def run(self):
        pass
if __name__ == '__main__':
    douyu = Douyu()
    douyu.run()