import os
import sys
import os.path
import shutil
import json
from PIL import Image

tuji_png_path = input('输入通图集位置 png与atlas再一起')
# tuji_png_path  =r"H:\python虚拟环境\Python-notebook\测试文件\stateitem1\000269.png"
if tuji_png_path.find('.png') != -1:
 tuji_png_path = tuji_png_path[:-4]
 print(tuji_png_path)

pngName = tuji_png_path + '.png'
atlasName = tuji_png_path + '.atlas'

print(pngName,atlasName)
#读取图片二进制信息
big_image = Image.open(pngName)
# atlas = file(atlasName, "r")
#读取文件给
with open(atlasName,"r",encoding='utf-8', errors='ignore') as load_f:
    atlas=json.load(load_f)

#方法获得文件名
filename = os.path.basename(tuji_png_path)
curPath = os.getcwd()# 当前路径
aim_path = os.path.join(curPath, filename)
print(aim_path)
#创建储存文件的目录
if os.path.isdir(aim_path):
    shutil.rmtree(aim_path,True)#如果有该目录,删除
os.makedirs(aim_path)

# _text = atlas.read()
# #print _text

# _json = json.loads(_text)
# #print _json
# #print _json['frames']

for key in atlas['frames']:	
	frame = atlas['frames'][key]['frame']
	ltx = frame['x']
	lty = frame['y']
	width = frame['w']
	height = frame['h']
	rbx = ltx + width
	rby = lty + height
	
	name = key;	
	print(name,width,height,ltx,lty,rbx,rby)
	
	result_image = Image.new("RGBA", (width,height), (0,0,0,0))
	rect_on_big = big_image.crop((ltx,lty,rbx,rby))
	print(rect_on_big)
	result_image.paste(rect_on_big, (0,0,width,height))
	result_image.save(aim_path+'/'+name)
	


