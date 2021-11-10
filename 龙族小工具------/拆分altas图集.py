import os
import sys
import os.path
import shutil
import json
from PIL import Image
fileName = raw_input('input filename:')

if fileName.find('.png') != -1:
    fileName = fileName[:-4]

pngName = fileName + '.png'
atlasName = fileName + '.atlas'

print(pngName,atlasName)

big_image = Image.open(pngName)
atlas = file(atlasName, "r")


curPath = os.getcwd()# 当前路径
aim_path = os.path.join(curPath, fileName)
print(aim_path)
if os.path.isdir(aim_path):
    shutil.rmtree(aim_path,True)#如果有该目录,删除
os.makedirs(aim_path)

_text = atlas.read()
#print _text

_json = json.loads(_text)
#print _json
#print _json['frames']

for key in _json['frames']:	
	frame = _json['frames'][key]['frame']
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
	
atlas.close()
del big_image

