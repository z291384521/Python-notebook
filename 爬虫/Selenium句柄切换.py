from selenium import webdriver
import time
from selenium import  webdriver
from selenium.webdriver.common.by import By
# 1.创建浏览器对象
driver = webdriver.Chrome()

# 2.操作浏览器对象
# driver.get('https://www.baidu.com/')
driver.get('https://www.aliyun.com/')
current_windows = driver.window_handles
print(current_windows)
driver.find_element(By.XPATH,"/html/body/div[2]/div/div/div[1]/div[2]/div[2]/a[1]").click()
# driver.find_element_by_xpath("/html/body/div[2]/div/div/div[1]/div[2]/div[2]/a[1]").click()
current_windows = driver.window_handles
print(current_windows)
#切换界面 要不然获得不了文档里面类容
driver.switch_to.window(current_windows[-1])
# //*[@id="help-index-menu"]//a
time.sleep(3)
# drs = driver.find_element_by_xpath("/html/body/div[2]/div/div[3]/div/div[1]/ul//a")
# drs = driver.find_elements_by_xpath("/html/body/div[2]/div/div[3]/div/div[1]/ul//a")
drs = driver.find_elements(By.XPATH,"/html/body/div[2]/div/div[3]/div/div[1]/ul//a")
# /html/body/div[2]/div/div[3]/div/div[1]/ul//a
# drs = driver.find_element_by_xpath("//*[@id='start-from-here']/div[2]/ul/li[1]")
for i in drs:
    print(i.get_attribute('innerText'))