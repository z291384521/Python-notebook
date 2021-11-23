'''
childAt(x, y)获取在指定坐标的控件
parentWidget0获取指定控件的父控件
childrenRect0所有子控件组成的边界矩形
'''
import sys
from PyQt5.QtGui import QWindow
from PyQt5.QtWidgets import *

app = QApplication(sys.argv)
window = QWidget()
window.setWindowTitle("父子关系学习")
window.resize(500,500)
#设置父亲物体
label  = QLabel(window)
label.setText("标签1")
labe2  = QLabel(window)
labe2.setText("标签2")
labe2.move(55,55)
labe3  = QLabel(window)
labe3.setText("标签1")
labe3.move(100,100)
#获得再一点的控件
print(window.childAt(100,100))
window.show()
sys.exit(app.exec_())