'''
Selenium是一个Web的自动化测试工具，最初是为网站自动化测试而开发的，Selenium 可以直接调用浏览器，它支持所有主流的浏览器（包括PhantomJS这些无界面的浏览器），可以接收指令，让浏览器自动加载页面，获取需要的数据，甚至页面截屏等。
我们可以使用selenium很容易完成之前编写的爬虫，接下来我们就来看一下selenium的运行效果
'''
from selenium import webdriver
# # 如果driver没有添加到了环境变量，则需要将driver的绝对路径赋值给executable_path参数
# # 如果driver添加了环境变量则不需要设置executable_path
# driver = webdriver.Chrome(executable_path=r'爬虫\软件\chromedriver.exe')
# driver.get("http://www.itcast.cn/")
# print(driver.title)
# driver.quit()

'''
####  phantomjs无界面浏览器的运行效果

PhantomJS 是一个基于Webkit的“无界面”(headless)浏览器
它会把网站加载到内存并执行页面上的 JavaScript。下
载地址：
http://phantomjs.org/download.html
'''
# 指定driver的绝对路径
driver = webdriver.PhantomJS(executable_path=r'爬虫\软件\phantomjs-2.1.1-windows\bin\phantomjs.exe') 
# driver = webdriver.Chrome(executable_path='/home/worker/Desktop/driver/chromedriver')

# 向一个url发起请求
driver.get("http://www.itcast.cn/")

# 把网页保存为图片
driver.save_screenshot("itcast.png")

# 退出模拟浏览器
driver.quit() # 一定要退出！不退出会有残留进程！