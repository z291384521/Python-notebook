import re
import os
newpak=open("33333.txt",'w',encoding='utf-8')
with open("pak.txt", 'r', encoding="utf-8-sig") as load_r:
    line = load_r.readline()
    while line:
        newname=line.lower()
        ret = re.match(r"^graphics", line)
        if ret ==None:
            newpak.write("data/"+line)
        else:
            newpak.write(line)        
        line = load_r.readline()
newpak.close()

