# -*- coding: utf-8 -*-
# @Time    : 2021/12/08 15:20
# @Author  : ZRQ
# @Email   : 291384521@qq.com
# @File    : 996info.py
# @Software: PyCharm
import math
import  random
import time

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
    sginStr = ""

    print(newObj)
if __name__ == '__main__':
    t = {'module_index': '2100', 'deed': 1, 'relation_id': '969'}
    toSign(t)