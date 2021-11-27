import re
#存放单词的
name_list = []
#存放文字的
item_list = []
file_path=input("请输入ziliao.txt文件位置")
# file_path=r"可视化话调整偏移工具\ziliao.txt"
with open(file_path,'r',encoding='UTF-8') as f:
    content = f.readlines()

for i in content:
    r=re.search("\d\.\s(.*?)：.*?",i)
    if r is not None:
     name_list.append(r.group(1))

    #  print(r.group(1))
#判断是不是中文
def isChinese(word):
    for ch in word:
        if '\u4e00' <= ch <= '\u9fff':
            return True
    return False
#将name_list的每个字符串给拆分
for i1 in name_list:
    for i2 in i1:
        if isChinese(i2) and i2 not in item_list:
            item_list.append(i2)
data_dit = {}  
print(item_list)    
for  z in item_list:
    name_new_list =[]
    for c in name_list:
        out=c.find(z)
        if out != -1:
             name_new_list.append(c)
    data_dit[z]=name_new_list

data_new_dit={}
#值的列表只有一个不要
for k,v in data_dit.items():
    if len(v)!=1:
        # print(k,v)
        data_new_dit[k]=v
print(data_new_dit)

with open(r'查询结果.txt','a',encoding='UTF-8') as f:
    for  key,value in data_new_dit.items():
        f.write(key+" ")
        for line in value:
            f.write(line+' ')
        f.write("\n")