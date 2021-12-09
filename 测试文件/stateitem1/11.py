# -*- coding: utf-8 -*-
# @Time    : 2021/12/09 10:08
# @Author  : ZRQ
# @Email   : 291384521@qq.com
# @File    : 11.py
# @Software: PyCharm

import requests
headers = {

    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.55 Safari/537.36 Edg/96.0.1054.43',
    'content-type': 'application/json;charset=UTF-8'
}

data = '{"box_game_id":"1235","rqtime":1638938476000,"rqrandom":"AQ4S81PKEC9E8H4KMX5DZY7HS3T5GWE9","sign":"9045d7cc8251b411c29b7deabefa48af"}'

response = requests.post('http://pc-api.996box.com/v1/homeapi/gameindex/gameInfo', headers=headers, data=data)
print(response.text)