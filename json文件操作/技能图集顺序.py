import json
import re
#文件位置在哪
fl_name="fl_name"

image_expor_rule = {
}
def start_end_empty(dict, s11):
    start = s11 + "_start"
    frame = s11 + "_frame"
    empty = s11 + "_empty"
    dir = s11 + "_dir"
    #print(start,frame,empty)
    print(dict["name"])
    if int(dict[dir]) == 0:
        s1 = int(dict[start])
        f1 = int(dict[frame]) + int(dict[empty])
        e1 = int(dict[start]) + int(dict[frame]) + int(dict[empty])
        if (s1 != 0) and (e1 != 0):
            #print(s1, f1, e1)
            s2 = "%d-%d:%d" % (s1, e1, f1)
            print(s11 + s2)
            return s2
    else:
        s1 = int(dict[start])
        f1 = int(dict[frame]) + int(dict[empty])
        e1 = (int(dict[frame]) + int(dict[empty])) * int(dict[dir])
        s2 = "%d-%d:%d" % (s1, e1, f1)
        print(s11 + s2)
        return s2
'''
自身开始  self_dir不无0时候
self_start+（self_frame+self_empty）*self_dir 为0的话self_start+（self_frame+self_empty）
飞行方向
fly_start +（fly_frame+fly_empty） * self_dir
命中目标
gethit_start + gethit_frame
'''

with open("skill.json", 'r', encoding="utf-8-sig") as load_f:
    load_dict = json.load(load_f)
    #print(load_dict)
    for i in load_dict:
        ret=re.match(r"^data/(magic.*)/",i[fl_name])
        if not (ret):
          print(ret.group(1))
          start_end_empty(i,"self")
