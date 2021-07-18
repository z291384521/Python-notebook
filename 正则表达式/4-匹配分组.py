'''
|	匹配左右任意一个表达式
(ab)	将括号中字符作为一个分组
\num	引用分组num匹配到的字符串
(?P<name>)	分组起别名
(?P=name)	引用别名为name分组匹配到的字符串
'''
import re
# | 等于 or
#下面约等于[a-zA-Z_0-9]{4,20}@163 和qq\.com
ret = re.match(r"[a-zA-Z_0-9]{4,20}@163|qq\.com$", "1111@163")
ret.group()
#要想匹配完整的要 加了小括号可以
ret = re.match(r"[a-zA-Z_0-9]{4,20}@(163|qq)\.com$", "1111@163.com")
ret.group()
ret.group(1)

labels = ["<html><h1>www.itcast.cn</h1></html>", "<html><h1>www.itcast.cn</h2></html>"]

for label in labels:
    ret = re.match(r"<(\w*)><(\w*)>.*</\2></\1>",label)
    if ret:

        print("%s 是符合要求的标签" % ret.group())
        print(ret.group(1))
        print(ret.group(2))
       #print(ret.group(3))
    else:
        print("%s 不符合要求" % label)

ret = re.match(r"<(?P<name1>\w*)><(?P<name2>\w*)>.*</(?P=name2)></(?P=name1)>", "<html><h1>www.itcast.cn</h1></html>")
print(ret.group("name1"))
