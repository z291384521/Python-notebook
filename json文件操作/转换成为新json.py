import json
import re


image_expor_rule = {

}

with open("old.json", 'r', encoding="utf-8-sig") as load_f:
    load_dict = json.load(load_f)
    for k in load_dict["fileAndRule"]:
        print(k["fileMainName"])
        image_expor_rule[k["fileMainName"]]=[]
        #print(k["rule"])
        for key,value in k["rule"].items():
            if key == "0-":
                key ="0"
            #print(key,value)
            str1={"id":key,"num":value}
            print(str1)
            image_expor_rule[k["fileMainName"]].append(str1)


newjson=open("111111.json",'w',encoding='utf-8')
json.dump(image_expor_rule,newjson,ensure_ascii=False)