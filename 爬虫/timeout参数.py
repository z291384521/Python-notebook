import requests

url = "https://twitter.com"
#3秒后不再请求
response = requests.get(url,timeout=3)