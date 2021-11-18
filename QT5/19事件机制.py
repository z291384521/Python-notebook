import sys
from PyQt5 import QtGui
from PyQt5.QtWidgets import *
class Window(QWidget):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("事件消息的学习")
        self.resize(500, 500)
        self.setup_ui()

    def setup_ui(self):
        pass

    def showEvent(self, QShowEvent):
        print("窗口被展示了出来")

    def closeEvent(self, QCloseEvent):
        print("窗口被关闭了")


    def moveEvent(self, QMoveEvent):
        print("窗口被移动了")

    def resizeEvent(self, QResizeEvent):
        print("窗口改变了尺寸大小")

    def enterEvent(self, QEvent):
        print("鼠标进来了")
        self.setStyleSheet("background-color: yellow;")
    def leaveEvent(self, QEvent):
        print("鼠标移开了")
        self.setStyleSheet("background-color: green;")
    def mousePressEvent(self, QMouseEvent):
        print("鼠标被按下")

    def mouseReleaseEvent(self, QMouseEvent):
        print("鼠标被释放")

    def mouseDoubleClickEvent(self, QMouseEvent):
        print("鼠标双击")

    def mouseMoveEvent(self, QMouseEvent):
        print("鼠标移动了")

    def keyPressEvent(self, QKeyEvent):
        print("键盘上某一个按键被按下了")

    def keyReleaseEvent(self, QKeyEvent):
        print("键盘上某一个按键被释放了")
    def dragEnterEvent(self,QDragEnterEvent):
        print("我要用的拖拽事件")
    def dropEvent(self, a0: QtGui.QDropEvent) -> None:
        print("我要用的拖拽事件")
        return super().dropEvent(a0)
        



if __name__ == '__main__':
    app = QApplication(sys.argv)

    window = Window()
    window.show()

    sys.exit(app.exec_())

# -*- coding:utf-8 -*-
# Time : 2019/08/18 上午 9:34 
# Author : 御承扬
# e-mail:2923616405@qq.com
# project:  PyQt5
# File : qt30_drag.py 
# @software: PyCharm


import sys
from PyQt5.QtCore import *
from PyQt5.QtGui import *
from PyQt5.QtWidgets import *


class Combo(QComboBox):
    def __init__(self, title, parent):
        super(Combo, self).__init__(parent)
        self.setAcceptDrops(True)

    def dragEnterEvent(self, e):
        print(e)
        if e.mimeData().hasText():
            e.accept()
        else:
            e.ignore()

    def dropEvent(self, e):
        self.addItem(e.mimeData().text())


class Example(QWidget):
    def __init__(self):
        super(Example, self).__init__()
        self.initUI()

    def initUI(self):
        lo = QFormLayout()
        lo.addRow(QLabel("请把左边的文本拖拽到右边的下拉菜单中"))
        edit = QLineEdit()
        edit.setDragEnabled(True)
        com = Combo("Button", self)
        lo.addRow(edit, com)
        self.setLayout(lo)
        self.setWindowTitle("简单的拖拽例子")
        self.setWindowIcon(QIcon("./images/Python2.ico"))


if __name__ == "__main__":
    app = QApplication(sys.argv)
    ex = Example()
    ex.show()
    sys.exit(app.exec_())
