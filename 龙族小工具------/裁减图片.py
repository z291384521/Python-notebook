

# import os
# from PIL import Image
# #遍历文件
# rootdir = '首饰'
# list = os.listdir(rootdir) #列出文件夹下所有的目录与文件
# for i in range(0,len(list)):
#        path = os.path.join(rootdir,list[i])
#        if os.path.isfile(path):
#               #你想对文件的操作
#               print(path)
#               with Image.open(path) as image:
#                      w, h = image.size
#                      cropped_img = image.crop((w//2 - 100//2, h//2 - 100//2, w//2 + 100//2, h//2 + 100//2))
#                      cropped_img.save(path)
#               pass

# cropped_img = img.crop((w//2 - 100//2, h//2 - 100//2, w//2 + 100//2, h//2 + 100//2))

import os
import cv2
from PIL import Image



def get_transparency_location(image):
    '''获取基于透明元素裁切图片的左上角、右下角坐标

    :param image: cv2加载好的图像
    :return: (left, upper, right, lower)元组
    '''
    # 1. 扫描获得最左边透明点和最右边透明点坐标
    height, width, channel = image.shape  # 高、宽、通道数
    assert channel == 4  # 无透明通道报错
    first_location = None  # 最先遇到的透明点
    last_location = None  # 最后遇到的透明点
    first_transparency = []  # 从左往右最先遇到的透明点，元素个数小于等于图像高度
    last_transparency = []  # 从左往右最后遇到的透明点，元素个数小于等于图像高度
    for y, rows in enumerate(image):
        for x, BGRA in enumerate(rows):
            alpha = BGRA[3]
            if alpha != 0:
                if not first_location or first_location[1] != y:  # 透明点未赋值或为同一列
                    first_location = (x, y)  # 更新最先遇到的透明点
                    first_transparency.append(first_location)
                last_location = (x, y)  # 更新最后遇到的透明点
        if last_location:
            last_transparency.append(last_location)

    # 2. 矩形四个边的中点
    top = first_transparency[0]
    bottom = first_transparency[-1]
    left = None
    right = None
    for first, last in zip(first_transparency, last_transparency):
        if not left:
            left = first
        if not right:
            right = last
        if first[0] < left[0]:
            left = first
        if last[0] > right[0]:
            right = last

    # 3. 左上角、右下角
    upper_left = (left[0], top[1])  # 左上角
    bottom_right = (right[0], bottom[1])  # 右下角

    return upper_left[0], upper_left[1], bottom_right[0], bottom_right[1]


def img_crop(box, rootdir):
    '''
    box为方位 
    rootdir 文件夹路径
    '''
    list = os.listdir(rootdir) #列出文件夹下所有的目录与文件
    for i in range(0,len(list)):
           path = os.path.join(rootdir,list[i])
           #判断后缀加上 png
           if os.path.isfile(path) and os.path.splitext(path)[-1][1:] == "png":
                  #你想对文件的操作
                  print(path)
                  with Image.open(path) as image:
                         w, h = image.size
                         cropped_img = image.crop(box)
                         cropped_img.save(path)
                  pass

if __name__ == '__main__':
    
    png_dir = input("学习的图片")
    image = cv2.imread(png_dir, cv2.IMREAD_UNCHANGED)  # 读取图片
    # image = cv2.imread('2.jpg')
    # image = cv2.imread('3.png', cv2.IMREAD_UNCHANGED)
    # image = cv2.imread('4.png', cv2.IMREAD_UNCHANGED)
    # image = cv2.imread('5.png', cv2.IMREAD_UNCHANGED)
    # image = cv2.imread('6.png', cv2.IMREAD_UNCHANGED)
    # cv2.imshow('1', image)

    # 保存裁剪后图片
    box = get_transparency_location(image)

    # result = cv2_crop(image, box)
    # cv2.imshow('result', result)
    # cv2.waitKey(0)
    # cv2.destroyAllWindows()
    # cv2.imwrite('result.png', image)
    # with Image.open("1.png") as image:
    #        w, h = image.size
    #        cropped_img = image.crop(box)
    #        cropped_img.save("1.png")
    #遍历文件
    rootdir = input("改变的文件夹")
    img_crop(box, rootdir)
