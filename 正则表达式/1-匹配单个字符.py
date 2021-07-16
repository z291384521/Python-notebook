 # 导入re模块
import re
# 使用match方法进行匹配操作
# result = re.match(正则表达式,要匹配的字符串)

# 如果上一步匹配到数据的话，可以使用group方法来提取数据
# result.group()
'''
.	匹配任意1个字符（除了\n）
[ ]	匹配[ ]中列举的字符
\d	匹配数字，即0-9
\D	匹配非数字，即不是数字
\s	匹配空白，即 空格，tab键
\S	匹配非空白
\w	匹配单词字符，即a-z、A-Z、0-9、_
\W	匹配非单词字符
'''
#region 
'''
.的用法
'''
ret = re.match(".","M")
print(ret.group())

ret = re.match("t.o","too")
print(ret.group())

ret = re.match("t.o","two")
print(ret.group())
'''
[ ]
'''
#coding=utf-8

import re

# 如果hello的首字符小写，那么正则表达式需要小写的h
ret = re.match("h","hello Python") 
print(ret.group())


# 如果hello的首字符大写，那么正则表达式需要大写的H
ret = re.match("H","Hello Python") 
print(ret.group())

# 大小写h都可以的情况
ret = re.match("[hH]","hello Python")
print(ret.group())
ret = re.match("[hH]","Hello Python")
print(ret.group())
ret = re.match("[hH]ello Python","Hello Python")
print(ret.group())

# 匹配0到9第一种写法
ret = re.match("[0123456789]Hello Python","7Hello Python")
print(ret.group())

# 匹配0到9第二种写法
ret = re.match("[0-9]Hello Python","7Hello Python")
print(ret.group())

ret = re.match("[0-35-9]Hello Python","7Hello Python")
print(ret.group())

# 下面这个正则不能够匹配到数字4，因此ret为None
ret = re.match("[0-35-9]Hello Python","4Hello Python")
# print(ret.group())
'''
\d
'''
# 普通的匹配方式
ret = re.match("嫦娥1号","嫦娥1号发射成功") 
print(ret.group())

ret = re.match("嫦娥2号","嫦娥2号发射成功") 
print(ret.group())

ret = re.match("嫦娥3号","嫦娥3号发射成功") 
print(ret.group())

# 使用\d进行匹配
ret = re.match("嫦娥\d号","嫦娥1号发射成功") 
print(ret.group())

ret = re.match("嫦娥\d号","嫦娥2号发射成功") 
print(ret.group())

ret = re.match("嫦娥\d号","嫦娥3号发射成功") 
print(ret.group())



#endregion
def main():
	names = ["age", "_age", "1age", "age1", "a_age", "age_1_", "age!", "a#123", "__________"]
	for name in names:
		# ret = re.match(r"[a-zA-Z_][a-zA-Z0-9_]*", name)
		# ^规定开头  $规定结尾  
		# python中的match默认是从头开始判断的所以，在match中可以不写^，但是match不会判断结尾，所以
		# 当需要以xxx结尾的时候 还需要写上$
		ret = re.match(r"^[a-zA-Z_][a-zA-Z0-9_]*$", name)
		if ret:
			print("变量名:%s 符合要求....通过正则匹配出来的数据是:%s" % (name, ret.group()))
		else:
			print("变量名:%s 不符合要求...." % name)
if __name__ == "__main__":
    	main()