# -*- coding: utf-8 -*-
# @Time    : 2021/12/06 15:30
# @Author  : ZRQ
# @Email   : 291384521@qq.com
# @File    : selenium_代理_替换user-agent_开启无界面模式.py.py
# @Software: PyCharm
from selenium import webdriver
# 开启无界面模式的方法
#实例化配置对象
options =webdriver.ChromeOptions()
#开启无界面模式
options.add_argument("--headless")
options.add_argument("--disable-gpu")
# options.set_headles() # 无界面模式的另外一种开启方式
driver = webdriver.Chrome(chrome_options=options) # 实例化带有配置的driver对象
driver.get('http://www.itcast.cn')
print(driver.title)
driver.quit()

#options = webdriver.ChromeOptions() # 创建一个配置对象
# options.add_argument('--proxy-server=http://202.20.16.82:9527') # 使用代理ip
#
# driver = webdriver.Chrome(chrome_options=options) # 实例化带有配置的driver对象
#
# driver.get('http://www.itcast.cn')
# print(driver.title)
# driver.quit()
# options = webdriver.ChromeOptions() # 创建一个配置对象
# options.add_argument('--user-agent=Mozilla/5.0 HAHA') # 替换User-Agent