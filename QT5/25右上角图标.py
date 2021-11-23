# 0. 导入需要的包和模块
import sys
from PyQt5.QtGui import QIcon
from PyQt5.QtWidgets import *

# 1. 创建一个应用程序对象
app=QApplication(sys.argv)

#2. 控件的操作
# 2.1 创建控件
window=QWidget()


# 2.2 设置控件
window.resize(500,500)
window.setWindowTitle('右上角图标 ')
icon = QIcon(r"QT5\xxx.png")
window.setWindowIcon(icon)
# 半透明状态
window.setWindowOpacity(0.5)
# 2.3 展示控件
window.show()
#3. 应用程序的执行，进入到消息循环
sys.exit(app.exec_())

