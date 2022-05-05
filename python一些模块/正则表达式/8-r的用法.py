import re
#Python中字符串前面加上 r 表示原生字符串
mm = "c:\\a\\b\\c"
print(mm)
ret =re.match("c:\\\\",mm).group()
print(ret)