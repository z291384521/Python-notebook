import requests
 
# 根据协议类型，选择不同的代理
proxies = {
  "http": "http://12.34.56.79:9527",
  "https": "http://12.34.56.79:9527",
}
 
response = requests.get("http://www.baidu.com", proxies = proxies)
print(response.text)
#也可以通过本地环境变量 HTTP_PROXY 和 HTTPS_PROXY 来配置代理：