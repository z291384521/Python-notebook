import functools
import os
from io import BytesIO

from PIL import Image

# 图片类
from PIL import Image,ImageDraw,ImageFont


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
        # x = png_item_x.width * png_item_x.height
        # y = png_item_y.width * png_item_y.height
        x = png_item_x.width
        y = png_item_y.width
        if x > y:
            return 1
        elif x < y:
            return -1
        return 0

    oldlist.sort(key=functools.cmp_to_key(area), reverse=True)
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
        id_num = griid_manage.find_space_available(png_item)
        # 找到这个id的空间
        for i in grid.space_available_list:
            if i.id == id_num:
                # 可用空间没有 刚好与图片大小相等
                if png_item.width == i.width and png_item.height == i.height:
                    png_item.x = i.x
                    png_item.y = i.y
                    # 将空间给了图片删除
                    grid.space_available_list.remove(i)
                    return
                # 出现一种可用空间情况 图片高与宽 与其中一个相当
                if png_item.width == i.width:
                    png_item.x = i.x
                    png_item.y = i.y
                    # #删除就空间
                    # grid.remove(i)
                    # 生成了一个新的空间 w相等情况
                    griid_manage.add_space(grid.space_available_id, png_item.width, (i.height - png_item.height),
                                           i.x,
                                           (i.y + png_item.height))
                    # 删除就空间
                    grid.space_available_list.remove(i)
                    return
                    # 生成了一个新的空间 h相等情况
                if png_item.height == i.height:
                    png_item.x = i.x
                    png_item.y = i.y
                    griid_manage.add_space(grid.space_available_id, i.width - png_item.width, i.height,
                                           i.x + png_item.width, i.y)
                    grid.space_available_list.remove(i)
                    return
                    # 出现两种可用空间情况
                if png_item.width < i.width and png_item.height < i.height:
                    png_item.x = i.x
                    png_item.y = i.y
                    griid_manage.add_space(grid.space_available_id, png_item.width, (i.height - png_item.height),
                                           i.x,
                                           (i.y + png_item.height))

                    griid_manage.add_space(grid.space_available_id, i.width - png_item.width, i.height,
                                           i.x + png_item.width, i.y)
                    grid.space_available_list.remove(i)
                    return
                print("出错了我被遗忘了")
        print("ID都没找到你干嘛了")

    @classmethod
    def add_space(cls, id, w, h, x, y):
        grid.space_available_list.append(space_available(id, w, h, x, y))
        grid.space_available_id = grid.space_available_id + 1
        # 返回添加id数量
        return id

    @classmethod
    def sorted_space_available(cls):
        """
        对可用列表进行排序从小到大
        :return:
        """

        def area(space_available_x: space_available, space_available_y: space_available):
            x = space_available_x.width * space_available_x.height
            y = space_available_y.width * space_available_y.height
            if x > y:
                return 1
            elif x < y:
                return -1
            return 0

        grid.space_available_list.sort(key=functools.cmp_to_key(area))

    @classmethod
    def find_space_available(cls, png_item):
        """
        查找空闲位置
        1遍历整个可以用空间
        :return:查找到的编号
        """
        # 先判断列表存不存在
        if not len(grid.space_available_list):
            return griid_manage.add_space_available(png_item)

        # 先进行排序
        griid_manage.sorted_space_available()
        for i in grid.space_available_list:
            if png_item.width <= i.width and png_item.height <= i.height:
                print(png_item.name + "找到了位置")
                return i.id
        # 遍历没有找到可用位置需要自己创建
        print("没有找的位置")
        return griid_manage.add_space_available(png_item)

    @classmethod
    def add_space_available(cls, png_item):
        # 判断下是不是第一块 第一块直接生成
        if grid.space_available_id == 0:
            newspace = space_available(0, png_item.width, png_item.height, 0, 0)
            grid.width = png_item.width
            grid.height = png_item.height
            grid.space_available_list.append(newspace)
            grid.space_available_id = grid.space_available_id + 1
            return 0

        # 不是第一块的话判断是下面还是右边
        if (griid_manage.add_right_down()):
            # 添加到右边代码处理
            #
            # ----------
            #       |  |
            #       |  |
            # 两种情况 一个是 图片高度小于图集高度
            if (png_item.height <= grid.height):
                id = griid_manage.add_space(grid.space_available_id, png_item.width, grid.height, grid.width, 0)
                # 给网格加宽
                grid.width += png_item.width
                return id

            else:
                id = griid_manage.add_space(grid.space_available_id, png_item.width, png_item.height, grid.width, 0)
                # 还会生成而外的区域
                griid_manage.add_space(grid.space_available_id, grid.width, png_item.height - grid.height, 0,
                                       grid.height)
                # 给网格加宽与高
                grid.width += png_item.width
                grid.height = png_item.height
                print("_" * 50 + "不会吧图集还没图片宽")
                return id
                # 图片高度大于图集高度


        else:
            # 添加到右边代码处理
            # -----------0
            # |         |
            # |         |
            # 下面为添加的区域
            # |_________|
            if (png_item.width <= grid.width):
                id = griid_manage.add_space(grid.space_available_id, grid.width, png_item.height, 0, grid.height)
                grid.height += png_item.height
                return id
            else:
                id = griid_manage.add_space(grid.space_available_id, png_item.width, png_item.height, 0, grid.height)
                griid_manage.add_space(grid.space_available_id, png_item.width - grid.width, grid.height, grid.width,
                                       0)
                grid.width = png_item.width
                grid.height += png_item.height
                print("_" * 50 + "不会吧图集还没图片高")
                return id

    @classmethod
    def add_right_down(cla):
        """
        维持图集形状
        true 为添加到右侧
        false 为添加到下面
        :return:
        """
        if grid.width > grid.height:
            return False
        else:
            return True


read_png_info(path)
list_sort(all_png_item)
griid_manage.init_grid()
all_area = 0

for i in all_png_item:
    print(i.name)
    print(i.area)
    all_area = all_area + i.area
    griid_manage.add_png(i)
    print(i.x, i.y)

print("grid w" + str(grid.width))
print("grid h" + str(grid.height))
print("grid C" + str(grid.space_available_id))
print(all_area / (grid.width * grid.height))

# im.show()
# im.show()
im = Image.new('RGB', (grid.width, grid.height), color=None)
for i in all_png_item:
    # os.path.join(path, all_png_item[0].name)
    fileslowerpath = os.path.join(path, i.name)
    img = Image.open(fileslowerpath)
    # img = Image.open(BytesIO(fileslowerpath))
    im.paste(img, (i.x, i.y))

# im2 = Image.new('RGB', (grid.width, grid.height), color=None)


for i in grid.space_available_list:
    im2 = Image.new('RGB', (i.width, i.height), (0, 0, 255))
    im.paste(im2, (i.x, i.y))
im.show()
# im.save()
