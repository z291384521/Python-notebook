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
print(os.path.dirname(sys.executable))
kongtu = os.path.dirname(sys.executable)+'\\a.png'
print(kongtu)
path=input('data位置')
a =  os.path.dirname(sys.executable)+'\空文件文件.txt'
emptyfiles= open(a,'w',encoding='utf-8')
for root, dirs, files in os.walk(path):
        # root 表示当前正在访问的文件夹路径
        # dirs 表示该文件夹下的子目录名list
        # files 表示该文件夹下的文件list
    #print("Root = ", root, "dirs = ", dirs, "files = ", files)
        # 遍历文件
    for f in files:
        filespath = os.path.join(root, f)
        filessize = os.path.getsize(filespath)
        
        if filessize == 0:
            #os.remove(filespath)
            print(filespath,filessize)
            emptyfiles.write(filespath+'\n')
            shutil.copy(kongtu,filespath)
            
f.close()
print("皮卡丘使用十万伏特-----已经倒下了")
input("输入任意结束")
    #  # 遍历所有的文件夹
    # for d in dirs:
    #     print(os.path.join(root, d))

def clear(text_path):
    with open(text_path, 'w') as f1:
     f1.seek(0)
     f1.truncate()
    print("清空数据")

