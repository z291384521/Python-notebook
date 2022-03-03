import requests
from requests.api import request
#发送get请求
#response = requests.get("http://www.baidu.com/")
# https://movie.douban.com/j/search_subjects?
# type: movie
# tag: 热门
# page_limit: 50
# page_start: 0

#requests其他的
#r = requests.post('http://httpbin.org/post', data = {'key':'value'})
# >>> r = requests.put('http://httpbin.org/put', data = {'key':'value'})
# >>> r = requests.delete('http://httpbin.org/delete')
# >>> r = requests.head('http://httpbin.org/get')
# >>> r = requests.options('http://httpbin.org/get')
url = "https://movie.douban.com/j/search_subjects?"
payload = {
    'type': 'movie', 
    'tag': '热门',
    'page_limit': '50',
    'page_start': '0'
}
user = {'User-Agent ':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3100.0 Safari/537.36'}
respones = requests.get(url=url,params=payload,headers=user)
print(respones.url)
# print(respones.text)
print(respones.json)

print(respones.content)
print(respones.status_code)
print(respones.encoding)
# # 查看响应内容，response.text 返回的是Unicode格式的数据
# print response.text
# # 查看响应内容，response.content返回的字节流数据
# print respones.content
# # 查看完整url地址
# print response.url
 # # 查看响应头部字符编码
# print response.encoding
# # 查看响应码
# print response.status_code
# respones.cookies响应的cookie