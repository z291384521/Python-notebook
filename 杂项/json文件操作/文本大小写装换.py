import re
import os
newpak=open("pak232323.txt",'w',encoding='utf-8')
with open("232323.txt", 'r', encoding="utf-8-sig") as load_r:
    line = load_r.readline()
    print(line)
    while line:
        # ret=re.match(r"(\w*\\w*)|(.*)",line)
        newlist=line.split("|")
        print(newlist[0],newlist[1])
        newname=newlist[0].lower()
        newpak.write(newname+"|"+newlist[1])
        line = load_r.readline()
newpak.close()