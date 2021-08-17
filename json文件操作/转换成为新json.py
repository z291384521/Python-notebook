import json
from os import name
import re


image_expor_rule = {

}

with open("old.json", 'r', encoding="utf-8-sig") as load_f:
    load_dict = json.load(load_f)
    for k in load_dict["fileAndRule"]:
        newname='data/'+k["fileMainName"]
        newname=newname.lower()
        print(newname)
        image_expor_rule[newname]=[]
        #print(k["rule"])
        for key,value in k["rule"].items():
            if key == "0-":
                key ="0"
            #print(key,value)
            str1={"id":key,"num":value}
            print(str1)
            image_expor_rule[newname].append(str1)

with open("pak.txt", 'r', encoding="utf-8-sig") as load_r:
    line = load_r.readline()
    while line:
        ret = re.match(r"(.*)\.Pak", line)
        print(ret.group(1))
        newname=ret.group(1)
        newname=newname.replace("\\","/")
        newname=newname.lower()
        image_expor_rule[newname]=[]
        namelist =newname.split("/")
        print(namelist[1])

        if namelist[1]=="mon":
            str1={"id":0,"num":10}
            image_expor_rule[newname].append(str1)
        else:
            str1={"id":0,"num":8}
            image_expor_rule[newname].append(str1)

        
        line = load_r.readline()




newjson=open("111111.json",'w',encoding='utf-8')
json.dump(image_expor_rule,newjson,ensure_ascii=False)