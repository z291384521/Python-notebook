# -*- coding: utf-8 -*-
# @Time    : 2021/12/06 10:05
# @Author  : ZRQ
# @Email   : 291384521@qq.com
# @File    : selenium_延迟执行.py.py
# @Software: PyCharm

'''
1. 强制等待
2. 隐式等待
3. 显式等待

#### 强制等待（了解）
- 其实就是time.sleep()
- 缺点时不智能，设置的时间太短，元素还没有加载出来；设置的时间太长，则会浪费时间
####  隐式等待
- 隐式等待针对的是元素定位，隐式等待设置了一个时间，在一段时间内判断元素是否定位成功，如果完成了，就进行下一步
- 在设置的时间内没有定位成功，则会报超时加载
#### 显式等待（了解）
- 每经过多少秒就查看一次等待条件是否达成，如果达成就停止等待，继续执行后续代码
- 如果没有达成就继续等待直到超过规定的时间后，报超时异常
'''
# from selenium import  webdriver

# url ='http://www.baidu.com'
# driver=webdriver.Chrome()
# #设置位置之后所有元素定位操作都有最大等待设置七秒，在10秒内会定期进行元素定位，超过时间以后会报错
# driver.implicitly_wait(10)
# driver.get(url)
# el = driver.find_element_by_xpath("//*[@id='lg']/map/area")
# print(el)
# driver.quit()
from selenium import webdriver
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By

driver = webdriver.Chrome()
driver.get('https://www.baidu.com')
# 显式等待
# 参数20表示最长等待20秒
# 参数0.5表示0.5秒检查一次规定的标签是否存在
# EC.presence_of_element_located((By.LINK_TEXT, '好123')) 表示通过链接文本内容定位标签
# 每0.5秒一次检查，通过链接文本内容定位标签是否存在，如果存在就向下继续执行；如果不存在，直到20秒上限就抛出异常
WebDriverWait(driver,10,0.5).until(EC.presence_of_element_located((By.LINK_TEXT, '好123')))
# print(driver.find_element_by_link_text('hao123').get_attribute('href'))
driver.quit()
