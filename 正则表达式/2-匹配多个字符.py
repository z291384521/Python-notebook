'''
*	匹配前一个字符出现0次或者无限次，即可有可无
+	匹配前一个字符出现1次或者无限次，即至少有1次
?	匹配前一个字符出现1次或者0次，即要么有1次，要么没有
{m}	匹配前一个字符出现m次
{m,n}	匹配前一个字符出现从m到n次
'''
import re
ret = re.match("[A-Z][a-z]*","Aabcdef")
print(ret.group())
import re

names = ["name1", "_name", "2_name", "__name__"]

for name in names:
    ret = re.match("[a-zA-Z_]+[\w]*",name)
    if ret:
        print("变量名 %s 符合要求" % ret.group())
    else:
        print("变量名 %s 非法" % name)


ret = re.match("[1-9]?\d","09")
'''
0 # 这个结果并不是想要的，利用$才能解决
'''
print(ret.group())


'''
题目1：匹配出163的邮箱地址，且@符号之前有4到20位，例如hello@163.com
'''
ret = re.match("\w{4,20}@","hello@163.com")
print(ret.group())