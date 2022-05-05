'''
调整控件的Z轴数据
lower（） 最底层
raise  最高层
a.stackUnder(b)让a放在b下面

'''

import sys

from PyQt5.QtWidgets import *
app =QApplication(sys.argv)
window = QWidget()
window.setWindowTitle("层级关系")
window.resize(500,500)

label1  = QLabel(window)
label1.setText("标签1")
label1.resize(200,200)
label1.setStyleSheet("background-color:red;")

label2  = QLabel(window)
label2.setText("标签2")
label2.resize(200,200)
label2.setStyleSheet("background-color:green;")
#label2.stackUnder(label1)
#获得再一点的控件
print(window.childAt(100,100))
window.show()
sys.exit(app.exec_())