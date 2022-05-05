#search
import re
#match 从头开始匹配
#search 匹配
ret =re.search(r"\d+","阅读数量 99999 hhh 88888")
print(ret.group())
#findall
#放回匹配的列表
ret = re.findall(r"\d+", "python = 9999, c = 7890, c++ = 12345")
#不需要 group
print(ret)
'''
运行结果：
['9999', '7890', '12345']
'''
#sub 将匹配到的数据进行替换
ret = re.sub(r"\d+", '998', "python = 997")
#不需要 group
print(ret)
#sub传递方法（PYthon独有的方法）
def add(num):
    strnum = num.group()
    strnum = int(strnum) 
    strnum += 100
    #放回值为 str的
    return str(strnum)

ret = re.sub(r"\d+", add, "python = 997")
print(ret)

#split 根据匹配进行切割字符串，并返回一个列表
#需求：切割字符串“info:xiaoZhang 33 shandong”
ret = re.split(r":| ","info:xiaoZhang 33 shandong")
print(ret)