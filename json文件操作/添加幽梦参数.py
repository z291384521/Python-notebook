import json


def app_UMengKey(dict,UMenKEY):
    for k,v in dict.items():
        if(k=="UMengKey"):
            print(dict[k])
            #if(dict[k]==None or dict[k]==""):
            if not dict[k]:
              dict[k]=UMenKEY
    

with open("appVersions.json", 'r', encoding="utf-8-sig") as load_f:
    load_dict = json.load(load_f)
    for app_info in load_dict:
        app_UMengKey(app_info["Ipa"],"60e7a835a6f90557b7afda11")
        app_UMengKey(app_info["Apk"],"60e7a7f02a1a2a58e7ce4fe5")


newjson=open("newappVersions.json",'w',encoding='utf-8')
json.dump(load_dict,newjson,ensure_ascii=False)