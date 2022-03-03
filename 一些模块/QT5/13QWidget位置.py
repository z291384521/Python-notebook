from PyQt5 import QtWidgets
import sys
from PyQt5.QtWidgets import *
#move (x,y)
# 1. 创建一个应用程序对象
app = QApplication(sys.argv)

# 2. 控件的操作
# 2.1 创建控件
window = QWidget()
#修改用户区域 
#但是修改的时候要注意最小限定 
window.resize(200,200)
#面对坐标轴x y 
#（0，0）----------------------X正数
#|
#|
#|
#|
#|
#|
#|
#|
#Y正轴
window.move(00,00)

#设置用户区域 x y 以及大小 需要在show以后设置
#setGeometry(x_noFrame, y_noFrame, width, height)
# 2.3 展示控件
window.show()
# 3. 应用程序的执行, 进入到消息循环
sys.exit(app.exec_())