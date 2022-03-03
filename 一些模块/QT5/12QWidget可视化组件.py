'''
1. 所有的可视控件的基类
2. 是一个最简单的空白控件
3. 控件是用户界面的最小元素
	接收各种事件
		鼠标
		键盘
		...
	绘制在桌面上, 展示给用户看
4. 每个控件都是矩形的，它们按Z轴顺序排序。
5. 控件由其父控件和前面的控件剪切
6. 没有父控件的控件, 称之为窗口
	一般会被包装一个框架
		标题栏
		...
	可以通过某些设置更改
继承两个类 QWidget(QtCore.QObject, QtGui.QPaintDevice):
QtGui.QPaintDevice用于绘制的类
'''
from PyQt5.QtWidgets import QApplication, QLabel, QWidget

import sys
app =QApplication(sys.argv)
window = QWidget()
window.setWindowTitle("层级关系调整")
window.resize(500, 500)

label1 = QLabel(window)
label1.setText("标签1")
label1.resize(200, 200)
label1.setStyleSheet("background-color: red;")

label2 = QLabel(window)
label2.setText("标签2")
label2.resize(200, 200)
label2.setStyleSheet("background-color: green;")
# label2.move(200, 200)
label2.move(100, 100)

window.show()
sys.exit(app.exec_())