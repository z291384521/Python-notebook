import os
perfix = 'hello'  # perfix为重命名后的文件起始字符
length = 2        # length为除去perfix后，文件名要达到的长度
base = 1          # 文件名的起式位置
format = 'mdb'    # 文件的后缀名

# 函数PadLeft将文件名补全到指定长度
# strs为要补全的字符
# num为要达到的长度
# padstr未达到的长度所添加的字符


def PadLeft(strs, num, padstr):
    strlength = len(strs)
    n = num - strlength
    if n >= 0:
        strs = padstr * n + strs
    return strs


# 为了避免误操作，这里先提示用户
print('the files in %s will be renamed' % os.getcwd())
all_files = os.listdir(os.getcwd())
print([f for f in all_files if os.path.isfile(f)])  # print输出当前目录下的所有文件名
input = input('press y to continue\n')  # 获取用户输入
if input.lower() != 'y':
    exit()
filenames = os.listdir(os.curdir)  # 获取当前目录中的内容
# 基数减1，为了下面i+=1在第一次执行时等于基数
i = base - 1
for filename in filenames:  # 遍历进行重命名
    i += 1
    # 判断当前路径是否是文件
    if filename != 'test.py' and os.path.isfile(filename):
        name = str(i)  # 将i转换成字符
        name = PadLeft(name, length, '0')  # 将name补全到指定长度
        t = filename.split('.')  # 分割文件名，以检查其是否要修改的类型
        m = len(t)
        if format == '':  # 如果未指定文件类型，则更改当前目录中的所有文件
            os.rename(filename, perfix+name+'.'+t[m-1])
        else:  # 否则只修改指定类型
            if t[m-1] == format:
                os.rename(filename, perfix+name+'.'+t[m-1])
            else:
                i -= 1
    else:
        i -= 1
all_files = os.listdir(os.getcwd())
print([f for f in all_files if os.path.isfile(f)])
