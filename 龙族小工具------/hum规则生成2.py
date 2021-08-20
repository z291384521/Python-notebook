import json
from os import name
import re
image_expor_rule = {

}

def creat_json(hum_num,count_num ):
    newname="data/"+hum_num
    image_expor_rule[newname]=[]
    count_num = int(count_num)
    count_num = count_num/600
    print("一共有%d套装"%(count_num))
    count_num = int(count_num)
    for i in range(0,count_num):
        a=(600*i)
        b=a+191
        print(a,b)
        str2 = "%s-%s" % (a,b)
        str1={"id":str2,"num":8}
        image_expor_rule[newname].append(str1)
        b1 = b+1
        for i1 in range(0,8):
            b=b+1
        print(b1,b)
        str2 = "%s-%s" % (b1,b)
        str1={"id":str2,"num":1}
        image_expor_rule[newname].append(str1)

        b = b+1
        a = b+255
        print(b,a)
        str2 = "%s-%s" % (b,a)
        str1={"id":str2,"num":8}
        image_expor_rule[newname].append(str1)
        c = a+1
        for i2 in range(0,8):
            a=a+2
        print(c,a)
        str2 = "%s-%s" % (c,a)
        str1={"id":str2,"num":2}
        image_expor_rule[newname].append(str1)
        a=a+1
        b=a+127
        print(a,b)
        str2 = "%s-%s" % (a,b)
        str1={"id":str2,"num":8}
        image_expor_rule[newname].append(str1)

creat_json("hum",14400)
creat_json("hum2",14400)
creat_json("hum3",20400)
creat_json("hair",3600)
creat_json("hair2",13200)
creat_json("hair3",3000)
creat_json("weapon",52800)
creat_json("weapon2",25200)
creat_json("weapon3",32400)
creat_json("weapon5",7200)
newjson=open("cheshi3.json",'w',encoding='utf-8')
json.dump(image_expor_rule,newjson,ensure_ascii=False)