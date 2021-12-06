# -*- coding: utf-8 -*-
# @Time    : 2021/12/06 14:57
# @Author  : ZRQ
# @Email   : 291384521@qq.com
# @File    : selenium_界面等待手动版.py.py
# @Software: PyCharm

import time
from  selenium import  webdriver
driver = webdriver.Chrome()
driver.get('https://www.taobao.com')
for i in range(10):
    i += 1
    try:
        time.sleep(3)
        element = driver.find_element_by_xpath('//div[@class="shop-inner"]/h3[1]/a')
        print(element.get_attribute('href'))
        break
    except:
        js = 'window.scrollTo(0, {})'.format(i*500) # js语句
        driver.execute_script(js) # 执行js的方法
driver.quit()