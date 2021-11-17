import json

new_path=input('新的imageSetRule位置')
old_path=input('旧的imageSetRule位置')
#测试用路径
# new_path = r"龙族小工具------\Untitled-1.json"
# old_path = r"龙族小工具------\Untitled-2.json"

rule_data = "data"
rule_graphics = "graphics"
#读取旧规则文件
with open(old_path,"r",encoding='utf-8', errors='ignore') as load_f:
    load_old_dict = json.load(load_f)
#读新新规则文件
with open(new_path,"r",encoding='utf-8', errors='ignore') as load_f:
    load_new_dict = json.load(load_f)
print(load_new_dict["data"]["sucai"])
#循环遍历新规则 data规则
if( rule_data in load_new_dict.keys()):
    for v_lei,k_lei in load_new_dict[rule_data].items():
        load_old_dict[rule_data][v_lei]=load_new_dict[rule_data][v_lei]
#循环遍历新规则 graphics规则
if( rule_graphics in load_new_dict.keys()):
    for v_lei,k_lei in load_new_dict[rule_graphics].items():
        #hum wep mon来改写
        for v_lei_lei,k_lei_lei in load_new_dict[rule_graphics][v_lei].items():
            load_old_dict[rule_graphics][v_lei][v_lei_lei]=load_new_dict[rule_graphics][v_lei][v_lei_lei]

newjson=open("imageSetRule",'w',encoding='utf-8')
json.dump(load_old_dict,newjson,ensure_ascii=False)