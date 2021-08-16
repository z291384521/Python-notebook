import re
newpak=open("2222.pak",'w',encoding='utf-8')
with open("pak.txt", 'r', encoding="utf-8-sig") as load_r:
    line = load_r.readline()
    while line:
        newname=line.lower()
        newpak.write(newname)
        line = load_r.readline()
