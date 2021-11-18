import typing
from PyQt5 import *
from PyQt5 import QtGui
from PyQt5 import QtCore
from PyQt5.QtCore import *
from PyQt5.QtGui import *
from PyQt5.QtWidgets import *
import sys
class MyWindeow(QWidget):
    def __init__(self) -> None:
        super().__init__()
        self.setWindowTitle("鼠标移动案例")
        self.resize(500, 500)
        lable = QLabel(self)
        self.lable = lable
        lable.setText("要移动的标签")
        lable.setStyleSheet("background-color: cyan;")
        lable.move(100,100)
    
    def mouseMoveEvent(self, a0: QtGui.QMouseEvent) -> None:
        print("鼠标移动了")

        print("打印全局坐标系",a0.globalX(),a0.globalY())
        print("打印局部坐标",a0.localPos())
        self.lable.move(int(a0.localPos().x()),int(a0.localPos().y()))
        return super().mouseMoveEvent(a0)
app = QApplication(sys.argv)
window =MyWindeow()
window.show()
#下面的开关控制是否需要左键点击才会触发事件
window.setMouseTracking(True)
print(window.hasMouseTracking())
# 3. 应用程序的执行, 进入到消息循环
sys.exit(app.exec_())