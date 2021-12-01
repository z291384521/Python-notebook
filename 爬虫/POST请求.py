import requests
import hashlib
import time
import random
import json
#2 post 数据源
# 1 固定值  
# 2 输入值
# 3 预设值-静态文件
# 4 预设值-发请求
# 5 在客户端生成的 
formdata={'i': '我的世界',
'from':'AUTO',
'to': 'AUTO',
'smartresult': 'dict',
'client': 'fanyideskweb',
'salt': '16354941003699',
'sign': '7260d22d0b6f876ac5842aeee7b0b45d',
'lts': '1635494100369',
'bv': '318dde5ec635786619012045ee59bf8a',
'doctype': 'json',
'version': '2.1',
'keyfrom': 'fanyi.web',
'action': 'FY_BY_CLICKBUTTION'}

formdata1 = {
    "type":"AUTO",
    "i":"i love python",
    "doctype":"json",
    "xmlVersion":"1.8",
    "keyfrom":"fanyi.web",
    "ue":"UTF-8",
    "action":"FY_BY_ENTER",
    "typoResult":"true"
}
 
url = "https://fanyi.youdao.com/translate_o?smartresult=dict&smartresult=rule"
 
headers = {'User-Agent ':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3100.0 Safari/537.36'}
response = requests.post(url, data = formdata, headers = headers)
 
print(response.text)
 
# 如果是json文件可以直接显示
print(response.json())

def get_md5(value):
    md5 = hashlib.md5()
    md5.update(value.encode('utf-8'))
    return md5.hexdigest()

#