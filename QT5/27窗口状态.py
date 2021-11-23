'''
状态为 
无状态 最小化 最大化 全屏 活动窗口
WindowNoState = ... # type: Qt.WindowState
WindowMinimized = ... # type: Qt.WindowState
WindowMaximized = ... # type: Qt.WindowState
WindowFullScreen = ... # type: Qt.WindowState
WindowActive = ... # type: Qt.WindowState
活跃 设置了就是出现再最前面的窗口
'''
# 0. 导入需要的包和模块
import sys
from PyQt5.QtWidgets import *
from PyQt5.QtCore import *

# 1. 创建一个应用程序对象
app=QApplication(sys.argv)

#2. 控件的操作
# 2.1 创建控件
window=QWidget()


# 2.2 设置控件
window.resize(500,500)
window.setWindowTitle('窗口状态')
window.setWindowState(Qt.WindowState.WindowMaximized)
# 2.3 展示控件
window.show()

#3. 应用程序的执行，进入到消息循环
sys.exit(app.exec_())

