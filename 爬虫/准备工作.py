#浏览器的工作原理
#访问豆瓣排名

# 1.服务器渲染:在服务器那边直接把数据和html整合在一起。统一返回给浏览器
# 在页面源代码中能看到数据
# 2.客户端渲染:
# 第一次请求只要一个html骨架。第二次请求拿到数据。进行数据展示。

# 请求头中最常见的一些重要内容(爬虫需要):
# 1. User-Agent :请求载体的身份标识(用啥发送的请求)
# 2. Referer: 防盗链(这次请求是从哪个页面来的?反爬会用到)
# 3. cookie: 本地字符串数据信息(用户登录信息，反爬的token)
# 响应头中一些重要的内容:
# 1. cookie: 本地字符串数据信息(用户登录信息，反爬的token)
# 2.各种神奇的莫名其妙的字符串(这个需要经验了，一般都是token字样，防止各种攻击和反


#get 显示提交
#post 隐士提交


# pip install requests


# 在界面源代码中看不到数据
#客户端 请求豆瓣排行榜网页 ------->  服务端 给你一个html骨架
#要数据                   -------> 给数据




#发送get请求
#response = requests.get("http://www.baidu.com/")
# https://movie.douban.com/j/search_subjects?
# type: movie
# tag: 热门
# page_limit: 50
# page_start: 0


