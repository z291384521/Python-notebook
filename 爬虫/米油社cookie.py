cookie = "UM_distinctid=17b5745b6bd411-03218d7e296fa1-7e647c6c-1fa400-17b5745b6be2bf; _ga=GA1.2.1685418746.1629256793; _MHYUUID=a25cbc30-5b8b-46be-85d5-1a495bc7b31d; ltoken=rK1eL3PmrfL2q3gbzreooH73ai4Xg0vWvQ7f4HPu; ltuid=16345497; CNZZDATA1275023096=1604898123-1629256385-https%253A%252F%252Fwww.baidu.com%252F%7C1638160786; _gid=GA1.2.1502866054.1638165330"
import requests
import requests
import random
import hashlib
import time
import json
import string
import sys
import os
import logging
cookieUrl = "https://webapi.account.mihoyo.com/Api/cookie_accountinfo_by_loginticket?login_ticket={}"
cookieUrl2 = "https://api-takumi.mihoyo.com/auth/api/getMultiTokenByLoginTicket?login_ticket={}&token_types=3&uid={}"

def getCookie(cookie):
    Cookie = {}
    if "login_ticket" in cookie:
        cookie = cookie.split(";")
        for i in cookie:
            if i.split("=")[0] == " login_ticket":
                Cookie["login_ticket"] = i.split("=")[1]
                break
        req = requests.get(url=cookieUrl.format(Cookie["login_ticket"]))
        data = json.loads(req.text.encode('utf-8'))
        if "成功" in data["data"]["msg"]:
            Cookie["stuid"] = str(data["data"]["cookie_info"]["account_id"])
            req = requests.get(url=cookieUrl2.format(Cookie["login_ticket"], Cookie["stuid"]))
            data = json.loads(req.text.encode('utf-8'))
            Cookie["stoken"] = data["data"]["list"][0]["token"]
            print("登录成功！")
            return [1, Cookie]
        else:
            print("cookie已失效,请重新登录米游社抓取cookie")
            return [0, "cookie已失效,请重新登录米游社抓取cookie"]
    else:
        print("cookie中没有'login_ticket'字段,请重新登录米游社，重新抓取cookie!")
        return [0, "cookie中没有'login_ticket'字段,请重新登录米游社，重新抓取cookie!"]
         

getCookie(cookie=cookie)