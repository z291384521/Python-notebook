import functools
import os
from PIL import Image


# 图片类
class png_item:
    def __init__(slef, name, width, height):
        slef.name = name
        slef.width = width
        slef.height = height
        # 再图集中的位置
        slef.x = 0
        slef.y = 0
        slef.area = width * height


# path=input("请输入要打包的位置")
path = r"H:\H5ForZG20盛大\laya\assets\gameres\ui"
all_png_item = []


# 将每一张图片信息采集并且放到列表里面
def read_png_info(path):
    for root, dirs, files in os.walk(path):
        for f in files:
            # print(f)
            fileslowerpath = os.path.join(root, f)
            img = Image.open(fileslowerpath)
            # 将所有信息存入生成的列表中
            all_png_item.append(png_item(f, img.width, img.height))


# 对列表进行排序依据面积从小到大的规则进行
def list_sort(oldlist):
    def area(png_item_x: png_item, png_item_y: png_item):
        x = png_item_x.width * png_item_x.height
        y = png_item_y.width * png_item_y.height
        if x > y:
            return 1
        elif x < y:
            return -1
        return 0

    sorted(oldlist, key=functools.cmp_to_key(area))
    return oldlist


# 图集棋盘
class grid():
    # 类属性
    width = 0
    height = 0
    # 可用的区域列表
    space_available_list = []
    # 可用空间id计数
    space_available_id = 0


# 可用空间类
class space_available():
    def __init__(self, id, width, height, x, y):
        # id区别第几块可用空间标记
        self.id = id
        # 可用空间的
        self.width = width
        self.height = height
        # 再棋盘中坐标
        self.x = x
        self.y = y
    #
    # def change_space(self,min_width,min_height):
    #       # 默认插入坐上角
    #       #第一种情况可用
    #     if min_width==self.width and min_height==self.height:


# 管理棋盘与可用空间内
# 装箱算法
# 不断完善趋近正方形
# 不断扩展箱子大小
# 先将最大放在放入右上角 第二块根据第一块看放在那里更加像正方形
# 第3块开始判断是否存在可用空间中


class griid_manage():
    # 初始化棋盘
    @classmethod
    def init_grid(cls):
        grid.width = 0
        grid.height = 0
        grid.space_available_list = []
        grid.space_available_id = 0

    @classmethod
    def add_png(cls, png_item: png_item):
        """
        添加图片
        """
        # 判断可用列表里面有没有空间存放
        # 没有的话创建可用空间并且存放

        # 先判断可用列表是不是空的如果是空的需要创建可用空间
        if grid.space_available_list == None:
            print("可用列表队列没有位置")
            griid_manage.add_space_available(png_item)

    @classmethod
    def add_space_available(cls,png_item):
        #判断下是不是第一块 第一块直接生成
        if(grid.space_available_id==0):
            newspace = space_available(0,png_item.width,png_item.height,0,0)


        if(all_png_item):
            #添加到右边代码处理

            newspace = space_available(grid.space_available_id,)
        pass

    @classmethod
    def add_right_down(cla):
        """
        维持图集形状
        true 为添加到右侧
        false 为添加到下面
        :return:
        """
        if grid.widths>grid.height:
            return False
        else:
            return  True
read_png_info(path)
all_png_item = list_sort(all_png_item)
for i in all_png_item:
    print(i.name)
    print(i.area)
