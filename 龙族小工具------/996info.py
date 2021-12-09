# -*- coding: utf-8 -*-
# @Time    : 2021/12/08 15:20
# @Author  : ZRQ
# @Email   : 291384521@qq.com
# @File    : 996info.py
# @Software: PyCharm
import math
import random
import time
import hashlib
import requests
import json


# data = '{"box_game_id":"1235","rqtime":1638938476000,"rqrandom":"AQ4S81PKEC9E8H4KMX5DZY7HS3T5GWE9","sign":"9045d7cc8251b411c29b7deabefa48af"}'
# response = requests.post('https://pc-api.996box.com/v1/homeapi/gameindex/gameInfo', headers=headers, data=data)

class boxinfo_996(object):
    def __init__(self):
        self.url = 'https://pc-api.996box.com/v1/homeapi/gameindex/gameInfo'
        self.headers = {
    'authority': 'pc-api.996box.com',
    'pragma': 'no-cache',
    'cache-control': 'no-cache',
    'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="96", "Microsoft Edge";v="96"',
    'sec-ch-ua-mobile': '?0',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.55 Safari/537.36 Edg/96.0.1054.43',
    'content-type': 'application/json;charset=UTF-8',
    'appv': '1.0.0',
    'device': 'pc',
    'token': 'null',
    'sec-ch-ua-platform': '"Windows"',
    'accept': '*/*',
    'origin': 'http://pc.996box.com',
    'sec-fetch-site': 'cross-site',
    'sec-fetch-mode': 'cors',
    'sec-fetch-dest': 'empty',
    'referer': 'http://pc.996box.com/',
    'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
}
    '''
    签名方法重写的
    '''
    def toSign(obj):
        #按照升序排序obj属性
        sortObj = obj
        chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K',
                 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
        resNum = ""
        # 生成随机数
        for i in range(0,32):
            id = math.ceil(random.random() * 35)
            resNum += chars[id];
        print(resNum)
        print(sortObj)
        newkey = [i for i in sortObj.keys()]
        newkey.sort()
        print(newkey)
        #新的字典函数
        newObj={}
        #便利循环
        for i in newkey:
            newObj[i]=sortObj[i]

        #不知道这个列表干嘛
        keyArr = []
        for k,v in newObj.items():
            x=v
            print(v)
            keyArr.append(x)
        print(keyArr)
        #13位时间戳
        time_t=time.time()
        newObj['rqtime'] = int(round(time_t*1000))
        newObj['rqrandom'] = resNum
        keyArr.append("7PZJImoeAE5Dnjb6pCYu8Ja5Buhb2urL")
        keyArr.append(newObj['rqtime'])
        keyArr.append(newObj['rqrandom'])
        print(keyArr)
        sginStr = ""
        #拼接成为sginStr
        for i in keyArr:
            i=str(i)
            sginStr+=i
        print(sginStr)
        sginStr=hashlib.md5(sginStr.encode(encoding='UTF-8')).hexdigest()
        sginStr.lower()
        print(sginStr)
        newObj['sign'] = sginStr
        print(newObj)
    def response_info(slef,box_game_id):
        data = {'box_game_id':box_game_id}
        data=json.dumps(data)
        # print(data)
        response = requests.post(url=slef.url,headers=slef.headers,data=data,verify=False)
        response =response.json()
        return  slef.info_chuli(response)


    '''
    对于返回的json处理 存放路数据文本.txt里面 #对于返回非200数据删除掉
    '''
    def info_chuli(self,game_data):
        #状态码不为两百不处理
        if(game_data['code'] != 200):
            time.sleep(0.1)
            return
        #筛选data里面的数据
        game_data_info =game_data['data']['game_info']
        game_new_data={}
        game_new_data['游戏编号']=game_data_info['box_game_id']
        game_new_data['游戏名字']=game_data_info['game_name']
        game_new_data['公司编号'] = game_data_info['factory_id']
        game_new_data['公司名字'] = game_data_info['factory_name']
        game_new_data['游戏标签'] =game_data_info['game_tags']
        game_new_data['安卓下载']=game_data_info['down_url_android']
        game_new_data['IOS下载']=game_data_info['ios_download_url']
        time.sleep(0.5)
        return game_new_data
if __name__ == '__main__':
    game_datas=[]
    games_info = boxinfo_996()
    for i in range(0,9999):
        data =games_info.response_info(i)
        if data !=None :
            game_datas.append(data)
    newjson = open("996游戏信息.json", 'w', encoding='utf-8')
    json.dump(game_datas, newjson, ensure_ascii=False)