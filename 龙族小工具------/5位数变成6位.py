import os
import shutil
import sys
import re
# ret = re.match("\d*","00000jj")
# print(ret.group())
path=input('要改变的位置')
if len(path) == 0 :
    path=os.path.dirname(sys.executable)
print("要改变的目录为 %s" % path)
try:
    for root, dirs, files in os.walk(path):
        #改变文件的大小写
        for f in files:
            #剔除后缀
            name_f = f.split('.')[0]
            type_f = f.split('.')[1]
            #判断文件名是不是纯数字
            if(str.isdigit(name_f)):
                filespath = os.path.join(root, f)
                #5位数变成六位数
                i=name_f.zfill(6)+'.'+type_f
                fileslowerpath = os.path.join(root, i)
                print(fileslowerpath)
                os.rename(filespath,fileslowerpath)        
except Exception as err:
    print(err)
print("皮卡丘使用十万伏特-----已经倒下了")
input("输入任意结束")