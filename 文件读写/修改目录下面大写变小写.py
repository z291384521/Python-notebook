import os
import shutil
import sys
print('''
    へ　　　　　／|
　　/＼7　　　 ∠＿/
　 /　│　　 ／　／
　│　Z ＿,＜　／　　 /`ヽ
　│　　　　　ヽ　　 /　　〉
　 Y　　　　　`　 /　　/
　ｲ●　､　●　　⊂⊃〈　　/
　()　 へ　　　　|　＼〈
　　>ｰ ､_　 ィ　 │ ／／
　 / へ　　 /　ﾉ＜| ＼＼
　 ヽ_ﾉ　　(_／　 │／／
　　7　　　　　　　|／
　　＞―r￣￣`ｰ―＿
  ''')
path=input('要改变的位置')
if len(path) == 0 :
    path=os.path.dirname(sys.executable)
print("要改变的目录为 %s" % path)
try:
    for root, dirs, files in os.walk(path):
        #改变文件的大小写
        for f in files:
            filespath = os.path.join(root, f)
            #print(filespath)
            fileslowerpath = os.path.join(root, f.lower())
            os.rename(filespath,fileslowerpath)
        #改变目录的大小写
        for d in dirs:
            dirspath = os.path.join(root, d)
            dirslowerpath =os.path.join(root, d.lower())
            os.rename(dirspath,dirslowerpath)
        
except Exception as err:
    print(err)
print("皮卡丘使用十万伏特-----已经倒下了")
input("输入任意结束")