from selenium import webdriver
import time

from selenium.webdriver.common import by
'''
1. `driver.page_source` 当前标签页浏览器渲染之后的网页源代码
2. `driver.current_url` 当前标签页的url
3. `driver.close()` 关闭当前标签页，如果只有一个标签页则关闭整个浏览器
4. `driver.quit()` 关闭浏览器
5. `driver.forward()` 页面前进
6. `driver.back()` 页面后退
7. `driver.screen_shot(img_name)` 页面截图
'''
# 1.创建浏览器对象
driver = webdriver.Chrome(executable_path=r'爬虫\软件\chromedriver.exe')
# 2.操作浏览器对象
# driver.get('https://www.baidu.com/')
driver.get('https://www.epicgames.com/store/zh-CN/')
#显示html代码
# print(driver.page_source)
#显示标签页的url
# print(driver.current_url)
# print(driver.title)
# 2.定位元素
# driver.find_element_by_xpath('//*[@id="kw"]').send_keys('python37')
# driver.find_element_by_xpath('//*[@id="su"]').click()
#推出
# driver.quit()


'''
find_element_by_id 						(返回一个元素)
find_element(s)_by_class_name 			(根据类名获取元素列表)
find_element(s)_by_name 				(根据标签的name属性值返回包含标签对象元素的列表)
find_element(s)_by_xpath 				(返回一个包含元素的列表)
find_element(s)_by_link_text 			(根据连接文本获取元素列表)
find_element(s)_by_partial_link_text 	(根据链接包含的文本获取元素列表)
find_element(s)_by_tag_name 			(根据标签名获取元素列表)
find_element(s)_by_css_selector 		(根据css选择器来获取元素列表)
'''
time.sleep(5)
# driver.find_element_by_class_name("s_ipt").send_keys('过文学')
# //*[@id="user"]/ul/li/a/span
# driver.find_element_by_class_name('sign-text item-label display-name text-color').click()
driver.find_element(by.By.CLASS_NAME,'sign-text item-label display-name text-color')
# driver.find_element_by_xpath('//*[@id="user"]/ul/li/a').click()
# print(driver.find_element_by_class_name("sign-text item-label display-name text-color"))
# time.sleep(5)
# driver.find_element_by_xpath('//*[@id="login-with-epic"]/span').click()

# get_attribute('href')
'''
- 对元素执行点击操作`element.click()`
  - 对定位到的标签对象进行点击操作
- 向输入框输入数据`element.send_keys(data)`
  - 对定位到的标签对象输入数据
- 向输入框输入数据`element.clear()清除`
  - 对定位到的标签对象清除数据  
- 获取文本`element.text`
  - 通过定位获取的标签对象的`text`属性，获取文本内容
- 获取属性值`element.get_attribute("属性名")`
  - 通过定位获取的标签对象的`get_attribute`函数，传入属性名，来获取属性的值
'''