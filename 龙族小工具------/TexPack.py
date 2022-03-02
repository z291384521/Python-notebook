#!/usr/bin/env python
# coding=utf-8
#@Information:
#@Author       : 反转旋木
#@Date         : 2022-01-05 10:20:53
#@FilePath     : \a-ytuji\TexPack.py
#@Email        : 291384521@qq.com
#@LastEditTime : 2022-03-01 17:13:12

#from logger import logger
from io import BytesIO
from logger import logger
import os
from PyTexturePacker import Packer, Utils
import pngquant
from prt_cmd_color import printGreen, printRed,printYellow
def start():
    while True:
        ten=input("请输入图集像素大小:（2048与4096）")
        try:
            x=eval(ten)
            if type(x)==int:
                return x
                break
        except:
                pass

# if getattr(sys, 'frozen', False):
#     application_path = os.path.abspath(os.path.dirname(sys.executable))
# elif __file__:
#     application_path = os.path.abspath(os.path.dirname(__file__))

#获得当前目录
def pack(ten:int,path):
    path_ui=os.path.join(path,"ui")
    logger.info(f"处理的图片位置{path_ui}")
    #调用
    packer = Packer.create(max_width=ten,max_height=ten, bg_color=0x00000000,enable_rotated=False,atlas_format="atlas")
    try:
        packer.pack(path_ui,f"{path_ui}")
    except ValueError as e:
        printRed(f"{e}英文看的懂了吗")
        return False
    except AssertionError as e:
        logger.info(f"{e}")
        printRed("知道什么原因吗 设置像素太小了 格局大点————————龙族值班技术②")
        return False
    except Exception as e:
        logger.info(e)
        return False
    return True

def yashuo(path):
    path_ui = os.path.join(path, "ui")
    path_pngquant=os.path.join(path,"pngquant.exe")
    if os.path.exists(path_pngquant):
        pngquant.config(quant_file=path_pngquant, min_quality=50,max_quality=80)
        pngquant.quant_image(path_ui+".png")
    else:
        printRed("没有压缩程序 不执行压缩")



from PIL import Image,ImageOps
import numpy as np
import os
 


def crop_image(imagesDirectory, x_top=0, x_left=0, x_right=0, x_bottom=0):
    imagePath = os.path.join(imagesDirectory,"ui.png")
    image = Image.open(imagePath)  # 打开tiff图像
    ImageArray=np.array(image)
    row=ImageArray.shape[0]
    col=ImageArray.shape[1]
    for row in range(row):
        for col in range(col):
            if ImageArray[row][col][0]<255 and ImageArray[row][col][0] !=0:
                if x_bottom<row:
                    x_bottom=row    #获取最大x_bottom
                if x_right<col:
                    x_right=col    #获取最大x_right
    logger.info(f"图片裁剪的方位    {x_left}    {x_top}     {x_right}   {x_bottom}")
    cropped = image.crop( (x_left ,x_top , x_right+10,  x_bottom+10))  # (left, upper, right, lower)
    cropped.save(imagePath)


def crop_margin(path, padding=(0, 0, 0, 0)):
    # 我们不一定需要把图片真的保存成一个文件再打开来裁剪
    # img_fileobj泛指一个类文件对象，比如BytesIO就可以
    # 本方法传入img_fileobj，返回裁剪后图片的字节流
    path = os.path.join(path,"ui.png")
    # 转换成RGB格式，然后运用getbbox方法
    image = Image.open(path).convert('RGB')
    # getbbox实际上检测的是黑边，所以要先将image对象反色
    ivt_image = ImageOps.invert(image)
    # 如果担心检测出来的bbox过小，可以加点padding
    bbox = ivt_image.getbbox()
    left = bbox[0] - padding[0]
    top = bbox[1] - padding[1]
    right = bbox[2] + padding[2]
    bottom = bbox[3] + padding[3]
    cropped_image = image.crop([left, top, right, bottom])
    cropped_image.save(path,format='PNG')




if __name__ =="__main__":
    
    printGreen("更多有意思工具请关注龙族值班技术②")
    printGreen("本程序只适用于图集ui打包 路径写死了")
    printYellow("请将程序文件放在ui文件同级目录\n以及需要压缩需要将pngquant.exe放入")
    printRed("注意UI文件夹下面只能有png图片")
    logger.hr('朕已阅', level=0)
    try:    
       #获得当前路径
       path = os.getcwd()
       ten=start()
       while True:
        if pack(ten,path):
            break
        else:
            ten=start()
       logger.info("开始裁剪")
       crop_image(path)
       logger.info("开始压缩")
       yashuo(path)
       logger.info("完成压缩")
    except Exception as err:
        
        logger.warn(err)
    printGreen("更多有意思工具请关注龙族值班技术②")
    input("输入任何结束")

