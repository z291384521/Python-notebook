#代理 帮我们转发请求
# 为浏览器 或客户端 转发请求叫正向代理
#不为浏览器或客户端 转发请求 而是为了最终处理请求的服务器转发请求 叫做反向代理
# Nginx负载均衡

# 代理分类
# 通明代理  对方可以自己查到你的IP
# 匿名代理  对方知道你用了代理
# 高匿代理  对方不知道你用没用代理
# 一般使用高匿代理

# 协议分类
# http
# https
# socks
import requests
# url=""
# proxies={
#     "http":"http://xxxxxxxxx",
#     "https":"https://xxxxxxxxxxxxxxxx"
# }
url="http://www.baidu.com"
proxies = {
    "htpp":"124.204.33.162:8000"
}
response = requests.get(url,proxies)
print(response.text)