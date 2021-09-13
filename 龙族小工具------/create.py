import os
import shutil

filename1 = r'H:\PythonWork\自动生成空图片\a.png'


a = input("开始图片序号:")
b = input("结束图片序号:")
a = int(a)
b = int(b)
b = b+1
#变成5位数 但是变成了字符型
# a=a.zfill(5)
# b=b.zfill(5)
#变成5位数 但是变成了字符型
# a = "%05d" % (a)
# b = "%05d" % (b)
# print(type(a))
for i in range(a,b):
    i=str(i)
    i=i.zfill(5)
    filename2 = r'H:\PythonWork\自动生成空图片\测试复制\%s.png' % (i)
    shutil.copy(filename1, filename2)


